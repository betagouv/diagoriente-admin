import { takeEvery, call, put } from 'redux-saga/effects';
import {
  ListInterestsParams,
  WrappedResponse,
  Interest,
  ListInterestResponse,
} from 'requests';
import { pickBy, identity } from 'lodash';

import listInterestsActions, {
  listInterestsTypes,
} from '../../reducers/interests/listInterests';

import { listInterests, listWrapApiCall } from '../../requests';

type Action = { type: string; payload?: ListInterestsParams };

function* listInterestsRequest({ payload }: Action) {
  const params = pickBy(payload, identity);
  try {
    const response: WrappedResponse<ListInterestResponse> = yield call(
      listWrapApiCall,
      listInterests,
      params,
    );
    if (response.success) {
      yield put(listInterestsActions.listInterestsSuccess(response.data));
    } else {
      yield put(listInterestsActions.listInterestsFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(
    listInterestsTypes.LIST_INTERESTS_REQUEST,
    listInterestsRequest,
  );
}
