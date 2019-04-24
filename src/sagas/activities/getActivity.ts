import { takeEvery, call, put } from 'redux-saga/effects';

import getActivityActions, {
  getActivityTypes,
} from '../../reducers/activities/getActivity';
import { getActivity, wrapApiCall } from '../../requests';
import { GetActivityParams, WrappedResponse, Activity } from 'requests';

type Action = { type: string; payload: GetActivityParams };

function* getActivityRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<Activity> = yield call(
      wrapApiCall,
      getActivity,
      payload,
    );
    if (response.success) {
      yield put(getActivityActions.getActivitySuccess(response.data));
    } else {
      yield put(getActivityActions.getActivityFailure(response.message));
    }
  } catch (e) {
    //
  }
}

export default function* () {
  yield takeEvery(getActivityTypes.GET_ACTIVITY_REQUEST, getActivityRequest);
}
