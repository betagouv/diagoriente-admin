import { combineReducers } from 'redux-immutable';

import { reducer as createContext } from './createContext';
import { reducer as listContext } from './listContext';
import { reducer as getContext } from './getContext';
import { reducer as patchContext } from './patchContext';

export default combineReducers({
  createContext,
  listContext,
  getContext,
  patchContext,
});
