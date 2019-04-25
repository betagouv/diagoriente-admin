import { takeEvery, call, put } from 'redux-saga/effects';

import getQuestionActions, {
  getQuestionTypes,
} from '../../reducers/Questions/getQuestions';
import { getQuestion, wrapApiCall } from '../../requests';
import { GetQuestionParams, WrappedResponse, Question } from 'requests';

type Action = { type: string; payload: GetQuestionParams };

function* getQuestionRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<Question> = yield call(
      wrapApiCall,
      getQuestion,
      payload,
    );
    if (response.success) {
      yield put(getQuestionActions.getQuestionSuccess(response.data));
    } else {
      yield put(getQuestionActions.getQuestionFailure(response.message));
    }
  } catch (e) {
    //
  }
}

export default function* () {
  yield takeEvery(getQuestionTypes.GET_QUESTION_REQUEST, getQuestionRequest);
}
