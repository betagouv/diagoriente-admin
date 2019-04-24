import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { StartUp } from 'reducers';
import { AnyAction } from 'redux';

const INITIAL_STATE: StartUp = Map({
  done: false,
});
const { Types, Creators } = createActions({
  runStartUp: [],
  startupDone: [],
});

const startupDone = (state: StartUp) =>
  state.merge({
    done: true,
  });

const runStartUp = (state: StartUp): StartUp => state;

export const startUpTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP_DONE]: startupDone,
  [Types.RUN_START_UP]: runStartUp,
});
