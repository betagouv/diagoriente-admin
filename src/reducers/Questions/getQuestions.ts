import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { GetQuestion } from 'reducers';

const INITIAL_STATE: GetQuestion = Map({
  fetching: false,
  error: '',
  question: {},
});

const { Types, Creators } = createActions({
  getQuestionRequest: ['payload'],
  getQuestionSuccess: ['question'],
  getQuestionFailure: ['error'],
});

const getQuestionRequest = () => INITIAL_STATE.merge({ fetching: true });

const getQuestionSuccess = (state: GetQuestion, { question }: AnyAction) =>
  state.merge({ question, fetching: false });

const getQuestionFailure = (state: GetQuestion, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const getQuestionTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_QUESTION_REQUEST]: getQuestionRequest,
  [Types.GET_QUESTION_SUCCESS]: getQuestionSuccess,
  [Types.GET_QUESTION_FAILURE]: getQuestionFailure,
});
