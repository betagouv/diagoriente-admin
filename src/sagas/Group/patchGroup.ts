import { takeEvery, call, put } from 'redux-saga/effects';
import { IGroup, PatchGroupParams, WrappedResponse } from 'requests';

import patchGroupActions, {
    PatchGroupTypes,
} from '../../reducers/group/patchGroup';

import { patchGroup, wrapApiCall } from '../../requests';

type Action = { payload: PatchGroupParams; type: string };

function* patchGroupRequest({ payload }: Action) {
  const response: WrappedResponse<IGroup> = yield call(
    wrapApiCall,
    patchGroup,
    payload,
  );
  if (response.success) {
    yield put(patchGroupActions.patchGroupSuccess(response.data));
  } else {
    yield put(patchGroupActions.patchGroupFailure(response.message));
  }
}

export default function* () {
  yield takeEvery(
    PatchGroupTypes.PATCH_GROUP_REQUEST,
    patchGroupRequest,
  );
}
