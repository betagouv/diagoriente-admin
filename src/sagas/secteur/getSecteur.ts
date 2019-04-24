import { takeEvery, call, put } from 'redux-saga/effects';

import getSecteurActions, {
  getSecteurTypes,
} from '../../reducers/secteur/getSecteur';
import { getSecteur, wrapApiCall } from '../../requests';
import { GetSecteurParams, WrappedResponse, ISecteur } from 'requests';

type Action = { type: string; payload: GetSecteurParams };

function* getSecteurRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<ISecteur> = yield call(
      wrapApiCall,
      getSecteur,
      payload,
    );
    if (response.success) {
      yield put(getSecteurActions.getSecteurSuccess(response.data));
    } else {
      yield put(getSecteurActions.getSecteurFailure(response.message));
    }
  } catch (e) {
    //
  }
}

export default function* () {
  yield takeEvery(getSecteurTypes.GET_SECTEUR_REQUEST, getSecteurRequest);
}
