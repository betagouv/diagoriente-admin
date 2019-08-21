import { takeEvery, call, put } from 'redux-saga/effects';
import {
  ListQuestionJobsParams,
  WrappedResponse,
  IQuestionJob,
  ListQuestionJobResponse
} from 'requests';
import { pickBy, identity } from 'lodash';

import listQuestionJobActions, {
  listQuestionJobTypes
} from '../../reducers/questionJob/listQuestionJob';

import { listQuestionJob, listWrapApiCall } from '../../requests';

type Action = { type: string; payload?: ListQuestionJobsParams };

function* listQuestionJobRequest({ payload }: Action) {
  const params = pickBy(payload, identity);
  try {
    const response: WrappedResponse<ListQuestionJobResponse> = yield call(
      listWrapApiCall,
      listQuestionJob,
      params
    );
    if (response.success) {
      yield put(listQuestionJobActions.listQuestionJobSuccess(response.data));
    } else {
      yield put(
        listQuestionJobActions.listQuestionJobFailure(response.message)
      );
    }
  } catch (e) {}
}

export default function*() {
  yield takeEvery(
    listQuestionJobTypes.LIST_QUESTION_JOB_REQUEST,
    listQuestionJobRequest
  );
}
