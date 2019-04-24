import { takeEvery, call, put } from 'redux-saga/effects';
import { Iadvisor, WrappedResponse, CreateAdvisorParams } from 'requests';

import createAdvisorActions, {
    createAdvisorTypes,
} from '../../reducers/Advisor/createAdvisor';

import { createadvisor, wrapApiCall } from '../../requests';

type Action = { type: string; payload: CreateAdvisorParams };

function* createAdvisorRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<Iadvisor> = yield call(
      wrapApiCall,
      createadvisor,
      payload,
    );
    if (response.success) {
      yield put(createAdvisorActions.createAdvisorSuccess());
    } else {
      yield put(createAdvisorActions.createAdvisorFailure(response.message));
    }
  } catch (e) {
    // do nothing for now
  }
}

export default function* () {
  yield takeEvery(
    createAdvisorTypes.CREATE_ADVISOR_REQUEST,
    createAdvisorRequest,
  );
}
