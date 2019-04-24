import { takeEvery, call, put } from 'redux-saga/effects';

import deleteCompetenceActions, {
    deleteCompetenceTypes,
} from '../../reducers/competences/deleteCompetence';

import { deleteCompetence, wrapApiCall } from '../../requests';
import { DeleteCompetenceParams, WrappedResponse } from 'requests';

type Action = { payload: DeleteCompetenceParams; type: string };

function* deleteCompetenceRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<{}> = yield call(
      wrapApiCall,
      deleteCompetence,
      payload,
    );
    if (response.success) {
      yield put(deleteCompetenceActions.deleteCompetenceSuccess());
    } else {
      yield put(deleteCompetenceActions.deleteCompetenceFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(
    deleteCompetenceTypes.DELETE_COMPETENCE_REQUEST,
    deleteCompetenceRequest,
  );
}
