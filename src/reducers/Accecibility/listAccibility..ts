import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { ListEnvironment } from 'reducers';

const INITIAL_STATE: ListEnvironment = Map({
  fetching: false,
  error: '',
  environments: { data: [] }
});

const { Types, Creators } = createActions({
  listEnvironmentRequest: ['payload'],
  listEnvironmentSuccess: ['environments'],
  listEnvironmentFailure: ['error']
});

const listEnvironmentRequest = (state: ListEnvironment) =>
  state.merge({ fetching: true, error: '' });

const listEnvironmentSuccess = (
  state: ListEnvironment,
  { environments }: AnyAction
) => state.merge({ environments, fetching: false });

const listEnvironmentFailure = (state: ListEnvironment, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false
  });

export const listEnvironmentTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_ENVIRONMENT_REQUEST]: listEnvironmentRequest,
  [Types.LIST_ENVIRONMENT_SUCCESS]: listEnvironmentSuccess,
  [Types.LIST_ENVIRONMENT_FAILURE]: listEnvironmentFailure
});
