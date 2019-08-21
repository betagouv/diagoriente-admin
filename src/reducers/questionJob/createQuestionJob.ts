import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { CreateQuestionJob } from 'reducers';

const INITIAL_STATE: CreateQuestionJob = Map({
  fetching: false,
  error: ''
});

const { Types, Creators } = createActions({
  createQuestionJobRequest: ['payload'],
  createQuestionJobSuccess: [],
  createQuestionJobFailure: ['error']
});

const createQuestionJobRequest = () => INITIAL_STATE.merge({ fetching: true });

const createQuestionJobSuccess = (state: CreateQuestionJob) =>
  state.merge({ fetching: false });

const createQuestionJobFailure = (
  state: CreateQuestionJob,
  { error }: AnyAction
) =>
  state.merge({
    error,
    fetching: false
  });

export const createQuestionJobTypes = Types;
console.log('aopfjfeaojfeapojfae', Types);
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_QUESTION_JOB_REQUEST]: createQuestionJobRequest,
  [Types.CREATE_QUESTION_JOB_SUCCESS]: createQuestionJobSuccess,
  [Types.CREATE_QUESTION_JOB_FAILURE]: createQuestionJobFailure
});
