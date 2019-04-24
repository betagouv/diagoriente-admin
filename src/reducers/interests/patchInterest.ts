import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { PatchInterest } from 'reducers';

const INITIAL_STATE: PatchInterest = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  patchInterestRequest: ['payload'],
  patchInterestSuccess: [],
  patchInterestFailure: ['error'],
});

const patchInterestRequest = () => INITIAL_STATE.merge({ fetching: true });

const patchInterestSuccess = (state: PatchInterest) =>
  state.merge({ fetching: false });

const patchInterestFailure = (state: PatchInterest, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const patchInterestTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PATCH_INTEREST_REQUEST]: patchInterestRequest,
  [Types.PATCH_INTEREST_SUCCESS]: patchInterestSuccess,
  [Types.PATCH_INTEREST_FAILURE]: patchInterestFailure,
});
