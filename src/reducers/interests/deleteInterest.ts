import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { DeleteInterest } from 'reducers';

const INITIAL_STATE: DeleteInterest = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  deleteInterestRequest: ['payload'],
  deleteInterestSuccess: [],
  deleteInterestFailure: ['error'],
});

const deleteInterestRequest = () => INITIAL_STATE.merge({ fetching: true });

const deleteInterestSuccess = (state: DeleteInterest) =>
  state.merge({ fetching: false });

const deleteInterestFailure = (state: DeleteInterest, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const deleteInterestTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_INTEREST_REQUEST]: deleteInterestRequest,
  [Types.DELETE_INTEREST_SUCCESS]: deleteInterestSuccess,
  [Types.DELETE_INTEREST_FAILURE]: deleteInterestFailure,
});
