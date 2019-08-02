import { takeEvery, call, put } from 'redux-saga/effects';

import getEnvironmentActions, {
  getEnvironmentTypes
} from '../../reducers/environment/getEnvironment';
import { getEnvironment, wrapApiCall } from '../../requests';
import { GetEnvironmentParams, WrappedResponse, IEnvironment } from 'requests';

type Action = { type: string; payload: GetEnvironmentParams };

function* getEnvironmentRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<IEnvironment> = yield call(
      wrapApiCall,
      getEnvironment,
      payload
    );
    if (response.success) {
      yield put(getEnvironmentActions.getEnvironmentSuccess(response.data));
    } else {
      yield put(getEnvironmentActions.getEnvironmentFailure(response.message));
    }
  } catch (e) {
    //
  }
}

export default function*() {
  yield takeEvery(
    getEnvironmentTypes.GET_ENVIRONMENT_REQUEST,
    getEnvironmentRequest
  );
}
