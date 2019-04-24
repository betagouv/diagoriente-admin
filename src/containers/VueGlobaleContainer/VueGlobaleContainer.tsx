import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import {
  IParcour,
  listParcoursParams,
  getParcoursParams,
  ListCompetencesParams,
  DeleteParcourParams,
  ICompetence,
} from 'requests';
import moment from 'moment';
import { isArray } from 'lodash';
import { getUser } from '../../requests';
import { IUser, GetUserParams, Response } from 'requests';

import { ReduxState } from 'reducers';
import { RouteComponentProps } from 'react-router-dom';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

import listParcoursActions from '../../reducers/parcours/ListParcours';
import getParcoursActions from '../../reducers/parcours/GetParcour';
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
import { Rowing } from '@material-ui/icons';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
import betagouvfr from '../../assets/images/png/betagouvfr.png';
import diagorientebeta from '../../assets/images/png/diagorientebeta.png';
import republiquecom from '../../assets/images/png/republiquecom.png';
import { Typography } from '@material-ui/core';

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
      boxShadow:
        '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
      borderRadius: 5,
    },
    interestTitle: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
    },
  });

interface StyleProps extends WithStyles<typeof styles> {
  classes: {
    fill: string;
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

  role: any;
  id: string;
}

interface DispatchToProps {
  getListParcours: (payload: listParcoursParams) => void;
  getParcours: (payload: getParcoursParams) => void;
  listCompetences: (payload: ListCompetencesParams) => void;
  deleteParcour: (payload: DeleteParcourParams) => void;
}

interface State {
  currentSelectedId: string;
  openModal: boolean;
  search: string;
  openConfirm: boolean;
  domImage: any;
  firstName: string;
  lastName: string;
}

type Props = MapToProps & DispatchToProps & StyleProps & any;

const customRender = (row: string): string => row || '--';

class VueGlobale extends Component<Props> {
  static defaultProps = {
    hideLayout: false,
  };

  state = {
    currentSelectedId: '',
    openModal: false,
    openConfirm: false,
    domImage: null,
    firstName: '',
    lastName: '',
  };

  search: string = '';
  componentDidMount() {
    this.getListParcours();
    // this.getListCompetences();
    // this.props.getParcours({ id: this.props.parcour._id });
  }

  componentDidUpdate(props: Props) {
    // this.getListCompetences();
    if (
      !this.props.deleteFetching &&
      props.deleteFetching &&
      !this.props.deleteError
    ) {
      this.getListParcours();
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
  }
  handleSearch = (value: string) => {
    this.search = value;
    this.getListParcours();
  }

  resetParcours = () => {
    this.search = '';
    this.getListParcours();
  }

  getListCompetences = (params: ListCompetencesParams = {}) => {
    this.props.listCompetences({
      search: this.search,
      page: this.props.currentPage,
      perPage: 10,
      ...params,
    });
  }
  showVisualisation = (id: string) => {
    this.props.getParcours({ id });
    /*  this.props.history.push({
      pathname: `/parcours/${id}`,
      search: this.props.location.search,
    }); */
  }
  sortInterests = (a: any, b: any) => {
    return b.count - a.count;
  }
  openModalDelete = (id: string) => {
    this.setState({ openConfirm: true, currentSelectedId: id });
  }
  YesDelete = (id: string) => {
    this.props.deleteParcour({ id: this.state.currentSelectedId });
    this.setState({ openConfirm: false });
  }

  NoDelete = () => {
    this.setState({ openConfirm: false });
  }

  handleValue(value: any): any {
    if (typeof value !== 'object' || value === null) {
      return value;
    }
    if (isArray(value)) {
      return value.map(item => this.handleValue(item));
    }
    return { ...this.deepObject(value) };
  }

  deepObject(obj: any) {
    let result: any = {};

    const keys = Object.keys(obj);

    keys.forEach(key => {
      const value = this.handleValue(obj[key]);
      if (typeof value !== 'object' || value === null) {
        result[key] = value;
      } else {
        result = { ...result, ...this.deepObject(obj[key]) };
      }
    });
    return result;
  }

  render(): JSX.Element {
    // console.log(this.props.parcour.families.map((el: any) => el.interests));
    return (
      <>
        {this.props.fetching && this.props.getCompetenceFetching && (
          <div
            className={`${this.props.classes.absolute} ${
              this.props.classes.center
            }`}
          >
            <CircularProgress />
          </div>
        )}

        <Grid
          container
          justify="space-between"
          className={`${this.props.classes.center} & ${
            this.props.classes.fill
          } & ${this.props.classes.modalContainer}`}
        >
          <div className={this.props.classes.RowContainer1}>
            {this.props.parcour.globalInterest &&
            this.props.parcour.globalInterest.length > 0 ? (
              <Paper className={this.props.classes.intersetContainer}>
                <div className={this.props.classes.interestTitle}>
                  <h4>Interrets Globaux</h4>
                </div>
                {this.props.parcour.globalInterest &&
                  this.props.parcour.globalInterest
                    .sort(this.sortInterests)
                    .map((global: any, index: any) => {
                      return (
                        <Chip
                          key={index}
                          avatar={
                            <Avatar style={{ color: 'white' }}>
                              {global.count}
                            </Avatar>
                          }
                          label={global.title}
                          className={this.props.classes.interestChip}
                          variant="outlined"
                        />
                      );
                    })}
              </Paper>
            ) : null}
            <Paper className={this.props.classes.intersetContainer}>
              {this.props.parcour.families.map((item: any, index: any) => {
                return (
                  <div
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      display: 'flex',
                      flex: '1 1 auto',
                    }}
                  >
                    <Typography style={{ fontSize: 18 , fontWeight: 'bold' }}> {item.nom} </Typography>
                    <div>
                      {item.interests.map((el: any, index: any) => {
                        return (
                          <Chip
                            key={index}
                            label={el.nom}
                            className={this.props.classes.interestChip}
                            variant="outlined"
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </Paper>

            {this.props.parcour.globalInterest &&
            this.props.parcour.globalInterest.length > 0 ? (
              <Paper className={this.props.classes.intersetContainer}>
                <div className={this.props.classes.interestTitle}>
                  <h4>Competences Globales</h4>
                </div>
                {this.props.parcour.globalInterest &&
                  formatOcc(
                    this.props.competences,
                    this.props.parcour.skills,
                  ).map((item: any, index: any) => {
                    return (
                      <Chartlabels
                        key={index}
                        label={item.title}
                        number={item.value}
                        backgroundColor={item.color}
                      />
                    );
                  })}
              </Paper>
            ) : null}
          </div>
          <div
            className={this.props.classes.RowContainer2}
            id="global-competence"
          >
            <div>
              <h3 className={this.props.classes.chartTitle}>
                Carte de compétences Globales
              </h3>
            </div>

            <CompetencesChart
              competences={this.props.competences}
              parcours={this.props.parcour.globalCopmetences}
              displayLegend={!this.props.hideLayout}
            />
          </div>
        </Grid>
      </>
    );
  }
}

function mapStateToProps(state: ReduxState): MapToProps {
  const listParcours = state.parcours.get('listParcours');
  const getParcour = state.parcours.get('GetParcours');
  const listCompetences = state.competences.get('listCompetences');
  const deleteParcour = state.parcours.get('deleteParcour');

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

    role: state.login.get('role'),
    id: state.login.get('_id'),
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): DispatchToProps {
  return {
    getListParcours: payload =>
      dispatch(listParcoursActions.listParcoursRequest(payload)),
    getParcours: payload =>
      dispatch(getParcoursActions.getParcoursRequest(payload)),
    listCompetences: payload =>
      dispatch(listCompetencesActions.listCompetencesRequest(payload)),
    deleteParcour: payload =>
      dispatch(deleteParcourActions.deleteParcourRequest(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(VueGlobale));
