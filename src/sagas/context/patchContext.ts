import { takeEvery, call, put } from 'redux-saga/effects';
import { IContext, PatchContextparams, WrappedResponse } from 'requests';

import patchContextActions, {
  patchContextTypes,
} from '../../reducers/context/patchContext';

import { patchContext, wrapApiCall } from '../../requests';

type Action = { payload: PatchContextparams; type: string };

function* patchContextRequest({ payload }: Action) {
  const response: WrappedResponse<IContext> = yield call(
    wrapApiCall,
    patchContext,
    payload,
  );
  if (response.success) {
    yield put(patchContextActions.patchContextSuccess(response.data));
  } else {
    yield put(patchContextActions.patchContextFailure(response.message));
  }
}

export default function* () {
  yield takeEvery(
    patchContextTypes.PATCH_CONTEXT_REQUEST,
    patchContextRequest,
  );
}
