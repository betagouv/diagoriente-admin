import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { PatchEnvironment } from 'reducers';

const INITIAL_STATE: PatchEnvironment = Map({
  fetching: false,
  error: ''
});

const { Types, Creators } = createActions({
  patchEnvironmentRequest: ['payload'],
  patchEnvironmentSuccess: [],
  patchEnvironmentFailure: ['error']
});

const patchEnvironmentRequest = () => INITIAL_STATE.merge({ fetching: true });

const patchEnvironmentSuccess = (state: PatchEnvironment) =>
  state.merge({ fetching: false });

const patchEnvironmentFailure = (
  state: PatchEnvironment,
  { error }: AnyAction
) =>
  state.merge({
    error,
    fetching: false
  });

export const patchEnvironmentTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PATCH_ENVIRONMENT_REQUEST]: patchEnvironmentRequest,
  [Types.PATCH_ENVIRONMENT_SUCCESS]: patchEnvironmentSuccess,
  [Types.PATCH_ENVIRONMENT_FAILURE]: patchEnvironmentFailure
});
