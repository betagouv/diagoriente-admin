import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { DeleteQuestionJob } from 'reducers';

const INITIAL_STATE: DeleteQuestionJob = Map({
  fetching: false,
  error: ''
});

const { Types, Creators } = createActions({
  deleteQuestionJobRequest: ['payload'],
  deleteQuestionJobSuccess: [],
  deleteQuestionJobFailure: ['error']
});

const deleteQuestionJobRequest = () => INITIAL_STATE.merge({ fetching: true });

const deleteQuestionJobSuccess = (state: DeleteQuestionJob) =>
  state.merge({ fetching: false });

const deleteQuestionJobFailure = (
  state: DeleteQuestionJob,
  { error }: AnyAction
) =>
  state.merge({
    error,
    fetching: false
  });

export const deleteQuestionJobTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_QUESTION_JOB_REQUEST]: deleteQuestionJobRequest,
  [Types.DELETE_QUESTION_JOB_SUCCESS]: deleteQuestionJobSuccess,
  [Types.DELETE_QUESTION_JOB_FAILURE]: deleteQuestionJobFailure
});
