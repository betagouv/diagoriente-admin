import { takeEvery, call, put } from 'redux-saga/effects';
import { Question, WrappedResponse, CreateQuestionParams } from 'requests';

import createQuestionActions, {
  createQuestionTypes,
} from '../../reducers/Questions/createQuestion';

import { createQuestion, wrapApiCall } from '../../requests';

type Action = { type: string; payload: CreateQuestionParams };

function* createQuestionRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<Question[]> = yield call(
      wrapApiCall,
      createQuestion,
      payload,
    );
    if (response.success) {
      yield put(createQuestionActions.createQuestionSuccess());
    } else {
      yield put(createQuestionActions.createQuestionFailure(response.message));
    }
  } catch (e) {
    // do nothing for now
  }
}

export default function* () {
  yield takeEvery(
    createQuestionTypes.CREATE_QUESTION_REQUEST,
    createQuestionRequest,
  );
}
