import { combineReducers } from 'redux-immutable';

import { reducer as createSecteur } from './createSecteur';
import { reducer as listSecteurs } from './listSecteurs';
import { reducer as getSecteur } from './getSecteur';
import { reducer as patchSecteur } from './patchSecteur';
import { reducer as deleteSecteur } from './deleteSecteur';

export default combineReducers({
  createSecteur,
  listSecteurs,
  getSecteur,
  patchSecteur,
  deleteSecteur,
});
