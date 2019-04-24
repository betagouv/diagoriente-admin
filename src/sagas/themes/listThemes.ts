import { takeEvery, call, put } from 'redux-saga/effects';
import { pickBy, identity } from 'lodash';
import {
  ListThemesParams,
  WrappedResponse,
  Theme,
  ListThemesResponse,
} from 'requests';

import listThemesActions, {
  listThemesTypes,
} from '../../reducers/themes/listThemes';

import { listThemes, listWrapApiCall } from '../../requests';

type Action = { type: string; payload?: ListThemesParams };

function* listThemesRequest({ payload }: Action) {
  const params = pickBy(payload, identity);
  try {
    const response: WrappedResponse<ListThemesResponse> = yield call(
      listWrapApiCall,
      listThemes,
      params,
    );
    if (response.success) {
      yield put(listThemesActions.listThemesSuccess(response.data));
    } else {
      yield put(listThemesActions.listThemesFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(listThemesTypes.LIST_THEMES_REQUEST, listThemesRequest);
}
