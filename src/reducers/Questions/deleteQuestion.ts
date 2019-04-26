import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { DeleteQuestion } from 'reducers';

const INITIAL_STATE: DeleteQuestion = Map({
    fetching: false,
    error: '',
});

const { Types, Creators } = createActions({
    deleteQuestionRequest: ['payload'],
    deleteQuestionSuccess: [],
    deleteQuestionFailure: ['error'],
});

const deleteQuestionRequest = () => INITIAL_STATE.merge({ fetching: true });

const deleteQuestionSuccess = (state: DeleteQuestion) =>
    state.merge({ fetching: false });

const deleteQuestionFailure = (state: DeleteQuestion, { error }: AnyAction) =>
    state.merge({
        error,
        fetching: false,
    });

export const deleteQuestionTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
    [Types.DELETE_QUESTION_REQUEST]: deleteQuestionRequest,
    [Types.DELETE_QUESTION_SUCCESS]: deleteQuestionSuccess,
    [Types.DELETE_QUESTION_FAILURE]: deleteQuestionFailure,
});
