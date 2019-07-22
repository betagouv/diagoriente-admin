import { all, fork } from 'redux-saga/effects';

import configSaga from './configSaga';
import { loginSaga } from './profile/loginSaga';
import { logoutSaga } from './profile/logoutSaga';
import { startUp } from './startUp';
/* themes */
import crateThemesSaga from './themes/createThemes';
import listThemesSaga from './themes/listThemes';
import getThemeSaga from './themes/getTheme';
import patchThemeSaga from './themes/patchTheme';
import deleteThemeSaga from './themes/deleteTheme';
/* activities */
import crateActivitySaga from './activities/createActivity';
import listActivitiesSaga from './activities/listActivities';
import getActivitySaga from './activities/getActivity';
import patchActivitySaga from './activities/patchActivity';
import deleteActivitySaga from './activities/deleteActivity';
/* interests */
import createInterestSaga from './interests/createInterest';
import listInterest from './interests/listInterests';
import getInterest from './interests/getInterest';
import patchInterest from './interests/patchInterest';
import deleteInterest from './interests/deleteInterest';
import listUsers from './users/listUsers';
import deleteUser from './users/deleteUser';
import getUser from './users/getUser';
/* Competences */
import createCompetence from './competences/createCompetence';
import deleteCompetence from './competences/deleteCompetence';
import patchCompetence from './competences/patchCompetence';
import listCompetences from './competences/listCompetences';
import getCompetence from './competences/getCompetence';
/* Parcours */
import listParcours from './parcours/listParcours';
import getParcour from './parcours/getParcour';
import deleteParcour from './parcours/deleteParcour';
/* Advisor */
import createAdvisor from './advisor/createAdvisor';
import deleteAdvisor from './advisor/deleteAdvisor';
import patchAdvisor from './advisor/patchAdvisor';
import getAdvisor from './advisor/getAdvisor';
import listAdvisors from './advisor/listAdvisors';
/* Secteur */
import createSecteur from './secteur/createSecteur';
import deleteSecteur from './secteur/deleteSecteur';
import patchSecteur from './secteur/patchSecteur';
import getSecteur from './secteur/getSecteur';
import listSecteurs from './secteur/listSecteurs';

import createFamille from './famille/createFamille';
import deleteFamille from './famille/deleteFamille';
import patchFamille from './famille/patchFamille';
import getFamille from './famille/getFamille';
import listFamilles from './famille/listFamille';

import { loginSagaAdvisor } from './profileAdvisor/loginSaga';
import { logoutSagaAdvisor } from './profileAdvisor/logoutSaga';
/* job */
import getJob from './job/getJob';
/* Question */
import createQuestion from './questions/createQuestion';
import deleteQuestion from './questions/deleteQuestion';
import editQuestion from './questions/editQuestions';
import getQuestion from './questions/getQuestion';
import listQuestions from './questions/listQuestions';

import listContext from './context/listContext';
import getContext from './context/getContext';
import patchContext from './context/patchContext';
import createContext from './context/createContext';

const sagas = [
  configSaga,
  loginSaga,
  logoutSaga,
  crateThemesSaga,
  listThemesSaga,
  getThemeSaga,
  patchThemeSaga,
  deleteThemeSaga,
  crateActivitySaga,
  listActivitiesSaga,
  getActivitySaga,
  patchActivitySaga,
  deleteActivitySaga,
  createInterestSaga,
  listInterest,
  getInterest,
  patchInterest,
  deleteInterest,
  startUp,
  listUsers,
  deleteUser,
  getUser,
  createCompetence,
  deleteCompetence,
  patchCompetence,
  listCompetences,
  getCompetence,
  listParcours,
  getParcour,
  deleteParcour,
  createAdvisor,
  deleteAdvisor,
  patchAdvisor,
  getAdvisor,
  listAdvisors,
  createSecteur,
  deleteSecteur,
  patchSecteur,
  getSecteur,
  listSecteurs,
  createFamille,
  deleteFamille,
  patchFamille,
  getFamille,
  listFamilles,
  loginSagaAdvisor,
  logoutSagaAdvisor,
  getJob,
  createQuestion,
  deleteQuestion,
  editQuestion,
  getQuestion,
  listQuestions,
  listContext,
  getContext,
  patchContext,
  createContext,
];

export default function* () {
  yield all(sagas.map(saga => fork(saga)));
}
