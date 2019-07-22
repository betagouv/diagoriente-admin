import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { PatchContext } from 'reducers';

const INITIAL_STATE: PatchContext = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  patchContextRequest: ['payload'],
  patchContextSuccess: [],
  patchContextFailure: ['error'],
});

const patchContextRequest = () => INITIAL_STATE.merge({ fetching: true });

const patchContextSuccess = (state: PatchContext) =>
  state.merge({ fetching: false });

const patchContextFailure = (state: PatchContext, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const patchContextTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PATCH_CONTEXT_REQUEST]: patchContextRequest,
  [Types.PATCH_CONTEXT_SUCCESS]: patchContextSuccess,
  [Types.PATCH_CONTEXT_FAILURE]: patchContextFailure,
});
