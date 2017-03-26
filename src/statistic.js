import {toSeconds,calcPace} from './timeFormat';
import vdot from './vdot';

const MSG_SLOW = 'Вы пока бегаете довольно медленно. Вероятно, вы пока новичек. '+
'Обычного бега трусцой должно быть достаточно для развития.';
const MSG_MC = 'Ваши результаты превосходят '+
'<a href="http://sportrecord.org/#sex=m&units=hms&typeval=a&tab=0" target="_blank">'+
'нормативы мастера спорта России</a>. '+
'Поздравляю. Этот калькулятор предназначен для любителей.';

/** Виды совевнований*/
const raceTypes = [
  {title:'3К',key:'3k',mc:'08:05'},
  {title:'2 мили',key:'2m',mc:'08:05'},
  {title:'5К',key:'5k',mc:'14:00'},
  {title:'10К',key:'10k',mc:'29:25'},
  {title:'Полумарафон',key:'hm',mc:'1:05:30'}
];

function getRecomendation(pace){
  return {...pace,
    easy_msg:'длительный забег 60-90 минут. ('+ Math.floor(3600/toSeconds(pace.easy))+
      ' - '+ Math.ceil(5400/toSeconds(pace.easy)) +
      ' км)<br />Можно заменить велосипедом',
    threshold_msg:'Варианты тренировки:<ul><li>5 км темповый забег</li>'+
    '<li>Либо два по 3,5 км через 1,5 км отдыха</li>'+
    '<li>5 по 1500 через минуту отдыха</li><li>8 по 1000 через минуту отдыха</li>',
    interval_msg:'2-5 минут интервалы'
    /*8 x 400 w/400 RI
    6 x 800 w/400 RI
    4 x 1200 (400 RI)
    3 x 1600 w/1:00 RI
    */
  }
}

/** Возвращает тренировочные темпы по результатам последних соревнований*/
function calcVdot(raceType, raceResult) {
  const raceResultSeconds = toSeconds(raceResult);
  //проверить на мс РФ
  if (raceResultSeconds < toSeconds(raceTypes.find((t)=>t.key===raceType).mc))
    return {msg:MSG_MC}
  //проверить на медлительного спортсмена
  if (raceResultSeconds > toSeconds(vdot.find((v)=> v.vdot===30).result[raceType]))
    return {msg:MSG_SLOW}
  //линейная интерполяция
  const vdotLeft = Math.max(...vdot.filter((v)=> toSeconds(v.result[raceType]) >= raceResultSeconds).map((v)=>v.vdot));
  const vdotRight = Math.min(...vdot.filter((v)=> toSeconds(v.result[raceType]) <= raceResultSeconds).map((v)=>v.vdot));
  const vLeft = vdot.find((v)=> v.vdot===vdotLeft);
  const vRight = vdot.find((v)=> v.vdot===vdotRight);
  if (vdotLeft===vdotRight)
    return getRecomendation({
      easy: vLeft.pace.easy,
      threshold: vLeft.pace.threshold,
      interval: vLeft.pace.interval
    });
  const resLeft = toSeconds(vLeft.result[raceType]);
  const resRight = toSeconds(vRight.result[raceType]);
  const vo2 = vdotLeft===vdotRight?vdotLeft:
        vdotLeft+(vdotRight-vdotLeft)*(raceResultSeconds-resLeft)/(resRight-resLeft);
  return getRecomendation({
    easy: calcPace(vLeft,vRight,vo2,'easy'),
    threshold: calcPace(vLeft,vRight,vo2,'threshold'),
    interval: calcPace(vLeft,vRight,vo2,'interval')
  });
}

export {calcVdot,raceTypes}
