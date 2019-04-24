import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { CreateFamille } from 'reducers';

const INITIAL_STATE: CreateFamille = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  createFamilleRequest: ['payload'],
  createFamilleSuccess: [],
  createFamilleFailure: ['error'],
});

const createFamilleRequest = () => INITIAL_STATE.merge({ fetching: true });

const createFamilleSuccess = (state: CreateFamille) =>
  state.merge({ fetching: false });

const createFamilleFailure = (state: CreateFamille, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const createFamilleTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_FAMILLE_REQUEST]: createFamilleRequest,
  [Types.CREATE_FAMILLE_SUCCESS]: createFamilleSuccess,
  [Types.CREATE_FAMILLE_FAILURE]: createFamilleFailure,
});
