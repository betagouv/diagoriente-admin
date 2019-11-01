import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { DeleteEnvironment } from 'reducers';

const INITIAL_STATE: DeleteEnvironment = Map({
  fetching: false,
  error: ''
});

const { Types, Creators } = createActions({
  deleteEnvironmentRequest: ['payload'],
  deleteEnvironmentSuccess: [],
  deleteEnvironmentFailure: ['error']
});

const deleteEnvironmentRequest = () => INITIAL_STATE.merge({ fetching: true });

const deleteEnvironmentSuccess = (state: DeleteEnvironment) =>
  state.merge({ fetching: false });

const deleteEnvironmentFailure = (
  state: DeleteEnvironment,
  { error }: AnyAction
) =>
  state.merge({
    error,
    fetching: false
  });

export const deleteEnvironmentTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_ENVIRONMENT_REQUEST]: deleteEnvironmentRequest,
  [Types.DELETE_ENVIRONMENT_SUCCESS]: deleteEnvironmentSuccess,
  [Types.DELETE_ENVIRONMENT_FAILURE]: deleteEnvironmentFailure
});
