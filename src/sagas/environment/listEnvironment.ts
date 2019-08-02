import { takeEvery, call, put } from 'redux-saga/effects';
import {
  ListEnvironmentsParams,
  WrappedResponse,
  IEnvironment,
  ListEnvironmentResponse
} from 'requests';
import { pickBy, identity } from 'lodash';

import listEnvironmentActions, {
  listEnvironmentTypes
} from '../../reducers/environment/listEnvironment';

import { listEnvironment, listWrapApiCall } from '../../requests';

type Action = { type: string; payload?: ListEnvironmentsParams };

function* listEnvironmentRequest({ payload }: Action) {
  const params = pickBy(payload, identity);
  try {
    const response: WrappedResponse<ListEnvironmentResponse> = yield call(
      listWrapApiCall,
      listEnvironment,
      params
    );
    if (response.success) {
      yield put(listEnvironmentActions.listEnvironmentSuccess(response.data));
    } else {
      yield put(
        listEnvironmentActions.listEnvironmentFailure(response.message)
      );
    }
  } catch (e) {}
}

export default function*() {
  yield takeEvery(
    listEnvironmentTypes.LIST_ENVIRONMENT_REQUEST,
    listEnvironmentRequest
  );
}
