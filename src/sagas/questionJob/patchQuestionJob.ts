import { takeEvery, call, put } from 'redux-saga/effects';
import {
  IQuestionJob,
  PatchQuestionJobparams,
  WrappedResponse
} from 'requests';

import patchQuestionJobActions, {
  patchQuestionJobTypes
} from '../../reducers/questionJob/patchQuestionJob';

import { patchQuestionJob, wrapApiCall } from '../../requests';

type Action = { payload: PatchQuestionJobparams; type: string };

function* patchQuestionJobRequest({ payload }: Action) {
  const response: WrappedResponse<IQuestionJob> = yield call(
    wrapApiCall,
    patchQuestionJob,
    payload
  );
  if (response.success) {
    yield put(patchQuestionJobActions.patchQuestionJobSuccess(response.data));
  } else {
    yield put(
      patchQuestionJobActions.patchQuestionJobFailure(response.message)
    );
  }
}

export default function*() {
  yield takeEvery(
    patchQuestionJobTypes.PATCH_QUESTION_JOB_REQUEST,
    patchQuestionJobRequest
  );
}
