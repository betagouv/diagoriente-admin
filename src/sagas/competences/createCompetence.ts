import { takeEvery, call, put } from 'redux-saga/effects';
import { ICompetence, WrappedResponse, CreateComptenceParams } from 'requests';

import createCompetenceActions, {
  createCompetenceTypes,
} from '../../reducers/competences/createCompetence';

import { createCompetence, wrapApiCall } from '../../requests';

type Action = { type: string; payload: CreateComptenceParams };

function* createCompetenceRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<ICompetence[]> = yield call(
      wrapApiCall,
      createCompetence,
      payload,
    );
    if (response.success) {
      yield put(createCompetenceActions.createCompetenceSuccess());
    } else {
      yield put(createCompetenceActions.createCompetenceFailure(response.message));
    }
  } catch (e) {
    // do nothing for now
  }
}

export default function* () {
  yield takeEvery(
    createCompetenceTypes.CREATE_COMPETENCE_REQUEST,
    createCompetenceRequest,
  );
}
