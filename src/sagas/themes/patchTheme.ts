import { takeEvery, call, put, all } from 'redux-saga/effects';
import { Theme, PatchThemeParams, WrappedResponse } from 'requests';

import patchThemeActions, {
  patchThemeTypes,
} from '../../reducers/themes/patchTheme';

import { patchTheme, wrapApiCall, updateFileData } from '../../requests';

type Action = { payload: PatchThemeParams; type: string };

function* patchThemeRequest({ payload }: Action) {
  const { icon, resources, ...other } = payload;
  console.log(other);
  const params = [call(wrapApiCall, patchTheme, other)];
  if (icon || resources.backgroundColor) {
    const formData = new FormData();
    if (icon) {
      formData.append('icon', icon);
    }
    if (resources.backgroundColor) {
      formData.append('backgroundColor', resources.backgroundColor);
    }
    const id = payload.id;
    params.push(call(wrapApiCall, updateFileData, id, formData));
  }
  const response: WrappedResponse<Theme>[] = yield all(params);

  if (response[0].success && response[1] && response[1].success) {
    yield put(patchThemeActions.patchThemeSuccess(response[0].data));
  } else {
    yield put(patchThemeActions.patchThemeFailure(response[0].message));
  }
}

export default function* () {
  yield takeEvery(patchThemeTypes.PATCH_THEME_REQUEST, patchThemeRequest);
}
