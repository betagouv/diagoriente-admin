import { combineReducers } from 'redux-immutable';

import { reducer as createTheme } from './createTheme';
import { reducer as listThemes } from './listThemes';
import { reducer as getTheme } from './getTheme';
import { reducer as patchTheme } from './patchTheme';
import { reducer as deleteTheme } from './deleteTheme';

export default combineReducers({
  createTheme,
  listThemes,
  getTheme,
  patchTheme,
  deleteTheme,
});
