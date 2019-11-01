import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { CreateEnvironment } from 'reducers';

const INITIAL_STATE: CreateEnvironment = Map({
  fetching: false,
  error: ''
});

const { Types, Creators } = createActions({
  createEnvironmentRequest: ['payload'],
  createEnvironmentSuccess: [],
  createEnvironmentFailure: ['error']
});

const createEnvironmentRequest = () => INITIAL_STATE.merge({ fetching: true });

const createEnvironmentSuccess = (state: CreateEnvironment) =>
  state.merge({ fetching: false });

const createEnvironmentFailure = (
  state: CreateEnvironment,
  { error }: AnyAction
) =>
  state.merge({
    error,
    fetching: false
  });

export const createEnvironmentTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_ENVIRONMENT_REQUEST]: createEnvironmentRequest,
  [Types.CREATE_ENVIRONMENT_SUCCESS]: createEnvironmentSuccess,
  [Types.CREATE_ENVIRONMENT_FAILURE]: createEnvironmentFailure
});
