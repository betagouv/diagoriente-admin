import { combineReducers } from 'redux-immutable';

import { reducer as createRank } from './createRank';
import { reducer as listRanks } from './listRanks';

export default combineReducers({
  createRank,
  listRanks,
});
