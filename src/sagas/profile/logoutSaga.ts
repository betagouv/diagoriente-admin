import { takeLatest, put } from 'redux-saga/effects';
import loginActions, { loginTypes } from '../../reducers/login';
import { setAuthorizationBearer } from '../../requests/http';
import localforage from 'localforage';

function* getRequest(): IterableIterator<any> {
  localforage.clear();
  setAuthorizationBearer(null);
}
export function* logoutSaga() {
  yield takeLatest(loginTypes.LOGOUT, getRequest);
}
