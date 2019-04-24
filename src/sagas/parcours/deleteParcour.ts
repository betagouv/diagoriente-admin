import { takeEvery, call, put } from 'redux-saga/effects';

import deleteParcourActions, {
  deleteParcourTypes,
} from '../../reducers/parcours/deleteParcour';

import { deleteParcour } from '../../requests';
import { DeleteParcourParams, WrappedResponse } from 'requests';

type Action = { payload: DeleteParcourParams; type: string };

function* deleteParcourRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<{}> = yield call(deleteParcour, payload);
    if (response.success) {
      yield put(deleteParcourActions.deleteParcourSuccess());
    } else {
      yield put(deleteParcourActions.deleteParcourFailure(response.message));
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* () {
  yield takeEvery(
    deleteParcourTypes.DELETE_PARCOUR_REQUEST, deleteParcourRequest);
}
