import { takeLatest, put, select, call } from 'redux-saga/effects';
import axios from 'axios';
import moment from 'moment';
import localforage from 'localforage';
import startUpActions, { startUpTypes } from '../reducers/startUp';
import loginActions from '../reducers/login';
import loginAdvisorActions from '../reducers/loginAdvisor';
import { setAuthorizationBearer, authorizationBearer } from '../requests/http';
import { callLocalForage } from '../utils/callLocalForage';

function* getRequest() {
  const { login } = yield select();
  const role = login.toJS().role;
  // console.log('role startup', login.toJS());
  try {
    const domain =
      process.env.REACT_APP_API_URL || 'https://api2.projetttv.org';
    const baseUrl = domain + '/v1/auth/refresh-token';

    let token = null;
    const value = yield (call as any)(localforage.getItem, 'token');
   // console.log(value);
    if (value) {
      token = JSON.parse(value);
      const payload = {
        userId: token.admin ? token.admin._id : token.advisor._id,
        refreshToken: token.token.refreshToken,
      };
     // console.log(payload.refreshToken);

      let responseStatus = 0;
      const response = yield axios
        .post(baseUrl, payload)
        .then(response => {
          responseStatus = response.status;
          return response.data;
        })
        .catch(err => ({ status: 'error', error: Promise.reject(err) }));
      // console.log(responseStatus);
      if (responseStatus === 200) {
        const err = yield call(callLocalForage, { ...token, token: response });

        if (!err) {
          setAuthorizationBearer(response.accessToken);
          yield put(loginActions.loginSuccess(response, role, payload.userId));
          // console.log(localforage);
          yield put(startUpActions.startupDone());
         // console.log(authorizationBearer);
          return;
        }
        throw err;
      }
      yield put(startUpActions.startupDone());
    }
    yield put(startUpActions.startupDone());
  } catch (e) {
   // console.log(e);
    yield put(startUpActions.startupDone());
  }
}

export function* startUp() {
  yield takeLatest(startUpTypes.RUN_START_UP, getRequest);
}
