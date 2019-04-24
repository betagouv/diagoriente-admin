import { takeEvery, call, put } from 'redux-saga/effects';

import ggetAdvisorActions, {
    getAdvisorTypes,
} from '../../reducers/Advisor/getAdvisor';
import { getadvisor, wrapApiCall } from '../../requests';
import { GetAdvisorParams, WrappedResponse, Iadvisor } from 'requests';

type Action = { type: string; payload: GetAdvisorParams };

function* getAdvisorRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<Iadvisor> = yield call(
      wrapApiCall,
      getadvisor,
      payload,
    );
    if (response.success) {
      yield put(ggetAdvisorActions.getAdvisorSuccess(response.data));
    } else {
      yield put(ggetAdvisorActions.getAdvisorFailure(response.message));
    }
  } catch (e) {
    //
  }
}

export default function* () {
  yield takeEvery(getAdvisorTypes.GET_ADVISOR_REQUEST, getAdvisorRequest);
}
