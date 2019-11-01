import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { GetEnvironment } from 'reducers';

const INITIAL_STATE: GetEnvironment = Map({
  fetching: false,
  error: '',
  environment: {}
});

const { Types, Creators } = createActions({
  getEnvironmentRequest: ['payload'],
  getEnvironmentSuccess: ['environment'],
  getEnvironmentFailure: ['error']
});

const getEnvironmentRequest = () => INITIAL_STATE.merge({ fetching: true });

const getEnvironmentSuccess = (
  state: GetEnvironment,
  { environment }: AnyAction
) => state.merge({ environment, fetching: false });

const getEnvironmentFailure = (state: GetEnvironment, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false
  });

export const getEnvironmentTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_ENVIRONMENT_REQUEST]: getEnvironmentRequest,
  [Types.GET_ENVIRONMENT_SUCCESS]: getEnvironmentSuccess,
  [Types.GET_ENVIRONMENT_FAILURE]: getEnvironmentFailure
});
