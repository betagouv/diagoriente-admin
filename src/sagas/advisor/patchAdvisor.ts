import { takeEvery, call, put } from 'redux-saga/effects';
import { Iadvisor, PatchAdvisorParams, WrappedResponse } from 'requests';

import patchAdvisorActions, {
  patchAdvisorTypes,
} from '../../reducers/Advisor/patchAdvisor';

import { patchadvisor, wrapApiCall } from '../../requests';

type Action = { payload: PatchAdvisorParams; type: string };

function* patchAdvisorRequest({ payload }: Action) {
  const response: WrappedResponse<Iadvisor> = yield call(
    wrapApiCall,
    patchadvisor,
    payload,
  );
  if (response.success) {
    yield put(patchAdvisorActions.patchAdvisorSuccess(response.data));
  } else {
    yield put(patchAdvisorActions.patchAdvisorFailure(response.message));
  }
}

export default function* () {
  yield takeEvery(
    patchAdvisorTypes.PATCH_ADVISOR_REQUEST,
    patchAdvisorRequest,
  );
}
