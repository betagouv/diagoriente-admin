import { takeEvery, call, put } from 'redux-saga/effects';
import { ListAdvisorsParams, WrappedResponse, IUser , ListAdvisorsResponse } from 'requests';
import { pickBy, identity } from 'lodash';

import listAdvisorsActions, { listAdvisorsTypes } from '../../reducers/Advisor/listAdvisors';

import { listadvisors, listWrapApiCall } from '../../requests';

type Action = { type: string; payload?: ListAdvisorsParams };

function* listAdvisorsRequest({ payload }: Action) {
  const params = pickBy(payload, identity);
  try {
    const response: WrappedResponse<ListAdvisorsResponse> = yield call(
      listWrapApiCall,
      listadvisors,
      params,
    );
    if (response.success) {
      yield put(listAdvisorsActions.listAdvisorsSuccess(response.data));
    } else {
      yield put(listAdvisorsActions.listAdvisorsFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(listAdvisorsTypes.LIST_ADVISORS_REQUEST, listAdvisorsRequest);
}
