import { combineReducers } from 'redux-immutable';

import { reducer as createActivity } from './createActivity';
import { reducer as listActivities } from './listActivities';
import { reducer as getActivity } from './getActivity';
import { reducer as patchActivity } from './patchActivity';
import { reducer as deleteActivity } from './deleteActivity';

export default combineReducers({
  createActivity,
  listActivities,
  getActivity,
  patchActivity,
  deleteActivity,
});
