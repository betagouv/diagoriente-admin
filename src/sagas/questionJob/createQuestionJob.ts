import { takeEvery, call, put } from 'redux-saga/effects';
import {
  IQuestionJob,
  WrappedResponse,
  CreateQuestionJobParams
} from 'requests';

import createQuestionJobActions, {
  createQuestionJobTypes
} from '../../reducers/questionJob/createQuestionJob';

import { createQuestionJob, wrapApiCall } from '../../requests';

type Action = { type: string; payload: CreateQuestionJobParams };

function* createQuestionJobRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<IQuestionJob[]> = yield call(
      wrapApiCall,
      createQuestionJob,
      payload
    );
    if (response.success) {
      yield put(createQuestionJobActions.createQuestionJobSuccess());
    } else {
      yield put(
        createQuestionJobActions.createQuestionJobFailure(response.message)
      );
    }
  } catch (e) {
    // do nothing for now
  }
}

export default function*() {
  yield takeEvery(
    createQuestionJobTypes.CREATE_QUESTION_JOB_REQUEST,
    createQuestionJobRequest
  );
}
