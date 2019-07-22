import { takeEvery, call, put } from 'redux-saga/effects';

import getContextActions, {
  getContextTypes,
} from '../../reducers/context/getContext';
import { getContext, wrapApiCall } from '../../requests';
import { GetContextParams, WrappedResponse, IContext } from 'requests';

type Action = { type: string; payload: GetContextParams };

function* getContextRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<IContext> = yield call(
      wrapApiCall,
      getContext,
      payload,
    );
    if (response.success) {
      yield put(getContextActions.getContextSuccess(response.data));
    } else {
      yield put(getContextActions.getContextFailure(response.message));
    }
  } catch (e) {
    //
  }
}

export default function* () {
  yield takeEvery(getContextTypes.GET_CONTEXT_REQUEST, getContextRequest);
}
