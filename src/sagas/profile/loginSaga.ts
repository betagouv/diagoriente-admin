import { takeLatest, put, select, call } from 'redux-saga/effects';
import { replace } from 'connected-react-router';
import loginActions, { loginTypes } from '../../reducers/login';
import { setAuthorizationBearer , authorizationBearer } from '../../requests/http';
import { callLocalForage } from '../../utils/callLocalForage';
import { LoginAdvisor, Login, wrapApiCall } from '../../requests';
import { WrappedResponse } from 'requests';
import loginAdvisorActions, {
  loginAdvisorTypes,
} from '../../reducers/loginAdvisor';

function* getRequest() {
  try {
    const { login } = yield select();

    const payload = {
      email: login.get('email'),
      password: login.get('password'),
    };
    let err = '';
    const response2: any = yield call(LoginAdvisor, payload);
    const response: any = yield call(Login, payload);

    if (response.code === 200) {
      err = yield call(callLocalForage, response.data);
      if (!err) {
        setAuthorizationBearer(response.data.token.accessToken);
        yield put(
          loginActions.loginSuccess(
            response.data.token,
            response.data.admin.role,
            response.data.admin._id,
          ),
        );
      //  yield put(replace('/themes'));
      }/* else {

      } */
    } else if (response2.code === 200) {
      err = yield call(callLocalForage, response2.data);
      if (!err) {
        setAuthorizationBearer(response2.data.token.accessToken);
        console.log('name saga',response2.data.advisor.profile.firstName)
        yield put(
          loginActions.loginSuccess(
            response2.data.token,
            response2.data.advisor.role,
            response2.data.advisor._id,
            response2.data.advisor.profile.firstName,
            response2.data.advisor.profile.lastName,
          ),
        );

       /*  yield put(replace('/parcours')); */
      }
    } else {
      yield put(loginActions.loginFailure(response.message));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* loginSaga() {
  yield takeLatest(loginTypes.LOGIN_REQUEST, getRequest);
}
