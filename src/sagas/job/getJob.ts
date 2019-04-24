import { takeEvery, call, put } from 'redux-saga/effects';

import getJobsActions, { getJobsTypes } from '../../reducers/job/GetJob';
import { getMyJob, wrapApiCall } from '../../requests';
import { WrappedResponse, Job, getJobsParams } from 'requests';

type Action = { type: string; payload: {parcourId: string , algoType: string}};

function* getJobsRequest({ payload }: Action) {
  const { parcourId , algoType } = payload;

  try {
    const response: WrappedResponse<Job> = yield call(wrapApiCall, getMyJob, parcourId, algoType);

    if (response.success) {
      yield put(getJobsActions.getJobsSuccess(response.data));
    } else {
      yield put(getJobsActions.getJobsFailure(response.message));
    }
  } catch (e) {
    //
  }
}

export default function* () {
  yield takeEvery(getJobsTypes.GET_JOBS_REQUEST, getJobsRequest);
}
