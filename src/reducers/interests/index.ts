import { combineReducers } from 'redux-immutable';

import { reducer as createInterest } from './createInterest';
import { reducer as listInterests } from './listInterests';
import { reducer as getInterest } from './getInterest';
import { reducer as patchInterest } from './patchInterest';
import { reducer as deleteInterest } from './deleteInterest';

export default combineReducers({
  createInterest,
  listInterests,
  getInterest,
  patchInterest,
  deleteInterest,
});
