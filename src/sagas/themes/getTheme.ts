import { takeEvery, call, put } from 'redux-saga/effects';

import getThemeActions, { getThemeTypes } from '../../reducers/themes/getTheme';
import { getTheme, wrapApiCall } from '../../requests';
import { GetThemeParams, WrappedResponse, Theme } from 'requests';

type Action = { type: string; payload: GetThemeParams };

function* getThemeRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<Theme> = yield call(
      wrapApiCall,
      getTheme,
      payload,
    );
    if (response.success) {
      yield put(getThemeActions.getThemeSuccess(response.data));
    } else {
      yield put(getThemeActions.getThemeFailure(response.message));
    }
  } catch (e) {
    //
  }
}

export default function* () {
  yield takeEvery(getThemeTypes.GET_THEME_REQUEST, getThemeRequest);
}
