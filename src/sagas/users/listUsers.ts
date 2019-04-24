import { takeEvery, call, put } from 'redux-saga/effects';
import {
  listUsersParams,
  WrappedResponse,
  IUser,
  ListUsersResponse,
} from 'requests';
import { pickBy, identity } from 'lodash';

import listUserActions, { listUserTypes } from '../../reducers/users/listUsers';

import { listUsers, listWrapApiCall } from '../../requests';

type Action = { type: string; payload?: listUsersParams };

function* listUsersRequest({ payload }: Action) {
  const params = pickBy(payload, identity);
  try {
    const response: WrappedResponse<ListUsersResponse> = yield call(
      listWrapApiCall,
      listUsers,
      params,
    );
    if (response.success) {
      yield put(listUserActions.listUsersSuccess(response.data));
    } else {
      yield put(listUserActions.listUsersFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(listUserTypes.LIST_USERS_REQUEST, listUsersRequest);
}
