import { takeEvery, call, put } from 'redux-saga/effects';
import { Activity, PatchActivityParams, WrappedResponse } from 'requests';

import patchActivityActions, {
  patchActivityTypes,
} from '../../reducers/activities/patchActivity';

import { patchActivity, wrapApiCall } from '../../requests';

type Action = { payload: PatchActivityParams; type: string };

function* patchActivityRequest({ payload }: Action) {
  const response: WrappedResponse<Activity> = yield call(
    wrapApiCall,
    patchActivity,
    payload,
  );
  if (response.success) {
    yield put(patchActivityActions.patchActivitySuccess(response.data));
  } else {
    yield put(patchActivityActions.patchActivityFailure(response.message));
  }
}

export default function* () {
  yield takeEvery(
    patchActivityTypes.PATCH_ACTIVITY_REQUEST,
    patchActivityRequest,
  );
}
