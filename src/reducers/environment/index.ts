import { combineReducers } from 'redux-immutable';

import { reducer as createEnvironment } from './createEnvironment';
import { reducer as listEnvironment } from './listEnvironment';
import { reducer as getEnvironment } from './getEnvironment';
import { reducer as patchEnvironment } from './patchEnvironment';

export default combineReducers({
  createEnvironment,
  listEnvironment,
  getEnvironment,
  patchEnvironment
});
