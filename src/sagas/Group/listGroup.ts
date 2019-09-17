import { takeEvery, call, put } from 'redux-saga/effects';
import {
  ListCompetencesParams,
  WrappedResponse,
  ListGroupResponse,
} from 'requests';
import { pickBy, identity } from 'lodash';

import listGroupActions, {
  listGroupTypes,
} from '../../reducers/group/listGroup';

import { listgroup, listWrapApiCall } from '../../requests';

type Action = { type: string; payload?: ListCompetencesParams };

function* listGroupRequest({ payload }: Action) {
  const params = pickBy(payload, identity);

  try {
    const response: WrappedResponse<ListGroupResponse> = yield call(
      listWrapApiCall,
      listgroup,
      params,
    );
    if (response.success) {
      yield put(listGroupActions.listGroupSuccess(response.data));
    } else {
      yield put(
        listGroupActions.listGroupFailure(response.message),
      );
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(
    listGroupTypes.LIST_GROUP_REQUEST,
    listGroupRequest,
  );
}
