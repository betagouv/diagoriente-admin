import { takeEvery, call, put } from 'redux-saga/effects';
import {
  ListQuestionsParams,
  WrappedResponse,
  Question,
  ListQuestionResponse,
} from 'requests';
import { pickBy, identity } from 'lodash';

import listQuestionsActions, {
  listQuestionsTypes,
} from '../../reducers/Questions/listQuestion';

import { listQuestions, listWrapApiCall } from '../../requests';

type Action = { type: string; payload?: ListQuestionsParams };

function* listQuestionsRequest({ payload }: Action) {
  const params = pickBy(payload, identity);
  try {
    const response: WrappedResponse<ListQuestionResponse> = yield call(
      listWrapApiCall,
      listQuestions,
      params,
    );
    if (response.success) {
      yield put(listQuestionsActions.listQuestionsSuccess(response.data));
    } else {
      yield put(listQuestionsActions.listQuestionsFailure(response.message));
    }
  } catch (e) {}
}

export default function* () {
  yield takeEvery(
    listQuestionsTypes.LIST_QUESTIONS_REQUEST,
    listQuestionsRequest,
  );
}
