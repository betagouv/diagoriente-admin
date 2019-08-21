import { takeEvery, call, put } from 'redux-saga/effects';

import getQuestionJobActions, {
  getQuestionJobTypes
} from '../../reducers/questionJob/getQuestionJob';
import { getQuestionJob, wrapApiCall } from '../../requests';
import { GetQuestionJobParams, WrappedResponse, IQuestionJob } from 'requests';

type Action = { type: string; payload: GetQuestionJobParams };

function* getQuestionJobRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<IQuestionJob> = yield call(
      wrapApiCall,
      getQuestionJob,
      payload
    );
    if (response.success) {
      yield put(getQuestionJobActions.getQuestionJobSuccess(response.data));
    } else {
      yield put(getQuestionJobActions.getQuestionJobFailure(response.message));
    }
  } catch (e) {
    //
  }
}

export default function*() {
  yield takeEvery(
    getQuestionJobTypes.GET_QUESTION_JOB_REQUEST,
    getQuestionJobRequest
  );
}
