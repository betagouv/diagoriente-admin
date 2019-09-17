import { takeEvery, call, put } from 'redux-saga/effects';

import getGroupActions, {
    getGroupTypes,
} from '../../reducers/group/getGroup';
import { getGroup, wrapApiCall } from '../../requests';
import { GetGroupParams, WrappedResponse, IGroup } from 'requests';

type Action = { type: string; payload: GetGroupParams };

function* getGroupRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<IGroup> = yield call(
      wrapApiCall,
      getGroup,
      payload,
    );
    if (response.success) {
      yield put(getGroupActions.getGroupSuccess(response.data));
    } else {
      yield put(getGroupActions.getGroupFailure(response.message));
    }
  } catch (e) {
    //
  }
}

export default function* () {
  yield takeEvery(getGroupTypes.GET_GROUP_REQUEST, getGroupRequest);
}