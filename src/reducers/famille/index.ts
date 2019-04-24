import { combineReducers } from 'redux-immutable';

import { reducer as createFamille } from './createFamille';
import { reducer as listFamilles } from './listFamille';
import { reducer as getFamille } from './getFamille';
import { reducer as patchFamille } from './patchFamille';
import { reducer as deleteFamille } from './deleteFamille';

export default combineReducers({
  createFamille,
  listFamilles,
  getFamille,
  patchFamille,
  deleteFamille,
});
