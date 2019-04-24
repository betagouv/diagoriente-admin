import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { DeleteFamille } from 'reducers';

const INITIAL_STATE: DeleteFamille = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  deleteFamilleRequest: ['payload'],
  deleteFamilleSuccess: [],
  deleteFamilleFailure: ['error'],
});

const deleteFamilleRequest = () => INITIAL_STATE.merge({ fetching: true });

const deleteFamilleSuccess = (state: DeleteFamille) =>
  state.merge({ fetching: false });

const deleteFamilleFailure = (state: DeleteFamille, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const deleteFamilleTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_FAMILLE_REQUEST]: deleteFamilleRequest,
  [Types.DELETE_FAMILLE_SUCCESS]: deleteFamilleSuccess,
  [Types.DELETE_FAMILLE_FAILURE]: deleteFamilleFailure,
});
