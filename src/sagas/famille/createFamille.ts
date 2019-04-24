import { takeEvery, call, put } from 'redux-saga/effects';
import { Famille, WrappedResponse, CreateFamilleParams } from 'requests';

import createFamilleActions, {
  createFamilleTypes,
} from '../../reducers/famille/createFamille';

import { createFamille, wrapApiCall, uploadPhotos } from '../../requests';

type Action = { type: string; payload: CreateFamilleParams };

function* createFamilleRequest({ payload }: Action) {
  try {
    const { resources, ...other } = payload;
    const response: WrappedResponse<Famille> = yield call(
      wrapApiCall,
      createFamille,
      other,
    );

    if (response.success && response.data) {
      const formData = new FormData();

      if (resources) {
        resources.forEach((photos: File) => {

          formData.append('photos', photos);

        });

      }

      yield call(wrapApiCall, uploadPhotos, response.data._id, formData);
      yield put(createFamilleActions.createFamilleSuccess());
    }else {
      yield put(createFamilleActions.createFamilleFailure(response.message));
    }
  } catch (e) {
    // do nothing for now
  }
}

export default function* () {
  yield takeEvery(
    createFamilleTypes.CREATE_FAMILLE_REQUEST,
    createFamilleRequest,
  );
}
