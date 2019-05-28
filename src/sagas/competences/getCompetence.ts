import { takeEvery, call, put } from 'redux-saga/effects';

import getCompetenceActions, {
    getCompetenceTypes,
} from '../../reducers/competences/getCompetence';
import { GetCompetence, wrapApiCall } from '../../requests';
import { GetCompetenceParams, WrappedResponse, ICompetence } from 'requests';

type Action = { type: string; payload: GetCompetenceParams };

function* getCompetenceRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<ICompetence> = yield call(
      wrapApiCall,
      GetCompetence,
      payload,
    );
    if (response.success) {
      yield put(getCompetenceActions.getCompetenceSuccess(response.data));
    } else {
      yield put(getCompetenceActions.getCompetenceFailure(response.message));
    }
  } catch (e) {
    //
  }
}

export default function* () {
  yield takeEvery(getCompetenceTypes.GET_COMPETENCE_REQUEST, getCompetenceRequest);
}
