import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { ListFamilles } from 'reducers';

const INITIAL_STATE: ListFamilles = Map({
  fetching: false,
  error: '',
  familles: { data: [] },
});

const { Types, Creators } = createActions({
  listFamillesRequest: ['payload'],
  listFamillesSuccess: ['familles'],
  listFamillesFailure: ['error'],
});

const listFamillesRequest = (state: ListFamilles) =>
  state.merge({ fetching: true });

const listFamillesSuccess = (state: ListFamilles, { familles }: AnyAction) =>
  state.merge({ familles, fetching: false });

const listFamillesFailure = (state: ListFamilles, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const listFamillesTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_FAMILLES_REQUEST]: listFamillesRequest,
  [Types.LIST_FAMILLES_SUCCESS]: listFamillesSuccess,
  [Types.LIST_FAMILLES_FAILURE]: listFamillesFailure,
});
