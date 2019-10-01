import Immutable from 'immutable';
import { PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// is this object already Immutable?
const isImmutable = (raw: any) => Immutable.isImmutable(raw);

// change this Immutable object into a JS object
const convertToJs = (state: any) => state.toJS();

// optionally convert this object into a JS object if it is Immutable
const fromImmutable = (raw: any) => {
  if (isImmutable(raw)) {
    return convertToJs(raw);
  }
  return raw;
};

// convert this JS object into an Immutable object
const toImmutable = (raw: any) => Immutable.fromJS(raw);

// the transform interface that redux-persist is expecting

const immutablePersistenceTransform = {
  in: (raw: any) => {
    return fromImmutable(raw);
  },
  out: (state: any) => {
    return toImmutable(state);
  },
};

const REDUX_PERSIST: PersistConfig = {
  key: 'root',
  storage,
  transforms: [immutablePersistenceTransform],
  whitelist: ['config', 'login'],
};

export default REDUX_PERSIST;
