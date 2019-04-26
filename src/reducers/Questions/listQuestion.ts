import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { ListQuestions } from 'reducers';

const INITIAL_STATE: ListQuestions = Map({
  fetching: false,
  error: '',
  questions: { data: [] },
});

const { Types, Creators } = createActions({
  listQuestionsRequest: ['payload'],
  listQuestionsSuccess: ['questions'],
  listQuestionsFailure: ['error'],
});

const listQuestionsRequest = (state: ListQuestions) =>
  state.merge({ fetching: true });

const listQuestionsSuccess = (state: ListQuestions, { questions }: AnyAction) =>
  state.merge({ questions, fetching: false });

const listQuestionsFailure = (state: ListQuestions, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const listQuestionsTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_QUESTIONS_REQUEST]: listQuestionsRequest,
  [Types.LIST_QUESTIONS_SUCCESS]: listQuestionsSuccess,
  [Types.LIST_QUESTIONS_FAILURE]: listQuestionsFailure,
});
