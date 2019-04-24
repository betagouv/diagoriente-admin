import { takeEvery, call, put } from 'redux-saga/effects';

import getUserActions, { getUserTypes } from '../../reducers/users/getUser';
import { getTheme, wrapApiCall } from '../../requests';
import { GetUserParams, WrappedResponse, IUser } from 'requests';

type Action = { type: string; payload: GetUserParams };

function* getUserRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<IUser> = yield call(
      wrapApiCall,
      getTheme,
      payload,
    );
    if (response.success) {
      yield put(getUserActions.getUserSuccess(response.data));
    } else {
      yield put(getUserActions.getUserFailure(response.message));
    }
  } catch (e) {
    //
  }
}

export default function* () {
  yield takeEvery(getUserTypes.GET_USER_REQUEST, getUserRequest);
}
