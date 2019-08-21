import { takeEvery, call, put } from 'redux-saga/effects';

import deleteQuestionJobActions, {
  deleteQuestionJobTypes
} from '../../reducers/questionJob/deleteQuestionJob';

import { deleteQuestionJob, wrapApiCall } from '../../requests';
import { DeleteQuestionJobParams, WrappedResponse } from 'requests';

type Action = { payload: DeleteQuestionJobParams; type: string };

function* deleteQuestionJobRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<{}> = yield call(
      wrapApiCall,
      deleteQuestionJob,
      payload
    );
    if (response.success) {
      yield put(deleteQuestionJobActions.deleteQuestionJobSuccess());
    } else {
      yield put(
        deleteQuestionJobActions.deleteQuestionJobFailure(response.message)
      );
    }
  } catch (e) {}
}

export default function*() {
  yield takeEvery(
    deleteQuestionJobTypes.DELETE_QUESTION_JOB_REQUEST,
    deleteQuestionJobRequest
  );
}
