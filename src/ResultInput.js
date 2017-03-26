import React from 'react';
import {raceTypes} from './statistic';

function validateRaceResult(val){
  return /^\d\d:\d\d$/.test(val) ||
    /^\d:\d\d:\d\d$/.test(val);
}

class ResultInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { raceType: this.props.raceType,
          raceResult: this.props.raceResult,
          valid: true
         };
        this.changeResult = this.changeResult.bind(this);
        this.changeType = this.changeType.bind(this);
    }

    change(raceType,raceResult) {
      const valid = validateRaceResult(raceResult);
      this.setState({raceResult: raceResult,
                     raceType: raceType,
                     valid: valid});
      if (valid)
        this.props.recalc(raceType, raceResult);
    }

    changeResult(event) {
        this.change(this.state.raceType, event.target.value);
    }

    changeType(event) {
      this.change(event.target.id, this.state.raceResult);
    }

    render() {
        const raceTypeList =raceTypes.map((item) => {
                  const cl = item.key === this.state.raceType ? 'btn btn-primary' : 'btn btn-default';
                  return (
                    <button type="button" id={item.key} onClick={this.changeType}
                    className={cl} key={item.key}>{item.title}</button>
                  )
              });
        const errCl = this.state.valid? 'input-group has-success':'input-group has-error';
        return (
            <div className="panel-body">
                <div className="btn-group" role="group">
                    {raceTypeList}
                </div>
                <div className={errCl}>
                    <span className="input-group-addon" id="basic-addon1">время</span>
                    <input type="text" className="form-control"
                    value={this.state.raceResult} onChange={this.changeResult}
                    placeholder="введите результат последней гонки" aria-describedby="basic-addon1" />
                </div>
                <div>[формат mm:ss или h:mm:ss. Например 23:38 или 1:55:33]</div>
            </div>
        );
    }
}

export default ResultInput;
