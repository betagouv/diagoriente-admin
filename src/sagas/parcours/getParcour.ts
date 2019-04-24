import { takeEvery, call, put } from 'redux-saga/effects';
import {
  getParcoursParams,
  WrappedResponse,
  getParcoursResponse,
} from 'requests';

import getParcoursActions, {
  getParcoursTypes,
} from '../../reducers/parcours/GetParcour';

import { getParcour, wrapApiCall } from '../../requests';

type Action = { type: string; payload?: getParcoursParams };
const SortByType = (a: any, b: any) => {
  if (a.type < b.type) {
    return 1;
  }
  if (a.type > b.type) {
    return -1;
  }
  return 0;
};
function* getParcoursRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<getParcoursResponse> = yield call(
      wrapApiCall,
      getParcour,
      payload,
    );

    if (response.success) {
      yield put(getParcoursActions.getParcoursSuccess(response.data));
    } else {
      yield put(getParcoursActions.getParcoursFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(getParcoursTypes.GET_PARCOURS_REQUEST, getParcoursRequest);
}
