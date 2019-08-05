import { takeEvery, call, put } from 'redux-saga/effects';

import deleteEnvironmentActions, {
  deleteEnvironmentTypes
} from '../../reducers/environment/deleteEnvironment';

import { deleteEnvironment, wrapApiCall } from '../../requests';
import { DeleteEnvironmentParams, WrappedResponse } from 'requests';

type Action = { payload: DeleteEnvironmentParams; type: string };

function* deleteEnvironmentRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<{}> = yield call(
      wrapApiCall,
      deleteEnvironment,
      payload
    );
    if (response.success) {
      yield put(deleteEnvironmentActions.deleteEnvironmentSuccess());
    } else {
      yield put(
        deleteEnvironmentActions.deleteEnvironmentFailure(response.message)
      );
    }
  } catch (e) {}
}

export default function*() {
  yield takeEvery(
    deleteEnvironmentTypes.DELETE_ENVIRONMENT_REQUEST,
    deleteEnvironmentRequest
  );
}
