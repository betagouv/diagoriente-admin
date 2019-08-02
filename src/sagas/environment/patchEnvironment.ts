import { takeEvery, call, put } from 'redux-saga/effects';
import {
  IEnvironment,
  PatchEnvironmentparams,
  WrappedResponse
} from 'requests';

import patchEnvironmentActions, {
  patchEnvironmentTypes
} from '../../reducers/environment/patchEnvironment';

import { patchEnvironment, wrapApiCall } from '../../requests';

type Action = { payload: PatchEnvironmentparams; type: string };

function* patchEnvironmentRequest({ payload }: Action) {
  const response: WrappedResponse<IEnvironment> = yield call(
    wrapApiCall,
    patchEnvironment,
    payload
  );
  if (response.success) {
    yield put(patchEnvironmentActions.patchEnvironmentSuccess(response.data));
  } else {
    yield put(
      patchEnvironmentActions.patchEnvironmentFailure(response.message)
    );
  }
}

export default function*() {
  yield takeEvery(
    patchEnvironmentTypes.PATCH_ENVIRONMENT_REQUEST,
    patchEnvironmentRequest
  );
}
