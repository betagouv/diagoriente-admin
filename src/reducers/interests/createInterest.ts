import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { CreateInterest } from 'reducers';

const INITIAL_STATE: CreateInterest = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  createInterestRequest: ['payload'],
  createInterestSuccess: [],
  createInterestFailure: ['error'],
});

const createInterestRequest = () => INITIAL_STATE.merge({ fetching: true });

const createInterestSuccess = (state: CreateInterest) =>
  state.merge({ fetching: false });

const createInterestFailure = (state: CreateInterest, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const createInterestTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_INTEREST_REQUEST]: createInterestRequest,
  [Types.CREATE_INTEREST_SUCCESS]: createInterestSuccess,
  [Types.CREATE_INTEREST_FAILURE]: createInterestFailure,
});
