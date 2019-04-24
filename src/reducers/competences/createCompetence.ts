import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { CreateCompetence } from 'reducers';

const INITIAL_STATE: CreateCompetence = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  createCompetenceRequest: ['payload'],
  createCompetenceSuccess: [],
  createCompetenceFailure: ['error'],
});

const createCompetenceRequest = () => INITIAL_STATE.merge({ fetching: true });

const createCompetenceSuccess = (state: CreateCompetence) =>
  state.merge({ fetching: false });

const createCompetenceFailure = (state: CreateCompetence, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const createCompetenceTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_COMPETENCE_REQUEST]: createCompetenceRequest,
  [Types.CREATE_COMPETENCE_SUCCESS]: createCompetenceSuccess,
  [Types.CREATE_COMPETENCE_FAILURE]: createCompetenceFailure,
});
