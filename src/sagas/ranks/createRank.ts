import { takeEvery, call, put } from 'redux-saga/effects';
import { Rank, WrappedResponse, CreateRankParams } from 'requests';

import createRankActions, {
  createRankTypes,
} from '../../reducers/familleRank/createRank';

import { createRank, wrapApiCall } from '../../requests';

type Action = { type: string; payload: CreateRankParams };

function* createRankRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<Rank[]> = yield call(
      wrapApiCall,
      createRank,
      payload,
    );
    if (response.success) {
      yield put(createRankActions.createRankSuccess());
    } else {
      yield put(createRankActions.createRankFailure(response.message));
    }
  } catch (e) {
    // do nothing for now
  }
}

export default function* () {
  yield takeEvery(
    createRankTypes.CREATE_RANK_REQUEST,
    createRankRequest,
  );
}
