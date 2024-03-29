import Assessement from '@material-ui/icons/AssessmentOutlined';
import SupervisorAccount from '@material-ui/icons/PeopleOutline';
import Assignment from '@material-ui/icons/BubbleChartOutlined';
import TrackChanges from '@material-ui/icons/TrackChanges';
import DashBoard from '@material-ui/icons/DashboardOutlined';
import Runner from '@material-ui/icons/DirectionsRun';
import Advisor from '@material-ui/icons/SupervisorAccountOutlined';
import ViewCompact from '@material-ui/icons/ViewCompactOutlined';
import LineStyle from '@material-ui/icons/LineStyleOutlined';
import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import BusinessCenter from '@material-ui/icons/BusinessCenterOutlined';
import Layers from '@material-ui/icons/LayersOutlined';
import question_answer from '@material-ui/icons/FeedbackOutlined';


const menu = [
  {
    nom: 'Thèmes',
    url: '/themes',
    icon: DashBoard,
    id: 0,
  },
  {
    nom: 'Activité',
    url: '/activities',
    icon: Assessement,
    id: 1,
  },
  {
    nom: 'Utilisateurs',
    url: '/users',
    icon: SupervisorAccount,
    id: 2,
  },
  {
    nom: 'Intérêts',
    url: '/interests',
    icon: TrackChanges,
    id: 3,
  },
  {
    nom: 'Compétences',
    url: '/competences',
    icon: Assignment,
    id: 4,
  },
  {
    nom: 'Parcours',
    url: '/parcours',
    icon: Runner,
    id: 5,
  },
  {
    nom: 'Conseiller',
    url: '/advisor',
    icon: Advisor,
    id: 6,
  },
  {
    nom: 'Secteur',
    url: '/secteur',
    icon: ViewCompact,
    id: 7,
  },
  {
    nom: 'Famille Intérêts',
    url: '/famille',
    icon: LineStyle,
    id: 8,
  },
  {
    nom: 'Piste des métiers',
    url: '/jobs',
    icon: BusinessCenter,
    id: 9,
  },
  {
    nom: 'Questions',
    url: '/questions',
    icon: question_answer,
    id: 10,
  },
  {
    nom: 'Rang Famille',
    url: '/familleRank',
    icon: Layers,
    id: 11,
  },
];

export const menuAdvisor = [
  {
    nom: 'Parcours',
    url: '/parcours',
    icon: Runner,
    id: 0,
  },
  {
    nom: 'Mon Compte',
    url: '/advisor',
    icon: AccountCircle,
    id: 1,
  },
];

export default menu;
