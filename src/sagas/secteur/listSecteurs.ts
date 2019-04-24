import { takeEvery, call, put } from 'redux-saga/effects';
import {
  ListSecteursParams,
  WrappedResponse,
  ISecteur,
  ListSecteursResponse,
} from 'requests';
import { pickBy, identity } from 'lodash';

import listSecteursActions, {
  listSecteursTypes,
} from '../../reducers/secteur/listSecteurs';

import { listSecteurs, listWrapApiCall } from '../../requests';

type Action = { type: string; payload?: ListSecteursParams };

function* listSecteursRequest({ payload }: Action) {
  const params = pickBy(payload, identity);
  try {
    const response: WrappedResponse<ListSecteursResponse> = yield call(
      listWrapApiCall,
      listSecteurs,
      params,
    );
    if (response.success) {
      yield put(listSecteursActions.listSecteursSuccess(response.data));
    } else {
      yield put(listSecteursActions.listSecteursFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(listSecteursTypes.LIST_SECTEURS_REQUEST, listSecteursRequest);
}
