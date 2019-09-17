import { combineReducers } from 'redux-immutable';

import { reducer as getGroup } from './getGroup';
import { reducer as listGroup } from './listGroup';
import { reducer as patchGroup } from './patchGroup';
import { reducer as createGroup } from './createGroup';
export default combineReducers({
    getGroup,
    listGroup,
    patchGroup,
    createGroup,
});