import { takeEvery, call, put } from 'redux-saga/effects';
import { ListActivitiesParams, WrappedResponse, Activity , ListActivitiesResponse } from 'requests';
import { pickBy, identity } from 'lodash';

import listActivitiesActions, {
  listActivitiesTypes,
} from '../../reducers/activities/listActivities';

import { listActivities, listWrapApiCall } from '../../requests';

type Action = { type: string; payload?: ListActivitiesParams };

function* listActivitiesRequest({ payload }: Action) {
  const params = pickBy(payload, identity);
  try {
    const response: WrappedResponse<ListActivitiesResponse> = yield call(
      listWrapApiCall,
      listActivities,
      params,
    );
    if (response.success) {
      yield put(listActivitiesActions.listActivitiesSuccess(response.data));
    } else {
      yield put(listActivitiesActions.listActivitiesFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(
    listActivitiesTypes.LIST_ACTIVITIES_REQUEST,
    listActivitiesRequest,
  );
}
