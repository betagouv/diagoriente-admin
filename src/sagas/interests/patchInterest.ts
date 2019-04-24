import { takeEvery, call, put } from 'redux-saga/effects';
import { Interest, PatchInterestParams, WrappedResponse } from 'requests';

import patchInterestsActions, {
  patchInterestTypes,
} from '../../reducers/interests/patchInterest';

import { patchInterest, wrapApiCall } from '../../requests';

type Action = { payload: PatchInterestParams; type: string };

function* patchInterestRequest({ payload }: Action) {
  const response: WrappedResponse<Interest> = yield call(
    wrapApiCall,
    patchInterest,
    payload,
  );
  if (response.success) {
    yield put(patchInterestsActions.patchInterestSuccess(response.data));
  } else {
    yield put(patchInterestsActions.patchInterestFailure(response.message));
  }
}

export default function* () {
  yield takeEvery(
    patchInterestTypes.PATCH_INTEREST_REQUEST,
    patchInterestRequest,
  );
}
