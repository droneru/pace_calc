import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import {createStore} from 'redux';
import {calcVdot} from './statistic';
import App from './App';

const DEFAULT_RACE_TYPE = '5k';
const DEFAULT_RACE_RESULT = '23:40';

const initialState = {
  raceType: DEFAULT_RACE_TYPE,
  raceResult: DEFAULT_RACE_RESULT,
  pace:calcVdot(DEFAULT_RACE_TYPE,DEFAULT_RACE_RESULT)
};

function pageReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_RACE':
            return {...state, ...action.payload,
              pace:calcVdot(action.payload.raceType,action.payload.raceResult)};
        default:
            return state;
    }
};

let store = createStore(pageReducer);

const AppA = connect(
    (state) => {
        return {
            raceResult: state.raceResult,
            raceType: state.raceType,
            pace: state.pace
        }
    },
    (dispatch) => {
        return {
            onChange: (raceType, raceResult) => {
                dispatch({type: 'SET_RACE',
                payload: {raceType: raceType, raceResult: raceResult}
              });
            }
        }
    }
)(App);

ReactDOM.render(
  <Provider store={store}>
      <AppA />
  </Provider>,
  document.getElementById('root')
);
