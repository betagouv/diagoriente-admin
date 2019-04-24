import { takeEvery, call, put } from 'redux-saga/effects';
import {
  ListFamillesParams,
  WrappedResponse,
  Famille,
  ListFamillesResponse,
} from 'requests';
import { pickBy, identity } from 'lodash';

import listFamillesActions, {
  listFamillesTypes,
} from '../../reducers/famille/listFamille';

import { listFamilles, listWrapApiCall } from '../../requests';

type Action = { type: string; payload?: ListFamillesParams };

function* listFamillesRequest({ payload }: Action) {
  const params = pickBy(payload, identity);
  try {
    const response: WrappedResponse<ListFamillesResponse> = yield call(
      listWrapApiCall,
      listFamilles,
      params,
    );
    if (response.success) {
      yield put(listFamillesActions.listFamillesSuccess(response.data));
    } else {
      yield put(listFamillesActions.listFamillesFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(
    listFamillesTypes.LIST_FAMILLES_REQUEST,
    listFamillesRequest,
  );
}
