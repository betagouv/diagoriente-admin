import { takeEvery, call, put } from 'redux-saga/effects';
import { Question, EditQuestionParams, WrappedResponse } from 'requests';

import editQuestionsActions, {
  editQuestionTypes,
} from '../../reducers/Questions/editQuestion';

import { editQuestion, wrapApiCall } from '../../requests';

type Action = { payload: EditQuestionParams; type: string };

function* editQuestionRequest({ payload }: Action) {
  const response: WrappedResponse<Question> = yield call(
    wrapApiCall,
    editQuestion,
    payload,
  );
  if (response.success) {
    yield put(editQuestionsActions.editQuestionSuccess(response.data));
  } else {
    yield put(editQuestionsActions.editQuestionFailure(response.message));
  }
}

export default function* () {
  yield takeEvery(
    editQuestionTypes.EDIT_QUESTION_REQUEST,
    editQuestionRequest,
  );
}
