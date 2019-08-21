import { combineReducers } from 'redux-immutable';

import { reducer as createQuestionJob } from './createQuestionJob';
import { reducer as listQuestionJob } from './listQuestionJob';
import { reducer as deleteQuestionJob } from './deleteQuestionJob';
import { reducer as getQuestionJob } from './getQuestionJob';
import { reducer as patchQuestionJob } from './patchQuestionJob';

export default combineReducers({
  createQuestionJob,
  listQuestionJob,
  deleteQuestionJob,
  getQuestionJob,
  patchQuestionJob
});
