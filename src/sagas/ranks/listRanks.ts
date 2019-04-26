import { takeEvery, call, put } from 'redux-saga/effects';
import {
  ListRanksParams,
  WrappedResponse,
  Rank,
  ListRanksResponse,
} from 'requests';
import { pickBy, identity } from 'lodash';

import listRanksActions, {
  listRanksTypes,
} from '../../reducers/familleRank/listRanks';

import { listRanks, listWrapApiCall } from '../../requests';

type Action = { type: string; payload?: {} };

function* listRanksRequest() {
  // const params = pickBy(payload, identity);
  try {
    const response: any = yield call(
      listRanks,
    );
    if (response.success) {
      yield put(listRanksActions.listRanksSuccess(response.data));
    } else {
      yield put(listRanksActions.listRanksFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(
    listRanksTypes.LIST_RANKS_REQUEST,
    listRanksRequest,
  );
}
