import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { DeleteCompetence } from 'reducers';

const INITIAL_STATE: DeleteCompetence = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  deleteCompetenceRequest: ['payload'],
  deleteCompetenceSuccess: [],
  deleteCompetenceFailure: ['error'],
});

const deleteCompetenceRequest = () => INITIAL_STATE.merge({ fetching: true });

const deleteCompetenceSuccess = (state: DeleteCompetence) =>
  state.merge({ fetching: false });

const deleteCompetenceFailure = (state: DeleteCompetence, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const deleteCompetenceTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_COMPETENCE_REQUEST]: deleteCompetenceRequest,
  [Types.DELETE_COMPETENCE_SUCCESS]: deleteCompetenceSuccess,
  [Types.DELETE_COMPETENCE_FAILURE]: deleteCompetenceFailure,
});
