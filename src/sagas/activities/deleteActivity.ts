import { takeEvery, call, put } from 'redux-saga/effects';

import deleteActivityActions, {
  deleteActivityTypes,
} from '../../reducers/activities/deleteActivity';

import { deleteActivity, wrapApiCall } from '../../requests';
import { DeleteActivityParams, WrappedResponse } from 'requests';

type Action = { payload: DeleteActivityParams; type: string };

function* deleteActivityRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<{}> = yield call(
      wrapApiCall,
      deleteActivity,
      payload,
    );
    if (response.success) {
      yield put(deleteActivityActions.deleteActivitySuccess());
    } else {
      yield put(deleteActivityActions.deleteActivityFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(
    deleteActivityTypes.DELETE_ACTIVITY_REQUEST,
    deleteActivityRequest,
  );
}
