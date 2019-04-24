import { takeEvery, call, put } from 'redux-saga/effects';

import deleteAdvisorActions, {
    deleteAdvisorTypes,
} from '../../reducers/Advisor/deleteAdvisor';

import { deleteadvisor } from '../../requests';
import { DeleteAdvisorParams, WrappedResponse } from 'requests';

type Action = { payload: DeleteAdvisorParams; type: string };

function* deleteAdvisorRequest({ payload }: Action) {
  try {
    const response: WrappedResponse<{}> = yield call(deleteadvisor, payload);
    if (response.success) {
      yield put(deleteAdvisorActions.deleteAdvisorSuccess());
    } else {
      yield put(deleteAdvisorActions.deleteAdvisorFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(deleteAdvisorTypes.DELETE_ADVISOR_REQUEST, deleteAdvisorRequest);
}
