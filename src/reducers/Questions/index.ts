import { combineReducers } from 'redux-immutable';

import { reducer as createQuestion } from './createQuestion';
import { reducer as listQuestion } from './listQuestion';
import { reducer as getQuestion } from './getQuestions';
import { reducer as deleteQuestion } from './deleteQuestion';
import { reducer as editQuestion } from './editQuestion';

export default combineReducers({
    createQuestion,
    listQuestion,
    getQuestion,
    deleteQuestion,
    editQuestion
});
