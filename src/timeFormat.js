/** Перевод времени в секунды*/
function toSeconds(val) {
  if(/^\d*:\d\d$/.test(val)){
    const match = /^(\d*):(\d\d)$/.exec(val);
    return Number(match[2]) + Number(match[1])*60;
  }
  if(/^\d:\d\d:\d\d$/.test(val)){
    const match = /^(\d):(\d\d:\d\d)$/.exec(val);
    return toSeconds(match[2]) + Number(match[1])*60*60;
  }
  return 0;
}

/** форматирование из секунд для вывода на экран*/
function calcPace(vLeft,vRight,vo2,paceType){
  const seconds = toSeconds(vLeft.pace[paceType])+
    (toSeconds(vRight.pace[paceType])-toSeconds(vLeft.pace[paceType]))*(vo2-vLeft.vdot);
  return formatTime(seconds);
}

function formatTime(seconds) {
  const minutesPart = seconds / 60 |0;
  const secondsPart = seconds-minutesPart*60 |0;
  return minutesPart + ':'+ ("0" + secondsPart).slice(-2);
}

export {toSeconds,calcPace,formatTime}
