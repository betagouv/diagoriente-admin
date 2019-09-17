import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

// app reducers and types here
import { reducer as config } from './configReducer';
import { reducer as login } from './login';
import { reducer as loginAdvisor } from './loginAdvisor';

import themes from './themes';
import { reducer as startUp } from './startUp';
import activities from './activities';
import interests from './interests';
import questions from './Questions';

import users from './users';
import competences from './competences';
import parcours from './parcours';
import advisor from './Advisor';
import secteur from './secteur';
import famille from './famille';
import { reducer as job } from './job/GetJob';
import ranks from './familleRank';
import Context from './context';
import Environment from './environment';
import QuestionJob from './questionJob';
import groupe from './group'

// redux reducers
export default (history: any) =>
  combineReducers({
    config,
    login,
    loginAdvisor,
    themes,
    parcours,
    activities,
    interests,
    startUp,
    users,
    competences,
    advisor,
    secteur,
    questions,
    famille,
    job,
    ranks,
    Context,
    Environment,
    QuestionJob,
    groupe,
    router: connectRouter(history)
  });
