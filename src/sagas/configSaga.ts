import { AnyAction } from 'redux';
import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';

import { configTypes } from '../reducers/configReducer';

function* LangSaga(action: AnyAction): SagaIterator {
  // gonna send Language to commun here after
}

export default function* () {
  yield takeEvery(configTypes.LANGUAGE_CHANGE, LangSaga);
}
