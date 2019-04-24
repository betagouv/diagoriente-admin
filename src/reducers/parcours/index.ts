import { combineReducers } from 'redux-immutable';

import { reducer as listParcours } from './ListParcours';
import { reducer as GetParcours } from './GetParcour';
import { reducer as deleteParcour } from './deleteParcour';

export default combineReducers({
  listParcours,
  GetParcours,
  deleteParcour,
});
