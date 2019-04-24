import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { PatchActivity } from 'reducers';

const INITIAL_STATE: PatchActivity = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  patchActivityRequest: ['payload'],
  patchActivitySuccess: [],
  patchActivityFailure: ['error'],
});

const patchActivityRequest = () => INITIAL_STATE.merge({ fetching: true });

const patchActivitySuccess = (state: PatchActivity) =>
  state.merge({ fetching: false });

const patchActivityFailure = (state: PatchActivity, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const patchActivityTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PATCH_ACTIVITY_REQUEST]: patchActivityRequest,
  [Types.PATCH_ACTIVITY_SUCCESS]: patchActivitySuccess,
  [Types.PATCH_ACTIVITY_FAILURE]: patchActivityFailure,
});
