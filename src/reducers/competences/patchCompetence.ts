import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { PatchCompetence } from 'reducers';

const INITIAL_STATE: PatchCompetence = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  patchCompetenceRequest: ['payload'],
  patchCompetenceSuccess: [],
  patchCompetenceFailure: ['error'],
});

const patchCompetenceRequest = () => INITIAL_STATE.merge({ fetching: true });

const patchCompetenceSuccess = (state: PatchCompetence) =>
  state.merge({ fetching: false });

const patchCompetenceFailure = (state: PatchCompetence, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const PatchCompetenceTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PATCH_COMPETENCE_REQUEST]: patchCompetenceRequest,
  [Types.PATCH_COMPETENCE_SUCCESS]: patchCompetenceSuccess,
  [Types.PATCH_COMPETENCE_FAILURE]: patchCompetenceFailure,
});
