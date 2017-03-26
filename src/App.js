import React from 'react';
import ResultInput from './ResultInput';
import PaceRecomendation from './PaceRecomendation';

const App = (props) => {
    const {raceResult,raceType,pace} = props;
    const alert = (pace === undefined || pace.msg === undefined)?'':
      <div className="alert alert-warning" role="alert" dangerouslySetInnerHTML={{__html: pace.msg}}></div>;
    const paceList = pace === undefined ? [] : [
      {title:'Легкий темп',pace:pace.easy,style:'panel-info',msg:pace.easy_msg},
      {title:'Темповый забег',pace:pace.threshold,style:'panel-primary',msg:pace.threshold_msg},
      {title:'Интервальный темп',pace:pace.interval,style:'panel-danger',msg:pace.interval_msg}
    ].filter((p)=>p.pace!==undefined).map((item) => {
            return (
              <PaceRecomendation style={item.style} title={item.title}
                  pace={item.pace} key={item.title} msg={item.msg} />
            )
        });
    return (
      <div style={{width:'450px'}}>
          <div className="panel panel-default">
              <div className="panel-heading">
                  <h3 className="panel-title">Калькулятор тренировочного темпа</h3>
              </div>
              <ResultInput raceType={raceType} raceResult={raceResult}
                recalc={props.onChange} />
              {alert}
          </div>
          <div id="paceList">
            {paceList}
          </div>
      </div>
    );
}

export default App;
