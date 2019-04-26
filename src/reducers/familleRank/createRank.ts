import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { CreateRank } from 'reducers';

const INITIAL_STATE: CreateRank = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  createRankRequest: ['payload'],
  createRankSuccess: [],
  createRankFailure: ['error'],
});

const createRankRequest = () => INITIAL_STATE.merge({ fetching: true });

const createRankSuccess = (state: CreateRank) =>
  state.merge({ fetching: false });

const createRankFailure = (state: CreateRank, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const createRankTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_RANK_REQUEST]: createRankRequest,
  [Types.CREATE_RANK_SUCCESS]: createRankSuccess,
  [Types.CREATE_RANK_FAILURE]: createRankFailure,
});
