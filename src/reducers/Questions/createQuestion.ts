import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { CreateQuestion } from 'reducers';

const INITIAL_STATE: CreateQuestion = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  createQuestionRequest: ['payload'],
  createQuestionSuccess: [],
  createQuestionFailure: ['error'],
});

const createQuestionRequest = () => INITIAL_STATE.merge({ fetching: true });

const createQuestionSuccess = (state: CreateQuestion) =>
  state.merge({ fetching: false });

const createQuestionFailure = (state: CreateQuestion, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const createQuestionTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_QUESTION_REQUEST]: createQuestionRequest,
  [Types.CREATE_QUESTION_SUCCESS]: createQuestionSuccess,
  [Types.CREATE_QUESTION_FAILURE]: createQuestionFailure,
});
