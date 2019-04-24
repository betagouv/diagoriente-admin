import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { ListCompetences } from 'reducers';

const INITIAL_STATE: ListCompetences = Map({
  fetching: false,
  error: '',
  competences: { data:[] },
});

const { Types, Creators } = createActions({
  listCompetencesRequest: ['payload'],
  listCompetencesSuccess: ['competences'],
  listCompetencesFailure: ['error'],
});

const listCompetencesRequest = (state: ListCompetences) =>
  state.merge({ fetching: true });

const listCompetencesSuccess = (state: ListCompetences, { competences }: AnyAction) =>
  state.merge({ competences, fetching: false });

const listCompetencesFailure = (state: ListCompetences, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const listCompetencesTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_COMPETENCES_REQUEST]: listCompetencesRequest,
  [Types.LIST_COMPETENCES_SUCCESS]: listCompetencesSuccess,
  [Types.LIST_COMPETENCES_FAILURE]: listCompetencesFailure,
});
