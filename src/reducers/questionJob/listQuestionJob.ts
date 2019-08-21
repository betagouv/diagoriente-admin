import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { ListQuestionJob } from 'reducers';

const INITIAL_STATE: ListQuestionJob = Map({
  fetching: false,
  error: '',
  questionJobs: { data: [] }
});

const { Types, Creators } = createActions({
  listQuestionJobRequest: ['payload'],
  listQuestionJobSuccess: ['questionJobs'],
  listQuestionJobFailure: ['error']
});

const listQuestionJobRequest = (state: ListQuestionJob) =>
  state.merge({ fetching: true, error: '' });

const listQuestionJobSuccess = (
  state: ListQuestionJob,
  { questionJobs }: AnyAction
) => state.merge({ questionJobs, fetching: false });

const listQuestionJobFailure = (state: ListQuestionJob, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false
  });

export const listQuestionJobTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_QUESTION_JOB_REQUEST]: listQuestionJobRequest,
  [Types.LIST_QUESTION_JOB_SUCCESS]: listQuestionJobSuccess,
  [Types.LIST_QUESTION_JOB_FAILURE]: listQuestionJobFailure
});
