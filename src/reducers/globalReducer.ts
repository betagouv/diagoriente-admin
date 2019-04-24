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
import users from './users';
import competences from './competences';
import parcours from './parcours';
import advisor from './Advisor';
import secteur from './secteur';
import famille from './famille';
import { reducer as job } from './job/GetJob';

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
    famille,
    job,
    router: connectRouter(history),
  });
