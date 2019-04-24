import { takeEvery, call, put } from 'redux-saga/effects';
import {
  ListCompetencesParams,
  WrappedResponse,
  ListCompetencesResponse,
} from 'requests';
import { pickBy, identity } from 'lodash';

import listCompetencesActions, {
  listCompetencesTypes,
} from '../../reducers/competences/listCompetences';

import { listCompetences, listWrapApiCall } from '../../requests';

type Action = { type: string; payload?: ListCompetencesParams };

function* listCompetencesRequest({ payload }: Action) {
  const params = pickBy(payload, identity);

  try {
    const response: WrappedResponse<ListCompetencesResponse> = yield call(
      listWrapApiCall,
      listCompetences,
      params,
    );
    if (response.success) {
      yield put(listCompetencesActions.listCompetencesSuccess(response.data));
    } else {
      yield put(
        listCompetencesActions.listCompetencesFailure(response.message),
      );
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(
    listCompetencesTypes.LIST_COMPETENCES_REQUEST,
    listCompetencesRequest,
  );
}
