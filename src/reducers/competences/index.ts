import { combineReducers } from 'redux-immutable';

import { reducer as createCompetence } from './createCompetence';
import { reducer as listCompetences } from './listCompetences';
import { reducer as getCompetence } from './getCompetence';
import { reducer as patchCompetence } from './patchCompetence';
import { reducer as deleteCompetence } from './deleteCompetence';

export default combineReducers({
  createCompetence,
  listCompetences,
  getCompetence,
  patchCompetence,
  deleteCompetence,
});
