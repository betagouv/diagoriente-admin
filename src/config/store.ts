import createHistory from 'history/createBrowserHistory';
import Immutable from 'immutable';
import _ from 'lodash';
import { applyMiddleware, createStore, Middleware } from 'redux';
import { createLogger, ReduxLoggerOptions } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware, { SagaIterator, SagaMiddleware } from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import persistConfig from './persistConfig';
import globalReducer from '../reducers/globalReducer';
import globalSaga from '../sagas/globalSaga';

/* ------------- App History ------------- */
export const history = createHistory();

/* ------------- Saga Middleware ------------- */
const sagaMiddleware: SagaMiddleware<SagaIterator> = createSagaMiddleware();

/* ------------- All Middleware ------------- */
const middlewares: Middleware[] = [sagaMiddleware, routerMiddleware(history)];

/* ------------- Logger Middleware ------------- */
if (process.env.NODE_ENV === 'development') {
  // since we have some immutable data in state
  // we have to switch them to mutable since
  // mutable data is more readable in the console
  const stateTransformer = (state: any) => {
    // put state type to any since typescript don't remove mutable states
    // even after test with isImmutable
    const newState: { [key: string]: any } = {};
    _.keys(state).forEach((key: string) => {
      newState[key] = Immutable.Iterable.isIterable(state[key])
        ? state[key].toJS()
        : state[key];
    });
    return newState;
  };

  const options: ReduxLoggerOptions = { stateTransformer };

  const logger = createLogger(options);
  middlewares.push(logger);
}

/* ------------- Persist Reducer ------------- */
const persistedReducer = persistReducer(persistConfig, globalReducer(history));

/* ------------- Redux Store ------------- */
const store = createStore(persistedReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(globalSaga);

export default store;

export const persistor = persistStore(store);
