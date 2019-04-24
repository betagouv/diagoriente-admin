import { takeEvery, call, put } from 'redux-saga/effects';

import deleteUserActions, {
  deleteUserTypes,
} from '../../reducers/users/deleteUsers';

import { deleteUser } from '../../requests';
import { DeleteUserParams, WrappedResponse } from 'requests';

type Action = { payload: DeleteUserParams; type: string };

function* deleteUserRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<{}> = yield call(deleteUser, payload);
    if (response.success) {
      yield put(deleteUserActions.deleteUserSuccess());
    } else {
      yield put(deleteUserActions.deleteUserFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(deleteUserTypes.DELETE_USER_REQUEST, deleteUserRequest);
}
