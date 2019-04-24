import { combineReducers } from 'redux-immutable';

import { reducer as createAdvisor } from './createAdvisor';
import { reducer as getAdvisor } from './getAdvisor';
import { reducer as deleteAdvisor } from './deleteAdvisor';
import { reducer as patchAdvisor } from './patchAdvisor';
import { reducer as listAdvisors } from './listAdvisors';

export default combineReducers({
  createAdvisor,
  getAdvisor,
  deleteAdvisor,
  patchAdvisor,
  listAdvisors,
});
