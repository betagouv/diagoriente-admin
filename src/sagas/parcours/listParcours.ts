import { takeEvery, call, put } from 'redux-saga/effects';
import {
  listParcoursParams,
  WrappedResponse,
  IParcour,
  ListParcoursResponse,
} from 'requests';
import { pickBy, identity } from 'lodash';

import listParcoursActions, {
  listParcoursTypes,
} from '../../reducers/parcours/ListParcours';

import { listParcours, listWrapApiCall } from '../../requests';

type Action = { type: string; payload?: listParcoursParams };

function* listParcoursRequest({ payload }: Action) {
  const params = pickBy(payload, identity);
  try {
    const response: WrappedResponse<ListParcoursResponse> = yield call(
      listWrapApiCall,
      listParcours,
      params,
    );
    if (response.success) {
      yield put(listParcoursActions.listParcoursSuccess(response.data));
    } else {
      yield put(listParcoursActions.listParcoursFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(listParcoursTypes.LIST_PARCOURS_REQUEST, listParcoursRequest);
}
