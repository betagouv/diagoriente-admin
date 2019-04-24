import { takeEvery, call, put } from 'redux-saga/effects';

import getInterestActions, {
  getInterestTypes,
} from '../../reducers/interests/getInterest';
import { getInterest, wrapApiCall } from '../../requests';
import { GetInterestParams, WrappedResponse, Interest } from 'requests';

type Action = { type: string; payload: GetInterestParams };

function* getInterestRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<Interest> = yield call(
      wrapApiCall,
      getInterest,
      payload,
    );
    if (response.success) {
      yield put(getInterestActions.getInterestSuccess(response.data));
    } else {
      yield put(getInterestActions.getInterestFailure(response.message));
    }
  } catch (e) {
    //
  }
}

export default function* () {
  yield takeEvery(getInterestTypes.GET_INTEREST_REQUEST, getInterestRequest);
}
