import { takeEvery, call, put } from 'redux-saga/effects';

import getFamilleActions, {
  getFamilleTypes,
} from '../../reducers/famille/getFamille';
import { getFamille, wrapApiCall } from '../../requests';
import { GetFamilleParams, WrappedResponse, Famille } from 'requests';

type Action = { type: string; payload: GetFamilleParams };

function* getFamilleRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<Famille> = yield call(
      wrapApiCall,
      getFamille,
      payload,
    );
    if (response.success) {
      yield put(getFamilleActions.getFamilleSuccess(response.data));
    } else {
      yield put(getFamilleActions.getFamilleFailure(response.message));
    }
  } catch (e) {
    //
  }
}

export default function* () {
  yield takeEvery(getFamilleTypes.GET_FAMILLE_REQUEST, getFamilleRequest);
}
