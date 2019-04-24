import { takeEvery, call, put } from 'redux-saga/effects';

import deleteSecteurActions, {
  deleteSecteurTypes,
} from '../../reducers/secteur/deleteSecteur';

import { deleteSecteur, wrapApiCall } from '../../requests';
import { DeleteSecteurParams, WrappedResponse } from 'requests';

type Action = { payload: DeleteSecteurParams; type: string };

function* deleteSecteurRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<{}> = yield call(
      wrapApiCall,
      deleteSecteur,
      payload,
    );
    if (response.success) {
      yield put(deleteSecteurActions.deleteSecteurSuccess());
    } else {
      yield put(deleteSecteurActions.deleteSecteurFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(
    deleteSecteurTypes.DELETE_SECTEUR_REQUEST,
    deleteSecteurRequest,
  );
}
