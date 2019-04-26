import { takeEvery, call, put } from 'redux-saga/effects';

import deleteQuestionActions, {
  deleteQuestionTypes,
} from '../../reducers/Questions/deleteQuestion';

import { deleteQuestion, wrapApiCall } from '../../requests';
import { DeleteQuestionParams, WrappedResponse } from 'requests';

type Action = { payload: DeleteQuestionParams; type: string };

function* deleteQuestionRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<{}> = yield call(
      wrapApiCall,
      deleteQuestion,
      payload,
    );
    if (response.success) {
      yield put(deleteQuestionActions.deleteQuestionSuccess());
    } else {
      yield put(deleteQuestionActions.deleteQuestionFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(
    deleteQuestionTypes.DELETE_QUESTION_REQUEST,
    deleteQuestionRequest,
  );
}
