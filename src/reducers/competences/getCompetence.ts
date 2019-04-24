import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { GetCompetence } from 'reducers';

const INITIAL_STATE: GetCompetence = Map({
  fetching: false,
  error: '',
  competence: {},
});

const { Types, Creators } = createActions({
  getCompetenceRequest: ['payload'],
  getCompetenceSuccess: ['competence'],
  getCompetenceFailure: ['error'],
});

const getCompetenceRequest = () => INITIAL_STATE.merge({ fetching: true });

const getCompetenceSuccess = (state: GetCompetence, { competence }: AnyAction) =>
  state.merge({ competence, fetching: false });

const getCompetenceFailure = (state: GetCompetence, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const getCompetenceTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_COMPETENCE_REQUEST]: getCompetenceRequest,
  [Types.GET_COMPETENCE_SUCCESS]: getCompetenceSuccess,
  [Types.GET_COMPETENCE_FAILURE]: getCompetenceFailure,
});
