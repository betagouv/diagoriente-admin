import { takeEvery, call, put } from 'redux-saga/effects';
import { IContext, WrappedResponse, CreateContextParams } from 'requests';

import createContextActions, {
  createContextTypes,
} from '../../reducers/context/createContext';

import { createContext, wrapApiCall } from '../../requests';

type Action = { type: string; payload: CreateContextParams };

function* createContextRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<IContext[]> = yield call(
      wrapApiCall,
      createContext,
      payload,
    );
    if (response.success) {
      yield put(createContextActions.createContextSuccess());
    } else {
      yield put(createContextActions.createContextFailure(response.message));
    }
  } catch (e) {
    // do nothing for now
  }
}

export default function* () {
  yield takeEvery(
    createContextTypes.CREATE_CONTEXT_REQUEST,
    createContextRequest,
  );
}
