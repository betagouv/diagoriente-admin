import { takeEvery, call, put, all } from 'redux-saga/effects';
import { ISecteur, PatchSecteurParams, WrappedResponse } from 'requests';

import patchSecteursActions, {
  patchSecteurTypes,
} from '../../reducers/secteur/patchSecteur';

import { patchSecteur, wrapApiCall, updateFile } from '../../requests';

type Action = { payload: PatchSecteurParams; type: string };

function* patchSecteurRequest({ payload }: Action) {
  const { icon, resources, ...other } = payload;

  const params = [call(wrapApiCall, patchSecteur, other)];
  if (icon || resources.backgroundColor) {
    const formData = new FormData();
    if (icon) {
      formData.append('icon', icon);
    }
    if (resources.backgroundColor) {
      formData.append('backgroundColor', resources.backgroundColor);
    }
    const id = payload.id;
    params.push(call(wrapApiCall, updateFile, id, formData));
  }
  const response: WrappedResponse<ISecteur>[] = yield all(params);
  if (response[0].success && response[1] && response[1].success) {
    yield put(patchSecteursActions.patchSecteurSuccess(response[0].data));
  } else {
    yield put(patchSecteursActions.patchSecteurFailure(response[0].message));
  }
}

export default function* () {
  yield takeEvery(
    patchSecteurTypes.PATCH_SECTEUR_REQUEST,
    patchSecteurRequest,
  );
}
