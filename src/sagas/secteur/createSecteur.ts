import { takeEvery, call, put } from 'redux-saga/effects';
import { ISecteur, WrappedResponse, CreateSecteurParams } from 'requests';

import createSecteurActions, {
  createSecteurTypes,
} from '../../reducers/secteur/createSecteur';

import { createSecteur, wrapApiCall, updateFile } from '../../requests';

type Action = { type: string; payload: CreateSecteurParams };

function* createSecteurRequest({ payload }: Action) {

  try {
    const { icon, resources, ...other } = payload;
    const response: WrappedResponse<any> = yield call(
      wrapApiCall,
      createSecteur,
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
      yield call(wrapApiCall, updateFile, response.data._id, formData);

      yield put(createSecteurActions.createSecteurSuccess());
    } else {
      yield put(createSecteurActions.createSecteurFailure(response.message));
    }
  } catch (e) {
    // do nothing for now
  }
}

export default function* () {
  yield takeEvery(
    createSecteurTypes.CREATE_SECTEUR_REQUEST,
    createSecteurRequest,
  );
}
