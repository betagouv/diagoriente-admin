import { takeEvery, call, put } from 'redux-saga/effects';
import { ListContextsParams, WrappedResponse, IContext , ListContextResponse } from 'requests';
import { pickBy, identity } from 'lodash';

import listContextActions, {
  listContextTypes,
} from '../../reducers/context/listContext';

import { listContext, listWrapApiCall } from '../../requests';

type Action = { type: string; payload?: ListContextsParams };

function* listContextRequest({ payload }: Action) {
  const params = pickBy(payload, identity);
  try {
    const response: WrappedResponse<ListContextResponse> = yield call(
      listWrapApiCall,
      listContext,
      params,
    );
    if (response.success) {
      yield put(listContextActions.listContextSuccess(response.data));
    } else {
      yield put(listContextActions.listContextFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(
    listContextTypes.LIST_CONTEXT_REQUEST,
    listContextRequest,
  );
}
