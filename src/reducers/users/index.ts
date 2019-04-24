import { combineReducers } from 'redux-immutable';

import { reducer as getUser } from './getUser';
import { reducer as listUsers } from './listUsers';
import { reducer as deleteUser } from './deleteUsers';
export default combineReducers({
  getUser,
  listUsers,
  deleteUser,
});
