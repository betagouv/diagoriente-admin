import { takeEvery, call, put } from 'redux-saga/effects';
import {
  IEnvironment,
  WrappedResponse,
  CreateEnvironmentParams
} from 'requests';

import createEnvironmentActions, {
  createEnvironmentTypes
} from '../../reducers/environment/createEnvironment';

import { createEnvironment, wrapApiCall } from '../../requests';

type Action = { type: string; payload: CreateEnvironmentParams };

function* createEnvironmentRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<IEnvironment[]> = yield call(
      wrapApiCall,
      createEnvironment,
      payload
    );
    if (response.success) {
      yield put(createEnvironmentActions.createEnvironmentSuccess());
    } else {
      yield put(
        createEnvironmentActions.createEnvironmentFailure(response.message)
      );
    }
  } catch (e) {
    // do nothing for now
  }
}

export default function*() {
  yield takeEvery(
    createEnvironmentTypes.CREATE_ENVIRONMENT_REQUEST,
    createEnvironmentRequest
  );
}
