import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { EditQuestion } from 'reducers';

const INITIAL_STATE: EditQuestion = Map({
  fetching: false,
  error: '',
  questions: {},
});

const { Types, Creators } = createActions({
  editQuestionRequest: ['payload'],
  editQuestionSuccess: ['question'],
  editQuestionFailure: ['error'],
});

const editQuestionRequest = () => INITIAL_STATE.merge({ fetching: true });

const editQuestionSuccess = (state: EditQuestion) =>
  state.merge({ fetching: false });

const editQuestionFailure = (state: EditQuestion, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const editQuestionTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EDIT_QUESTION_REQUEST]: editQuestionRequest,
  [Types.EDIT_QUESTION_SUCCESS]: editQuestionSuccess,
  [Types.EDIT_QUESTION_FAILURE]: editQuestionFailure,
});
