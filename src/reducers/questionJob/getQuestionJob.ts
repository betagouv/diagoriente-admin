import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { GetQuestionJob } from 'reducers';

const INITIAL_STATE: GetQuestionJob = Map({
  fetching: false,
  error: '',
  questionJob: {}
});

const { Types, Creators } = createActions({
  getQuestionJobRequest: ['payload'],
  getQuestionJobSuccess: ['questionJob'],
  getQuestionJobFailure: ['error']
});

const getQuestionJobRequest = () => INITIAL_STATE.merge({ fetching: true });

const getQuestionJobSuccess = (
  state: GetQuestionJob,
  { questionJob }: AnyAction
) => state.merge({ questionJob, fetching: false });

const getQuestionJobFailure = (state: GetQuestionJob, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false
  });

export const getQuestionJobTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_QUESTION_JOB_REQUEST]: getQuestionJobRequest,
  [Types.GET_QUESTION_JOB_SUCCESS]: getQuestionJobSuccess,
  [Types.GET_QUESTION_JOB_FAILURE]: getQuestionJobFailure
});
