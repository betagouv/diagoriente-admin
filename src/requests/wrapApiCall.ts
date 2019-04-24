import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

export function* wrapApiCall(fn: Function, ...args: any[]) {
  try {
    // do the api call
    const response = yield (call as any)(fn, ...args);
    if (response.code >= 400) {
      if (response.code === 401) {
        // reduction login
        yield put(push('/login'));
      }
      return {
        message: response.message,
        errors: response.errors,
        success: false,
      };
    }

    return { data: response.data, success: true };
  } catch (error) {
    throw error;
  }
}

export function* listWrapApiCall(fn: Function, ...args: any[]) {
  while (true) {
    try {
      // do the api call
      const response = yield (call as any)(wrapApiCall, fn, ...args);
      return response;
    } catch (error) {
      // redo the request
    }
  }
}
