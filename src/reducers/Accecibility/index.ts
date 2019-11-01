import { combineReducers } from 'redux-immutable';

import { reducer as createAccibility } from './createAccibility';
import { reducer as listAccibility } from './listAccibility.';
import { reducer as deleteAccibility } from './deleteAccibility';
import { reducer as getAccibility } from './getAccibility.';
import { reducer as patchAccibility } from './patchAccibility.';

export default combineReducers({
  createAccibility,
  listAccibility,
  deleteAccibility,
  getAccibility,
  patchAccibility,
});
