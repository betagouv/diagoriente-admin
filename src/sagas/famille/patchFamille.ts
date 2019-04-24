import { takeEvery, call, put , all } from 'redux-saga/effects';
import { Famille, PatchFamilleParams, WrappedResponse } from 'requests';

import patchFamillesActions, {
  patchFamilleTypes,
} from '../../reducers/famille/patchFamille';

import { patchFamille, wrapApiCall , uploadPhotos } from '../../requests';

type Action = { payload: PatchFamilleParams; type: string };

function* patchFamilleRequest({ payload }: Action) {
  const { resources, ...other } = payload;
  const response: WrappedResponse<Famille> = yield call(wrapApiCall, patchFamille, other);
  // const params = [call(wrapApiCall, patchFamille, other)];
  const formData = new FormData();
  if (resources) {
    resources.forEach((photos: File) => {
      formData.append('photos', photos);
    });

  }
  const id = payload.id;
  const update = yield call(wrapApiCall, uploadPhotos, id, formData);
  // const response: WrappedResponse<Famille> = yield all(params);

  if (response.success) {
    yield put(patchFamillesActions.patchFamilleSuccess(response.data, update.data));
  } else {
    yield put(patchFamillesActions.patchFamilleFailure(response.message));
  }
}

export default function* () {
  yield takeEvery(
    patchFamilleTypes.PATCH_FAMILLE_REQUEST,
    patchFamilleRequest,
  );
}
