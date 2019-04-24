import { takeEvery, call, put } from 'redux-saga/effects';

import deleteInterestActions, {
  deleteInterestTypes,
} from '../../reducers/interests/deleteInterest';

import { deleteInterest, wrapApiCall } from '../../requests';
import { DeleteInterestParams, WrappedResponse } from 'requests';

type Action = { payload: DeleteInterestParams; type: string };

function* deleteInterestRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<{}> = yield call(
      wrapApiCall,
      deleteInterest,
      payload,
    );
    if (response.success) {
      yield put(deleteInterestActions.deleteInterestSuccess());
    } else {
      yield put(deleteInterestActions.deleteInterestFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(
    deleteInterestTypes.DELETE_INTEREST_REQUEST,
    deleteInterestRequest,
  );
}
