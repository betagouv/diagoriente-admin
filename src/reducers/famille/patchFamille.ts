import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { PatchFamille } from 'reducers';

const INITIAL_STATE: PatchFamille = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  patchFamilleRequest: ['payload'],
  patchFamilleSuccess: [],
  patchFamilleFailure: ['error'],
});

const patchFamilleRequest = () => INITIAL_STATE.merge({ fetching: true });

const patchFamilleSuccess = (state: PatchFamille) =>
  state.merge({ fetching: false });

const patchFamilleFailure = (state: PatchFamille, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const patchFamilleTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PATCH_FAMILLE_REQUEST]: patchFamilleRequest,
  [Types.PATCH_FAMILLE_SUCCESS]: patchFamilleSuccess,
  [Types.PATCH_FAMILLE_FAILURE]: patchFamilleFailure,
});
