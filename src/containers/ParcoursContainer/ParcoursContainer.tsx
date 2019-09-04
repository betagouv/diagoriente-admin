import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { IParcour, listParcoursParams, getParcoursParams, getJobsParams, ListCompetencesParams, DeleteParcourParams, ICompetence } from 'requests';
import moment from 'moment';
import { isArray } from 'lodash';
import { getUser } from '../../requests';
import { Job } from 'requests';

import { ReduxState } from 'reducers';
import { RouteComponentProps } from 'react-router-dom';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

import listParcoursActions from '../../reducers/parcours/ListParcours';
import getParcoursActions from '../../reducers/parcours/GetParcour';
import getJobsActions from '../../reducers/job/GetJob';
import listCompetencesActions from '../../reducers/competences/listCompetences';
import deleteParcourActions from '../../reducers/parcours/deleteParcour';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Table from '../../component/Table/Tables';
import FullModal from '../../component/fullScreenModal/fullModal';
import CompetencesChart from '../../component/Chart';
import IconVerified from '../../component/Icons/IconVerified';
import IconNotVerified from '../../component/Icons/IconNotVerified';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import ConfirmModal from '../../component/ConfirmModal/ConfirmModal';
import Chartlabels from '../../component/Chart/chartLabels';

// utils
import { encodeUri, decodeUri } from '../../utils/url';
import format from '../../utils/formatChartData';
import formatOcc from '../../utils/competencesOcc';
import Collapse from '../../component/CollaplseList/collpase';
import Paper from '@material-ui/core/Paper';
import { Rowing, FullscreenExit } from '@material-ui/icons';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
import betagouvfr from '../../assets/images/png/betagouvfr.png';
import diagorientebeta from '../../assets/images/png/diagorientebeta.png';
import republiquecom from '../../assets/images/png/republiquecom.png';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import getRankAverage from '../../utils/getRankAverage';
import VueGlobale from '../VueGlobaleContainer';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { string } from 'prop-types';

const colors = [
  'rgba(255, 0, 0, 0.5)',
  'rgba(75,192,192, 0.5)',
  'rgba(255,215,0, 0.5)',
  'rgba(211,211,211, 0.5)',
  'rgba(0, 100, 255, 0.5)',
  'rgba(154, 99, 36, 0.5)',
  'rgba(145, 30, 180, 0.5)',
  'rgba(250, 190, 190, 0.5)',
  'rgba(128, 0, 0, 0.5)',
  'rgba(128, 128, 0, 0.5)',
];

const styles = () =>
  createStyles({
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fill: {
      height: '100%',
      width: '100%',
    },
    questionContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '92%',
    },
    absolute: {
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
    },
    RowContainer1: {
      height: '100%',
      width: '60%',
      overflow: 'scroll',
      overflowX: 'hidden',
    },
    RowContainer2: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '35%',
      margin: 0,
      height: '100%',
      padding: 25,
    },
    intersetContainer: {
      display: 'flex',
      overflow: 'hidden',
      flexWrap: 'wrap',
      margin: 10,
      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 10,
      paddingBottom: 10,
    },
    interestChip: {
      marginLeft: 4,
      marginRight: 4,
      marginTop: 4,
      marginBottom: 4,
    },
    modalContainer: {
      marginTop: 20,
    },
    noContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90%',
      flexDirection: 'column',
    },
    chartTitle: {
      fontFamily: "'Poppins', sans-serif",
    },
    errorIcon: {
      fontSize: 60,
      color: '#ff0000',
    },
    completeIcon: {
      paddingLeft: 25,
    },
    avatar: {
      backgroundColor: 'blue',
      color: 'white',
    },
    skiillContainer: {
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 30,
      marginTop: 5,
      boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
      borderRadius: 5,
    },
    interestTitle: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
    },
    jobContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '0 13px 0 3px',
    },
    RowContainer3: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '35%',
      margin: 0,
      height: '100%',
      padding: 25,
    },
    redRank: {
      backgroundColor: '#fbeef3',
      padding: '0px !important',
      marginRight: 30,
      display: 'flex',
      alignItems: 'center',
    },
    blueRank: {
      backgroundColor: '#EDEFF9',
      padding: '0px !important',
      marginRight: 30,
      display: 'flex',
      alignItems: 'center',
    },
    fav: {
      marginLeft: 25,
    },
  });

interface StyleProps extends WithStyles<typeof styles> {
  classes: {
    fill: string;
    questionContainer: string;
    center: string;
    absolute: string;
    RowContainer2: string;
    RowContainer1: string;
    intersetContainer: string;
    interestChip: string;
    modalContainer: string;
    noContent: string;
    errorIcon: string;
    completeIcon: string;
    chartTitle: string;
    avatar: string;
    skiillContainer: string;
    interestTitle: string;
    jobContainer: string;
    RowContainer3: string;
    redRank: string;
    blueRank: string;
    fav: string;
  };
}
export const PER_PAGE = 20;

interface MapToProps {
  fetching: boolean;
  parcours: IParcour[];
  parcour: IParcour;
  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
  getCompetenceFetching: boolean;
  competences: [];
  fetchingParcour: boolean;
  deleteFetching: boolean;
  deleteError: string;
  jobs: Job[];
  role: any;
  id: string;
}

interface DispatchToProps {
  getListParcours: (payload: listParcoursParams) => void;
  getParcours: (payload: getParcoursParams) => void;
  listCompetences: (payload: ListCompetencesParams) => void;
  deleteParcour: (payload: DeleteParcourParams) => void;
  getJobs: (payload: { parcourId: string; algoType: string }) => void;
}

interface State {
  currentSelectedId: string;
  openModal: boolean;
  openModalQuestion: boolean;
  currentJob: any;

  openConfirm: boolean;
  expanded: boolean | string;
  value: string;
  tabIndex: number;
  hideLayout: boolean;
}
interface questionJobs {
  _id: string;

  label: string;
  response: boolean;
}
type Props = MapToProps & DispatchToProps & RouteComponentProps & StyleProps;

const customRender = (row: string): string => row || '--';

class ParcoursContainer extends Component<Props, State> {
  state: State = {
    currentSelectedId: '',
    openModal: false,
    openModalQuestion: false,
    currentJob: {},
    openConfirm: false,
    expanded: '',
    hideLayout: false,
    tabIndex: 0,
    value: '',
  };

  headers = [
    {
      id: 'userEmail',
      title: 'Email',
      render: customRender,
    },
    {
      id: 'userName',
      title: 'Nom Prénom',
      render: customRender,
    },
    {
      id: 'advisorName',
      title: 'Conseiller',
      render: customRender,
    },

    {
      id: 'updatedAt',
      title: 'Date de creation',
      render: (row: string) => moment(row).format('DD/MM/YYYY, HH:mm:ss '),
    },
    {
      id: 'completed',
      title: 'Completed',
      render: (value: boolean) => {
        if (value) {
          return (
            <div className={this.props.classes.completeIcon}>
              <IconVerified />
            </div>
          );
        }
        return (
          <div className={this.props.classes.completeIcon}>
            <IconNotVerified />
          </div>
        );
      },
    },
  ];

  search: string = '';
  componentDidMount() {
    const { page } = decodeUri(this.props.location.search);
    this.getListCompetences();
    this.getListParcours({ page });
    // this.props.getParcours({ id: this.props.parcour._id });
  }

  componentDidUpdate(props: Props, prevState: any) {
    if (!this.props.deleteFetching && props.deleteFetching && !this.props.deleteError) {
      this.getListParcours();
    }
    if (this.state.hideLayout && !prevState.hideLayout) {
      setTimeout(this.handleClick, 450);
    }
    if (this.state.openModal !== prevState.openModal) {
      this.setState({ tabIndex: 0 });
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.parcour !== this.props.parcour) {
      this.setState({ openModal: true });
    }
  }
  getListParcours = (params: listParcoursParams = {}) => {
    this.props.getListParcours({
      search: this.search,
      page: this.props.currentPage,
      perPage: PER_PAGE,
      ...params,
    });
  };
  handleSearch = (value: string) => {
    this.search = value;
    this.getListParcours();
  };
  handlePageChange = (page: number) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: encodeUri({ page }),
    });
    this.getListParcours({
      page,
    });
  };
  resetParcours = () => {
    this.search = '';
    this.getListParcours();
  };
  closeTestModal = () => {
    this.props.history.push({
      pathname: '/parcours',
      search: this.props.location.search,
    });
    this.setState({ openModal: false });
  };
  openModalQuestions = (item: Job) => {
    this.setState({ openModalQuestion: true, currentJob: item });
  };
  closeModalQuestions = () => {
    this.setState({ openModalQuestion: false });
  };
  getListCompetences = (params: ListCompetencesParams = {}) => {
    this.props.listCompetences({
      search: this.search,
      page: this.props.currentPage,
      perPage: 10,
      ...params,
    });
  };
  showVisualisation = (id: string) => {
    this.props.getParcours({ id });
    this.props.getJobs({ parcourId: id, algoType: 'interest' });
    /*  this.props.history.push({
      pathname: `/parcours/${id}`,
      search: this.props.location.search,
    }); */
    this.setState({ currentSelectedId: id });
  };
  sortInterests = (a: any, b: any) => {
    return b.count - a.count;
  };
  openModalDelete = (id: string) => {
    this.setState({ openConfirm: true, currentSelectedId: id });
  };
  YesDelete = (id: string) => {
    this.props.deleteParcour({ id: this.state.currentSelectedId });
    this.setState({ openConfirm: false });
  };

  NoDelete = () => {
    this.setState({ openConfirm: false });
  };

  handleValue(value: any): any {
    if (typeof value !== 'object' || value === null) {
      return value;
    }
    if (isArray(value)) {
      return value.map((item) => this.handleValue(item));
    }
    return { ...this.deepObject(value) };
  }

  deepObject(obj: any) {
    let result: any = {};

    const keys = Object.keys(obj);

    keys.forEach((key) => {
      const value = this.handleValue(obj[key]);
      if (typeof value !== 'object' || value === null) {
        result[key] = value;
      } else {
        result = { ...result, ...this.deepObject(obj[key]) };
      }
    });
    return result;
  }

  handleLegend = () => {
    this.setState({ hideLayout: true });
  };

  handleClick = async () => {
    try {
      const id: any = this.props.parcour.userId;

      const response = await getUser({ id });

      let firstName = 'Inconnu';
      let lastName = '';

      if (response.code === 200 && response.data) {
        firstName = response.data.profile.firstName;
        lastName = response.data.profile.lastName;
      }
      const lastNode = document.getElementsByTagName('canvas').length - 1;
      const node = document.getElementsByTagName('canvas');
      const test = node[lastNode].toDataURL();

      firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
      const competences = this.props.competences.map((el: ICompetence) => el.title);
      const doc = new jsPDF('p', 'pt', '', true as any);
      const width = doc.internal.pageSize.getWidth();
      const height = doc.internal.pageSize.getHeight();
      const Fullname = firstName.concat(' ', lastName);
      doc.addImage(diagorientebeta, 'PNG', 20, 20, 150, 50, '', 'FAST');
      const betaimg = document.createElement('img');
      betaimg.setAttribute('src', betagouvfr);
      doc.addImage(betaimg, 'PNG', 220, 8, 180, 100, '', 'FAST');
      doc.addImage(republiquecom, 'PNG', 450, 10, 75, 120, '', 'FAST');
      doc.setFontStyle('bold');
      doc.text(`Carte de competénces de ${Fullname}`, 140, 165, '', 'FAST');
      doc.setFillColor(240, 240, 240);
      // doc.roundedRect(10, 200, 455, 380, 2, 2, 'F');
      doc.addImage(test, 'PNG', 110, 210, 265, 345, '', 'FAST');
      doc.setFontStyle('normal');
      doc.setFontSize(10);
      doc.setFillColor(255, 255, 255);
      doc.rect(120, 180, 250, 50, 'F');
      doc.setFillColor(255, 255, 255);
      doc.rect(100, 520, 300, 150, 'F');

      const radius = 180;
      const numNodes = 10;
      const w = radius * 2 + 50;

      for (let i = 2; i < numNodes + 2; i++) {
        const angle = (i / (numNodes / 2)) * Math.PI;
        let x = (radius + 5) * Math.cos(angle) + w / 2;
        let y = (radius - 2) * Math.sin(angle) + w / 2;
        x = (x.toFixed(1) as any) - 0;
        y = (y.toFixed(1) as any) - 0;

        const rgba = colors[(i + 2) % numNodes]
          .split('(')[1]
          .split(')')[0]
          .split(',')
          .map((el) => (el.trim() as any) - 0);
        const alpha = 1 - rgba[3];
        const rgb = [];
        rgb.push(Math.round((rgba[3] * (rgba[0] / 255) + alpha * 0.5) * 255));
        rgb.push(Math.round((rgba[3] * (rgba[1] / 255) + alpha * 0.5) * 255));
        rgb.push(Math.round((rgba[3] * (rgba[2] / 255) + alpha * 0.5) * 255));

        doc.setTextColor(...rgb);
        doc.text(competences[(i + 2) % numNodes], x + 5, y + 180, {
          maxWidth: '75',
        });
      }

      doc.setTextColor('#fefefe' as any);
      doc.setFontSize(11.5);

      const etapes = ['je débute', 'je le fais de temps en temps', 'je le fais souvent', 'je le fais tout le temps'];
      for (let i = 0; i < 4; i++) {
        doc.setFillColor('#4472c4');
        const recty = 220 + i * 90;
        doc.roundedRect(width - 110, recty, 80, 58, 2, 2, 'F');
        doc.text(i + 1 + '', width - 75, recty + 12);
        doc.text(etapes.shift(), width - 70, recty + 12 + 15, {
          align: 'center',
          maxWidth: '70',
        });
      }
      const parcoursPerso = this.props.parcour.skills.filter((el: any) => el.theme.type === 'personal').map((al: any) => al.theme.title);

      const parcoursPro = this.props.parcour.skills.filter((el: any) => el.theme.type === 'professional').map((al: any) => al.theme.title);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFillColor(240, 240, 240);

      doc.roundedRect(12, 610, 260, parcoursPerso.length * 28 + 88, 2, 2, 'F');
      doc.roundedRect(302, 610, 260, parcoursPerso.length * 28 + 88, 2, 2, 'F');

      // doc.setTextColor(68, 58, 219);
      doc.setTextColor(170, 51, 255);
      doc.text('Mes expériences personnelles', 35, 650);
      doc.text('Mes expériences profesionnelles', 335, 650);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      for (let i = 0; i < parcoursPerso.length; i++) {
        doc.text(parcoursPerso[i], 35, 30 * i + 690);
      }
      for (let i = 0; i < parcoursPro.length; i++) {
        doc.text(parcoursPro[i], 335, 30 * i + 690);
      }

      doc.save('Carte de compétences.pdf');
      this.setState({ hideLayout: false });
    } catch {
      (error: any) => {
        console.error('oops, something went wrong!', error);
      };
    }
  };

  handleTabChange = (e: any, tabIndex: number) => {
    this.setState({ tabIndex });
  };

  handleChange = (panel: string | boolean) => (event: React.ChangeEvent<{}>, expanded: boolean) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleChangeJobs = (e: any) => {
    this.setState({ value: e.target.value }, () =>
      this.props.getJobs({
        parcourId: this.state.currentSelectedId,
        algoType: this.state.value,
      }),
    );
  };
  renderModalContent = (question: questionJobs) => {
    if (question) {
      /*       return questions.map((question: any, index: number) => <span style={{ backgroundColor: 'red' }}>azertyui</span>);
       */

      return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: '10px 0px' }}>
          <span style={{ width: '75%' }}>{question.label}</span>
          <img
            src={question.response ? require('../../assets/images/check.svg') : require('../../assets/images/no-stopping.svg')}
            style={{
              width: 20,
              paddingTop: 4,
              marginRight: 5,

              alignSelf: 'center',
            }}
          />
        </div>
      );
    }
    return;
  };
  render(): JSX.Element {
    const parcours = this.props.parcours.map((parcour) => {
      const advisorId = parcour.advisorId;
      const userId = parcour.userId;
      let advisorName = '';
      let userName = '';
      let userEmail = '';
      if (advisorId && advisorId.profile) {
        const profile: any = advisorId.profile;
        advisorName = Object.keys(profile)
          .filter((key) => key !== 'pseudo' && profile[key])
          .map((key) => profile[key])
          .join(' ');
      }

      if (userId && userId.profile) {
        const profile: any = userId.profile;
        userName = Object.keys(profile)
          .filter((key) => (key === 'firstName' || key === 'lastName') && profile[key])
          .map((key) => profile[key])
          .join(' ');
        if (userId.email) {
          userEmail = userId.email;
        } else {
          if (userId.profile.email) {
            userEmail = userId.profile.email;
          }
        }
      }

      return { ...parcour, advisorName, userName, userEmail };
    });

    return (
      <>
        {this.props.fetching && this.props.getCompetenceFetching && (
          <div className={`${this.props.classes.absolute} ${this.props.classes.center}`}>
            <CircularProgress />
          </div>
        )}
        <Table
          headers={this.headers}
          rows={parcours}
          hasEdit={false}
          hasAdd={false}
          search={this.handleSearch}
          reset={this.resetParcours}
          rowsPerPage={this.props.perPage}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          count={this.props.count}
          handlePageChange={this.handlePageChange}
          typeSearch={false}
          typeButton={false}
          hasDelete={this.props.role === 'admin' ? true : false}
          hasVisualization
          showVisualisation={this.showVisualisation}
          delete={this.openModalDelete}
        />

        <FullModal
          open={this.state.openModal}
          handleClose={this.closeTestModal}
          fullScreen
          title="Parcours"
          hasDownload
          pdfDownload={this.handleLegend}
          hasTabs
          handleChange={this.handleTabChange}
          tabIndex={this.state.tabIndex}
          tabLabel1={'liste des pistes'}
          tabLabel2={'vue global'}
        >
          {!this.state.tabIndex ? (
            <Grid
              container
              justify="space-between"
              className={`${this.props.classes.center} & ${this.props.classes.fill} & ${this.props.classes.modalContainer}`}
            >
              <div className={this.props.classes.RowContainer1}>
                {this.props.parcour.skills && this.props.parcour.skills.length === 0 ? (
                  <div className={this.props.classes.noContent}>
                    <ErrorOutline className={this.props.classes.errorIcon} />
                    <h4>Ce parcour ne contient aucune donnée </h4>
                  </div>
                ) : (
                  this.props.parcour.skills &&
                  this.props.parcour.skills.map((skill: any, id: number) => {
                    return (
                      <div className={this.props.classes.skiillContainer} key={id}>
                        <Collapse avitivities={skill.activities} theme={skill.theme.title} type={skill.type} />
                        <div
                          style={{
                            position: 'relative',
                            width: '25vw',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                          }}
                        >
                          <CompetencesChart competences={this.props.competences} parcours={skill.competences} displayLegend={false} />
                        </div>
                        <div className={this.props.classes.intersetContainer}>
                          {format(this.props.competences, skill.competences).map((item: any, index: number) => {
                            return <Chartlabels label={item.title} number={item.value} backgroundColor={item.color} key={index} />;
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div className={this.props.classes.RowContainer3} id="global-competence">
                {/*  <div>
                <h3 className={this.props.classes.chartTitle}>
                  Carte de compétences Globale
                </h3>
              </div>

                <CompetencesChart
                  competences={this.props.competences}
                  parcours={this.props.parcour.globalCopmetences}
                  displayLegend={true}
                /> */}
                <div
                  style={{
                    margin: 25,
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <FormControl style={{ width: '90%' }}>
                    <InputLabel htmlFor="job-tri">Pistes</InputLabel>
                    <Select
                      value={this.state.value}
                      onChange={this.handleChangeJobs}
                      inputProps={{
                        name: 'jobs',
                        id: 'job-tri',
                      }}
                      // style={{ width: 200 }}
                    >
                      <MenuItem value={'interest'}>Les pistes issues de l'expérience</MenuItem>
                      <MenuItem value={'family'}>Les pistes issues des intérêts</MenuItem>
                      <MenuItem value={'interest_family'}>Le mix entre les expériences et les intérêts</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <Grid container spacing={16}>
                  {this.props.jobs.length ? (
                    this.props.jobs.map((item, index) => {
                      return (
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                          <ExpansionPanel
                            expanded={this.state.expanded === `panel${index}`}
                            onChange={this.handleChange(`panel${index}`)}
                            style={{ width: '92%', margin: ' 5px 0px' }}
                          >
                            <ExpansionPanelSummary
                              classes={{
                                content: this.props.classes.jobContainer,
                              }}
                              expandIcon={<ExpandMoreIcon />}
                            >
                              <Typography className={!item.interested ? this.props.classes.fav : ''}>
                                {item.interested && (
                                  <img
                                    src={require('../../assets/images/png/favourites.png')}
                                    style={{
                                      width: 20,
                                      paddingTop: 4,
                                      marginRight: 5,
                                    }}
                                  />
                                )}

                                {item.title}
                              </Typography>

                              <Typography
                                className={item.jobRank < getRankAverage(this.props.jobs) ? this.props.classes.redRank : this.props.classes.blueRank}
                              >
                                {item.jobRank.toFixed(3)}
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>{item.description}</Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                          <img
                            src={
                              item.questionJobs.length > 0
                                ? require('../../assets/images/conversation.svg')
                                : require('../../assets/images/conversationGrise.svg')
                            }
                            style={{
                              width: 20,
                              paddingTop: 4,
                              marginRight: 5,
                              cursor: item.questionJobs.length > 0 ? 'pointer' : 'not-allowed',
                            }}
                            onClick={() => {
                              item.questionJobs.length > 0 ? this.openModalQuestions(item) : null;
                            }}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div className={this.props.classes.noContent} style={{ height: '50vh', width: '100%' }}>
                      <ErrorOutline className={this.props.classes.errorIcon} />
                      <h4> aucune donnée disponible </h4>
                    </div>
                  )}
                </Grid>
              </div>
            </Grid>
          ) : (
            <VueGlobale hideLayout={this.state.hideLayout} />
          )}
        </FullModal>

        {this.state.openModalQuestion && (
          <FullModal open={this.state.openModalQuestion} handleClose={this.closeModalQuestions} title={this.state.currentJob.title} maxWidth={'sm'}>
            <div
              className={this.props.classes.fill}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div className={this.props.classes.questionContainer}>
                {this.state.currentJob.questionJobs.map((question: questionJobs, index: number) => {
                  return <Paper style={{ margin: '5px 0px' }}>{this.renderModalContent(question)}</Paper>;
                })}
              </div>
            </div>
          </FullModal>
        )}
        <ConfirmModal open={this.state.openConfirm} YesButton={this.YesDelete} NoButton={this.NoDelete} close={this.NoDelete} />
      </>
    );
  }
}

function mapStateToProps(state: ReduxState): MapToProps {
  const listParcours = state.parcours.get('listParcours');
  const getParcour = state.parcours.get('GetParcours');
  const listCompetences = state.competences.get('listCompetences');
  const deleteParcour = state.parcours.get('deleteParcour');
  const listJobs = state.job.get('jobs');

  return {
    fetching: listParcours.get('fetching'),
    parcours: listParcours.get('parcours').data,
    parcour: getParcour.get('parcours'),
    fetchingParcour: getParcour.get('fetching'),
    count: listParcours.get('parcours').count,
    currentPage: listParcours.get('parcours').currentPage,
    perPage: listParcours.get('parcours').perPage,
    totalPages: listParcours.get('parcours').totalPages,
    getCompetenceFetching: listCompetences.get('fetching'),
    competences: listCompetences.get('competences'),
    deleteError: deleteParcour.get('error'),
    deleteFetching: deleteParcour.get('fetching'),
    jobs: listJobs,
    role: state.login.get('role'),
    id: state.login.get('_id'),
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): DispatchToProps {
  return {
    getListParcours: (payload) => dispatch(listParcoursActions.listParcoursRequest(payload)),
    getParcours: (payload) => dispatch(getParcoursActions.getParcoursRequest(payload)),
    getJobs: (payload) => dispatch(getJobsActions.getJobsRequest(payload)),
    listCompetences: (payload) => dispatch(listCompetencesActions.listCompetencesRequest(payload)),
    deleteParcour: (payload) => dispatch(deleteParcourActions.deleteParcourRequest(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ParcoursContainer));
