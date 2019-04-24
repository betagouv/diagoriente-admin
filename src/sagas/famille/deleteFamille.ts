import { takeEvery, call, put } from 'redux-saga/effects';

import deleteFamilleActions, {
  deleteFamilleTypes,
} from '../../reducers/famille/deleteFamille';

import { deleteFamille, wrapApiCall } from '../../requests';
import { DeleteFamilleParams, WrappedResponse } from 'requests';

type Action = { payload: DeleteFamilleParams; type: string };

function* deleteFamilleRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<{}> = yield call(
      wrapApiCall,
      deleteFamille,
      payload,
    );
    if (response.success) {
      yield put(deleteFamilleActions.deleteFamilleSuccess());
    } else {
      yield put(deleteFamilleActions.deleteFamilleFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(
    deleteFamilleTypes.DELETE_FAMILLE_REQUEST,
    deleteFamilleRequest,
  );
}
