import { takeEvery, call, put } from 'redux-saga/effects';
import { IGroup, WrappedResponse, createGroupParams } from 'requests';

import createGroupActions, {
  createGroupTypes,
} from '../../reducers/group/createGroup';

import { createGroupCall, wrapApiCall } from '../../requests';

type Action = { type: string; payload: createGroupParams };

function* createGroupRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<IGroup[]> = yield call(
      wrapApiCall,
      createGroupCall,
      payload,
    );
    if (response.success) {
      yield put(createGroupActions.createGroupSuccess());
    } else {
      yield put(createGroupActions.createGroupFailure(response.message));
    }
  } catch (e) {
    // do nothing for now
  }
}

export default function* () {
  yield takeEvery(
    createGroupTypes.CREATE_GROUP_REQUEST,
    createGroupRequest,
  );
}
