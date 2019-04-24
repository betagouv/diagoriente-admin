import { takeLatest, put, select, call } from 'redux-saga/effects';
import { replace } from 'connected-react-router';
import loginAdvisorActions, { loginAdvisorTypes } from '../../reducers/loginAdvisor';
import { setAuthorizationBearer } from '../../requests/http';
import { callLocalForage } from '../../utils/callLocalForage';
import { LoginAdvisor, wrapApiCall } from '../../requests';
import { WrappedResponse } from 'requests';
function* getRequest() {
  try {
    const { loginAdvisor } = yield select();

    const payload = {
      email: loginAdvisor.get('email'),
      password: loginAdvisor.get('password'),
    };
    let err = '';
    const response: any = yield call(LoginAdvisor, payload);

    if (response.code === 200) {
      err = yield call(callLocalForage, response.data);
      if (!err) {
        setAuthorizationBearer(response.data.token.accessToken);
        yield put(
          loginAdvisorActions.loginAdvisorSuccess(
            response.data.token,
            response.data.advisor.role,
            response.data.advisor._id,
          ),
        );

        yield put(replace('/parcours'));
      }
    } else {
      yield put(loginAdvisorActions.loginAdvisorFailure(response.message));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* loginSagaAdvisor() {
  yield takeLatest(loginAdvisorTypes.LOGIN_ADVISOR_REQUEST, getRequest);
}
