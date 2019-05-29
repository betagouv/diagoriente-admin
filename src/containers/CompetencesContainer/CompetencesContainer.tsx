import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import CompetencesChart from '../../component/Chart';
import {
  ICompetence,
  CreateComptenceParams,
  DeleteCompetenceParams,
  GetCompetenceParams,
  ListCompetencesParams,
  patchCompetenceParams,
  EditComptenceParams,
} from 'requests';
import { ReduxState } from 'reducers';
import { RouteComponentProps, matchPath } from 'react-router-dom';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Location } from 'history';

// components
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '../../component/Table/Tables';
import CompetenceForm from '../../component/Forms/competencesForm';
import FullModal from '../../component/fullScreenModal/fullModal';
import ConfirmModal from '../../component/ConfirmModal/ConfirmModal';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

// actions
import listCompetencesActions from '../../reducers/competences/listCompetences';
import deleteCompetenceActions from '../../reducers/competences/deleteCompetence';
import getCompetenceActions from '../../reducers/competences/getCompetence';
import patchCompetenceActions from '../../reducers/competences/patchCompetence';
import createCompetenceActions from '../../reducers/competences/createCompetence';

// utils
import { encodeUri, decodeUri } from '../../utils/url';
import { Button } from '@material-ui/core';
import Collapse from '../../component/CollaplseList/collpase';
import {isEmpty} from  'lodash'

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
    leftModalContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      flex: '1 1 50%',
      paddingLeft: 15,
    },
  });

interface StyleProps extends WithStyles<typeof styles> {
  classes: {
    fill: string;
    center: string;
    absolute: string;
    RowContainer1: string;
    RowContainer2: string;
    leftModalContainer: string;
  };
}

interface MapToProps {
  fetching: boolean;
  competences: ICompetence[];
  deleteFetching: boolean;
  deleteError: string;
  getCompetenceFetching: boolean;
  competence: ICompetence;
  getCompetenceError: string;
  editCompetenceFetching: boolean;
  editCompetenceError: string;
  createCompetenceFetching: boolean;
  createCompetenceError: string;
  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
}

interface DispatchToProps {
  getListCompetences: (payload: ListCompetencesParams) => void;
  deleteCompetence: (payload: DeleteCompetenceParams) => void;
  getCompetence: (payload: GetCompetenceParams) => void;
  editCompetence: (payload: patchCompetenceParams) => void;
  createCompetence: (payload: CreateComptenceParams) => void;
}

type Props = MapToProps & DispatchToProps & RouteComponentProps & StyleProps;

interface State {
  open: boolean;
  openConfirm: boolean;
  currentSelectedId: string;
}
export const PER_PAGE = 5;

class CompetencesContainer extends Component<Props, State> {
  state: State = {
    open: false,
    openConfirm: false,
    currentSelectedId: '',
  };

  headers = [
    {
      id: 'rank',
      title: 'Rang',
    },
    { id: 'title', title: 'Titre' },
  ];

  search: string = '';

  componentDidMount() {
    const { page } = decodeUri(this.props.location.search);
    this.getListCompetences();
  }

  componentDidUpdate(props: Props) {
    if (
      !this.props.deleteFetching &&
      props.deleteFetching &&
      !this.props.deleteError
    ) {
      this.getListCompetences();
    }
    const edit = this.isEdit(this.props.location);
    if (edit && !this.isEdit(props.location)) {
      this.props.getCompetence({ id: (edit.params as any).id });
    }

    if (
      !this.props.editCompetenceFetching &&
      props.editCompetenceFetching &&
      !this.props.editCompetenceError
    ) {
      this.getListCompetences();
      this.props.history.push({
        pathname: '/competences',
        search: this.props.location.search,
      });
    }

    if (
      !this.props.createCompetenceFetching &&
      props.createCompetenceFetching &&
      !this.props.createCompetenceFetching
    ) {
      this.search = '';
      this.getListCompetences({ page: 0 });
      this.setState({ open: false });
    }
  }
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  }
  isEdit = (location: Location<any>) =>
    matchPath(location.pathname, {
      path: '/competences/:id',
      exact: true,
    })
  openCreateModal = () => {
    this.setState({ open: true });
  }

  closeCreateModal = () => {
    this.setState({ open: false });
  }

  openEditModal = (id: string) => {
    this.props.history.push({
      pathname: `/competences/${id}`,
      search: this.props.location.search,
    });
  }

  closeEditModal = () => {
    this.props.history.push({
      pathname: '/competences',
      search: this.props.location.search,
    });
  }

  delete = (id: string) => {
    this.props.deleteCompetence({ id });
  }

  edit = (params: EditComptenceParams) => {
    const id = this.props.competence._id;
    this.props.editCompetence({ id, ...params });
  }

  create = (params: CreateComptenceParams) => {
    this.props.createCompetence(params);
  }

  openModalDelete = (id: string) => {
    this.setState({ openConfirm: true, currentSelectedId: id });
  }

  YesDelete = (id: string) => {
    this.props.deleteCompetence({ id: this.state.currentSelectedId });
    this.setState({ openConfirm: false });
  }

  NoDelete = () => {
    this.setState({ openConfirm: false });
  }

  handlePageChange = (page: number) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: encodeUri({ page }),
    });
    this.getListCompetences({
      page,
    });
  }

  handleSearch = (value: string) => {
    this.search = value;
    this.getListCompetences();
  }

  resetInterests = () => {
    this.search = '';
    this.getListCompetences();
  }

  getListCompetences = (params: ListCompetencesParams = {}) => {
    this.props.getListCompetences({
      ...params,
    });
  }

  renderModalContent = () => {
    if (this.props.getCompetenceFetching) {
      return <CircularProgress />;
    }
   
    return (
      <CompetenceForm
        n1={
          !isEmpty(this.props.competence.niveau)
            ? this.props.competence.niveau[0].title
            : ''
        }
        n2={
          !isEmpty(this.props.competence.niveau)
            ? this.props.competence.niveau[1].title
            : ''
        }
        n3={
          !isEmpty(this.props.competence.niveau)
            ? this.props.competence.niveau[2].title
            : ''
        }
        n4={
          !isEmpty(this.props.competence.niveau)
            ? this.props.competence.niveau[3].title
            : ''
        }
        n1desc={
          this.props.competence.niveau &&
          this.props.competence.niveau[0].sub_title
        }
        n2desc={
          this.props.competence.niveau &&
          this.props.competence.niveau[0].sub_title
        }
        n3desc={
          this.props.competence.niveau &&
          this.props.competence.niveau[0].sub_title
        }
        n4desc={
          this.props.competence.niveau &&
          this.props.competence.niveau[0].sub_title
        }
        onSubmitHandler={this.edit}
        requestClose={() => {}}
        submitText="Modifier Competence"
      />
    );
  }

  render() {
    
    return (
      <>
        {this.props.fetching && (
          <div
            className={`${this.props.classes.absolute} ${
              this.props.classes.center
            }`}>
            <CircularProgress />
          </div>
        )}

        <Table
          headers={this.headers}
          rows={this.props.competences}
          delete={this.openModalDelete}
          edit={this.openEditModal}
          add={this.openCreateModal}
          rowsPerPage={this.props.perPage}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          count={this.props.count}
          handlePageChange={this.handlePageChange}
          reset={this.resetInterests}
          search={this.handleSearch}
          typeFilter={false}
          hasPagination={false}
          hasEdit={true}
          hasDelete={false}
          hasAdd={false}
        />

        <FullModal
          open={!!this.isEdit(this.props.location)}
          handleClose={this.closeEditModal}
          title="Modifier Compétence"
          fullScreen>
          <div className={this.props.classes.center}>
            {this.renderModalContent()}
          </div>
        </FullModal>

        <ConfirmModal
          open={this.state.openConfirm}
          YesButton={this.YesDelete}
          NoButton={this.NoDelete}
          close={this.NoDelete}
        />
      </>
    );
  }
}

function mapStateToProps(state: ReduxState): MapToProps {
  const listCompetences = state.competences.get('listCompetences');
  const deleteCompetence = state.competences.get('deleteCompetence');
  const getCompetence = state.competences.get('getCompetence');
  const editCompetence = state.competences.get('patchCompetence');
  const createCompetence = state.competences.get('createCompetence');

  return {
    fetching: listCompetences.get('fetching'),
    competences: listCompetences.get('competences'),
    deleteFetching: deleteCompetence.get('fetching'),
    deleteError: deleteCompetence.get('error'),
    getCompetenceFetching: getCompetence.get('fetching'),
    competence: getCompetence.get('competence'),
    getCompetenceError: getCompetence.get('error'),
    editCompetenceFetching: editCompetence.get('fetching'),
    editCompetenceError: editCompetence.get('error'),
    createCompetenceFetching: createCompetence.get('fetching'),
    createCompetenceError: createCompetence.get('error'),
    count: listCompetences.get('competences').count,
    currentPage: listCompetences.get('competences').currentPage,
    perPage: listCompetences.get('competences').perPage,
    totalPages: listCompetences.get('competences').totalPages,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): DispatchToProps {
  return {
    getListCompetences: (payload) =>
      dispatch(listCompetencesActions.listCompetencesRequest(payload)),
    deleteCompetence: (payload) =>
      dispatch(deleteCompetenceActions.deleteCompetenceRequest(payload)),
    getCompetence: (payload) =>
      dispatch(getCompetenceActions.getCompetenceRequest(payload)),
    editCompetence: (payload) =>
      dispatch(patchCompetenceActions.patchCompetenceRequest(payload)),
    createCompetence: (payload) =>
      dispatch(createCompetenceActions.createCompetenceRequest(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CompetencesContainer));
