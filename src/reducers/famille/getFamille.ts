import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { GetFamille } from 'reducers';

const INITIAL_STATE: GetFamille = Map({
  fetching: false,
  error: '',
  Famille: {},
});

const { Types, Creators } = createActions({
  getFamilleRequest: ['payload'],
  getFamilleSuccess: ['famille'],
  getFamilleFailure: ['error'],
});

const getFamilleRequest = () => INITIAL_STATE.merge({ fetching: true });

const getFamilleSuccess = (state: GetFamille, { famille }: AnyAction) =>
  state.merge({ famille, fetching: false });

const getFamilleFailure = (state: GetFamille, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const getFamilleTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_FAMILLE_REQUEST]: getFamilleRequest,
  [Types.GET_FAMILLE_SUCCESS]: getFamilleSuccess,
  [Types.GET_FAMILLE_FAILURE]: getFamilleFailure,
});
