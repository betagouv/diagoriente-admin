import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { GetInterest } from 'reducers';

const INITIAL_STATE: GetInterest = Map({
  fetching: false,
  error: '',
  interest: {},
});

const { Types, Creators } = createActions({
  getInterestRequest: ['payload'],
  getInterestSuccess: ['interest'],
  getInterestFailure: ['error'],
});

const getInterestRequest = () => INITIAL_STATE.merge({ fetching: true });

const getInterestSuccess = (state: GetInterest, { interest }: AnyAction) =>
  state.merge({ interest, fetching: false });

const getInterestFailure = (state: GetInterest, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const getInterestTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_INTEREST_REQUEST]: getInterestRequest,
  [Types.GET_INTEREST_SUCCESS]: getInterestSuccess,
  [Types.GET_INTEREST_FAILURE]: getInterestFailure,
});
