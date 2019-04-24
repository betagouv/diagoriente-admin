import { takeEvery, call, put } from 'redux-saga/effects';
import { Interest, WrappedResponse, CreateInterestParams } from 'requests';

import createInterestActions, {
  createInterestTypes,
} from '../../reducers/interests/createInterest';

import { createInterest, wrapApiCall } from '../../requests';

type Action = { type: string; payload: CreateInterestParams };

function* createInterestRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<Interest[]> = yield call(
      wrapApiCall,
      createInterest,
      payload,
    );
    if (response.success) {
      yield put(createInterestActions.createInterestSuccess());
    } else {
      yield put(createInterestActions.createInterestFailure(response.message));
    }
  } catch (e) {
    // do nothing for now
  }
}

export default function* () {
  yield takeEvery(
    createInterestTypes.CREATE_INTEREST_REQUEST,
    createInterestRequest,
  );
}
