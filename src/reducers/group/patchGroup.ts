import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { PatchGroup } from 'reducers';

const INITIAL_STATE: PatchGroup = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  patchGroupRequest: ['payload'],
  patchGroupSuccess: [],
  patchGroupFailure: ['error'],
});

const patchGroupRequest = () => INITIAL_STATE.merge({ fetching: true });

const patchGroupSuccess = (state: PatchGroup) =>
  state.merge({ fetching: false });

const patchGroupFailure = (state: PatchGroup, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const PatchGroupTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PATCH_GROUP_REQUEST]: patchGroupRequest,
  [Types.PATCH_GROUP_SUCCESS]: patchGroupSuccess,
  [Types.PATCH_GROUP_FAILURE]: patchGroupFailure,
});
