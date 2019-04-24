import { takeEvery, call, put } from 'redux-saga/effects';

import deleteThemeActions, {
  deleteThemeTypes,
} from '../../reducers/themes/deleteTheme';

import { deleteTheme } from '../../requests';
import { DeleteThemeParams, WrappedResponse } from 'requests';

type Action = { payload: DeleteThemeParams; type: string };

function* deleteThemeRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<{}> = yield call(deleteTheme, payload);
    if (response.success) {
      yield put(deleteThemeActions.deleteThemeSuccess());
    } else {
      yield put(deleteThemeActions.deleteThemeFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(deleteThemeTypes.DELETE_THEME_REQUEST, deleteThemeRequest);
}
