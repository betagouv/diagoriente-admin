import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { ListRanks } from 'reducers';

const INITIAL_STATE: ListRanks = Map({
  fetching: false,
  error: '',
  ranks: { data: [] },
});

const { Types, Creators } = createActions({
  listRanksRequest: ['payload'],
  listRanksSuccess: ['ranks'],
  listRanksFailure: ['error'],
});

const listRanksRequest = (state: ListRanks) =>
  state.merge({ fetching: true });

const listRanksSuccess = (state: ListRanks, { ranks }: AnyAction) =>
  state.merge({ ranks, fetching: false });

const listRanksFailure = (state: ListRanks, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const listRanksTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_RANKS_REQUEST]: listRanksRequest,
  [Types.LIST_RANKS_SUCCESS]: listRanksSuccess,
  [Types.LIST_RANKS_FAILURE]: listRanksFailure,
});
