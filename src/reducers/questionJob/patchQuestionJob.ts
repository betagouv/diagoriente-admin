import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { PatchQuestionJob } from 'reducers';

const INITIAL_STATE: PatchQuestionJob = Map({
  fetching: false,
  error: ''
});

const { Types, Creators } = createActions({
  patchQuestionJobRequest: ['payload'],
  patchQuestionJobSuccess: [],
  patchQuestionJobFailure: ['error']
});

const patchQuestionJobRequest = () => INITIAL_STATE.merge({ fetching: true });

const patchQuestionJobSuccess = (state: PatchQuestionJob) =>
  state.merge({ fetching: false });

const patchQuestionJobFailure = (
  state: PatchQuestionJob,
  { error }: AnyAction
) =>
  state.merge({
    error,
    fetching: false
  });

export const patchQuestionJobTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PATCH_QUESTION_JOB_REQUEST]: patchQuestionJobRequest,
  [Types.PATCH_QUESTION_JOB_SUCCESS]: patchQuestionJobSuccess,
  [Types.PATCH_QUESTION_JOB_FAILURE]: patchQuestionJobFailure
});
