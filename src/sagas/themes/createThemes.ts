import { takeEvery, call, put } from 'redux-saga/effects';
import { Theme, WrappedResponse, CreateThemeParams } from 'requests';

import createThemeActions, {
  createThemeTypes,
} from '../../reducers/themes/createTheme';

import { createTheme, wrapApiCall, updateFileData } from '../../requests';

type Action = { type: string; payload: CreateThemeParams };

function* createThemeRequest({ payload }: Action) {
  try {
    const { icon, resources, ...other } = payload;
    const response: WrappedResponse<Theme> = yield call(
      wrapApiCall,
      createTheme,
      other,
    );
    if (response.success && response.data) {
      const formData = new FormData();
      if (icon) {
        formData.append('icon', icon);

      }

      if (resources.backgroundColor) {
        formData.append('backgroundColor', resources.backgroundColor);
      }
      yield call(wrapApiCall, updateFileData, response.data._id, formData);

      yield put(createThemeActions.createThemeSuccess());
    } else {
      yield put(createThemeActions.createThemeFailure(response.message));
    }
  } catch (e) {
    // do nothing for now
  }
}

export default function* () {
  yield takeEvery(createThemeTypes.CREATE_THEME_REQUEST, createThemeRequest);
}
