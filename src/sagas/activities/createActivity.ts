import { takeEvery, call, put } from 'redux-saga/effects';
import { Activity, WrappedResponse, CreateActivityParams } from 'requests';

import createActivityActions, {
  createActivityTypes,
} from '../../reducers/activities/createActivity';

import { createActivity, wrapApiCall } from '../../requests';

type Action = { type: string; payload: CreateActivityParams };

function* createActivityRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<Activity[]> = yield call(
      wrapApiCall,
      createActivity,
      payload,
    );
    if (response.success) {
      yield put(createActivityActions.createActivitySuccess());
    } else {
      yield put(createActivityActions.createActivityFailure(response.message));
    }
  } catch (e) {
    // do nothing for now
  }
}

export default function* () {
  yield takeEvery(
    createActivityTypes.CREATE_ACTIVITY_REQUEST,
    createActivityRequest,
  );
}
