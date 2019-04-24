import { takeEvery, call, put } from 'redux-saga/effects';
import { ICompetence, patchCompetenceParams, WrappedResponse } from 'requests';

import patchCompetenceActions, {
    PatchCompetenceTypes,
} from '../../reducers/competences/patchCompetence';

import { patchCompetence, wrapApiCall } from '../../requests';

type Action = { payload: patchCompetenceParams; type: string };

function* patchCompetenceRequest({ payload }: Action) {
  const response: WrappedResponse<ICompetence> = yield call(
    wrapApiCall,
    patchCompetence,
    payload,
  );
  if (response.success) {
    yield put(patchCompetenceActions.patchCompetenceSuccess(response.data));
  } else {
    yield put(patchCompetenceActions.patchCompetenceFailure(response.message));
  }
}

export default function* () {
  yield takeEvery(
    PatchCompetenceTypes.PATCH_COMPETENCE_REQUEST,
    patchCompetenceRequest,
  );
}
