import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { DeleteParcour } from 'reducers';

const INITIAL_STATE: DeleteParcour = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  deleteParcourRequest: ['payload'],
  deleteParcourSuccess: [],
  deleteParcourFailure: ['error'],
});

const deleteParcourRequest = () => INITIAL_STATE.merge({ fetching: true });

const deleteParcourSuccess = (state: DeleteParcour) =>
  state.merge({ fetching: false });

const deleteParcourFailure = (state: DeleteParcour, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const deleteParcourTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_PARCOUR_REQUEST]: deleteParcourRequest,
  [Types.DELETE_PARCOUR_SUCCESS]: deleteParcourSuccess,
  [Types.DELETE_PARCOUR_FAILURE]: deleteParcourFailure,
});
