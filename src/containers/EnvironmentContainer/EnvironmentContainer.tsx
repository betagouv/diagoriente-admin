import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import {
  IEnvironment,
  CreateEnvironmentParams,
  GetEnvironmentParams,
  ListEnvironmentsParams,
  DeleteEnvironmentParams,
  PatchEnvironmentparams,
  ListEnvironmentResponse,
  Response
} from 'requests';
import { ReduxState } from 'reducers';
import { RouteComponentProps, matchPath } from 'react-router-dom';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Location } from 'history';
import Grid from '@material-ui/core/Grid';

// components
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '../../component/Table/Tables';

// actions
import listEnvironmentActions from '../../reducers/environment/listEnvironment';
import deleteEnvironmentActions from '../../reducers/environment/deleteEnvironment';
import getEnvironmentActions from '../../reducers/environment/getEnvironment';
import editEnvironmentActions from '../../reducers/environment/patchEnvironment';
import createEnvironmentActions from '../../reducers/environment/createEnvironment';
import ConfirmModal from '../../component/ConfirmModal/ConfirmModal';
import FullModal from '../../component/fullScreenModal/fullModal';

// utils
import { encodeUri, decodeUri } from '../../utils/url';
import classNames from '../../utils/classNames';
import ContecxtForm from '../../component/Forms/EnvironmentForm';
import { listEnvironment } from '../../requests';

const styles = () =>
  createStyles({
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    fill: {
      height: '100%',
      width: '100%'
    },
    absolute: {
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0
    },
    RowContainer: {
      width: '100%',
      height: '70%'
    },
    modalItem: {
      flex: '1 1 50%',
      alignItems: 'stretch'
    },
    modalLeft: {
      paddingRight: 15
    },
    modalRight: {
      paddingLeft: 15
    },
    modalContainer: {
      height: '90%',
      margin: 'auto',
      maxHeight: '100%'
    }
  });

interface StyleProps extends WithStyles<typeof styles> {
  classes: {
    fill: string;
    center: string;
    absolute: string;
    RowContainer: string;
    modalItem: string;
    modalLeft: string;
    modalRight: string;
    modalContainer: string;
  };
}

interface MapToProps {
  fetching: boolean;
  environments: IEnvironment[];
  deleteFetching: boolean;
  deleteError: string;
  getEnvironmentFetching: boolean;
  Environment: IEnvironment;
  getEnvironmentError: string;
  editEnvironmentFetching: boolean;
  editEnvironmentError: string;
  createEnvironmentFetching: boolean;
  createEnvironmentError: string;
  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
}

interface DispatchToProps {
  getListEnvironment: (payload: ListEnvironmentsParams) => void;
  deleteEnvironment: (payload: DeleteEnvironmentParams) => void;
  getEnvironment: (payload: GetEnvironmentParams) => void;
  editEnvironment: (payload: PatchEnvironmentparams) => void;
  createEnvironment: (payload: CreateEnvironmentParams) => void;
}

export const PER_PAGE = 5;

type Props = MapToProps & DispatchToProps & RouteComponentProps & StyleProps;

interface State {
  open: boolean;
  openConfirm: boolean;
  currentSelectedId: string;
}

class EnvironmentContainer extends Component<Props, State> {
  state: State = {
    open: false,
    openConfirm: false,
    currentSelectedId: ''
  };

  headers = [
    {
      id: 'title',
      title: 'Titre'
    }
  ];

  search: string = '';
  type: string = '';

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    const { page } = decodeUri(this.props.location.search);
    this.getListEnvironment();
    const edit = this.isEdit(this.props.location);
    if (edit) {
      this.props.getEnvironment({ id: (edit.params as any).id });
    }
  }

  componentDidUpdate(props: Props) {
    if (
      !this.props.deleteFetching &&
      props.deleteFetching &&
      !this.props.deleteError
    ) {
      this.getListEnvironment();
    }

    const edit = this.isEdit(this.props.location);
    if (!this.isEdit(props.location) && edit) {
      this.props.getEnvironment({ id: (edit.params as any).id });
    }

    if (
      !this.props.editEnvironmentFetching &&
      props.editEnvironmentFetching &&
      !this.props.editEnvironmentError
    ) {
      this.getListEnvironment();
      this.props.history.push({
        pathname: '/environment',
        search: this.props.location.search
      });
    }

    if (
      !this.props.createEnvironmentFetching &&
      props.createEnvironmentFetching &&
      !this.props.createEnvironmentError
    ) {
      this.search = '';
      this.getListEnvironment({ page: 1 });
      this.setState({ open: false });
    }
  }

  isEdit = (location: Location<any>) =>
    matchPath(location.pathname, {
      path: '/environment/:id',
      exact: true
    });
  openCreateModal = () => {
    this.setState({ open: true });
  };

  closeCreateModal = () => {
    this.setState({ open: false });
  };

  openEditModal = (id: string) => {
    this.props.history.push({
      pathname: `/environment/${id}`,
      search: this.props.location.search
    });
  };

  closeEditModal = () => {
    this.props.history.push({
      pathname: '/environment',
      search: this.props.location.search
    });
  };

  openModalDelete = (id: string) => {
    this.setState({ openConfirm: true, currentSelectedId: id });
  };
  YesDelete = (id: string) => {
    this.props.deleteEnvironment({ id: this.state.currentSelectedId });
    this.setState({ openConfirm: false });
  };
  NoDelete = () => {
    this.setState({ openConfirm: false });
  };

  edit = (params: CreateEnvironmentParams) => {
    const id = this.props.Environment._id;
    this.props.editEnvironment({ id, ...params });
  };

  create = (params: CreateEnvironmentParams) => {
    this.props.createEnvironment(params);
  };

  onChangeType = (type: string) => {
    this.type = type;
    this.getListEnvironment();
  };

  handleSearch = (value: string) => {
    this.search = value;
    this.getListEnvironment();
  };

  reset = () => {
    this.type = '';
    this.search = '';
    this.getListEnvironment({ page: 1 });
  };

  handlePageChange = (page: number) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: encodeUri({ page })
    });
    this.getListEnvironment({
      page
    });
  };

  getListEnvironment = (params: ListEnvironmentsParams = {}) => {
    this.props.getListEnvironment({
      perPage: PER_PAGE,
      page: this.props.currentPage,
      search: this.search,
      ...params
    });
  };

  renderModalContent = () => {
    if (this.props.getEnvironmentFetching) {
      return (
        <div
          className={classNames(
            this.props.classes.fill,
            this.props.classes.center
          )}
        >
          <CircularProgress />
        </div>
      );
    }

    const isEdit = this.isEdit(this.props.location);
    const props = isEdit ? this.props.Environment : {};
    return (
      <Grid
        container
        spacing={16}
        className={`${this.props.classes.RowContainer}`}
        justify="space-between"
      >
        <div
          className={classNames(
            this.props.classes.modalItem,
            this.props.classes.modalLeft
          )}
        >
          <ContecxtForm
            header={isEdit ? 'Modifier Environnement' : 'Créer Environnement'}
            submitText={
              isEdit ? 'Modifier Environnement' : 'Créer Environnement'
            }
            onSubmitHandler={!isEdit ? this.create : this.edit}
            requestClose={isEdit ? this.closeEditModal : this.closeCreateModal}
            title={isEdit ? this.props.Environment.title : ''}
            {...props}
          />
        </div>
      </Grid>
    );
  };
  /*  clickme = async () => {
    const response: Response<ListEnvironmentResponse> = await listEnvironment();
    console.log(response)
  } */

  render() {
    return (
      <>
        {this.props.fetching && (
          <div
            className={`${this.props.classes.absolute} ${this.props.classes.center}`}
          >
            <CircularProgress />
          </div>
        )}

        <Table
          headers={this.headers}
          rows={this.props.environments}
          delete={this.openModalDelete}
          edit={this.openEditModal}
          add={this.openCreateModal}
          /* onChangeType={this.onChangeType} */
          search={this.handleSearch}
          reset={this.reset}
          typeFilter={false}
          rowsPerPage={this.props.perPage}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          count={this.props.count}
          handlePageChange={this.handlePageChange}
          hasDelete={true}
        />

        {/* <div>
          <button onClick={this.clickme}>click me</button>
        </div> */}
        <FullModal
          open={!!this.isEdit(this.props.location)}
          handleClose={this.closeEditModal}
          title="Modifier Environnement"
          maxWidth={'md'}
          modalStyle={this.props.classes.modalContainer}
        >
          <div
            className={this.props.classes.fill && this.props.classes.absolute}
          >
            {this.renderModalContent()}
          </div>
        </FullModal>

        <FullModal
          open={this.state.open}
          handleClose={this.handleClose}
          title="Créer Environnement"
          maxWidth={'md'}
          modalStyle={this.props.classes.modalContainer}
        >
          <Grid
            container
            spacing={16}
            className={this.props.classes.RowContainer}
            justify="space-between"
          >
            {this.renderModalContent()}
          </Grid>
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
  const getEnvironment = state.Environment.get('getEnvironment');
  const deleteEnvironment = state.Environment.get('deleteEnvironment');
  const editEnvironment = state.Environment.get('patchEnvironment');
  const createEnvironment = state.Environment.get('createEnvironment');
  const listEnvironment = state.Environment.get('listEnvironment');

  return {
    fetching: listEnvironment.get('fetching'),
    environments: listEnvironment.get('environments').data,
    deleteFetching: deleteEnvironment.get('fetching'),
    deleteError: deleteEnvironment.get('error'),
    getEnvironmentFetching: getEnvironment.get('fetching'),
    Environment: getEnvironment.get('environment'),
    getEnvironmentError: getEnvironment.get('error'),
    editEnvironmentFetching: editEnvironment.get('fetching'),
    editEnvironmentError: editEnvironment.get('error'),
    createEnvironmentFetching: createEnvironment.get('fetching'),
    createEnvironmentError: createEnvironment.get('error'),
    count: listEnvironment.get('environments').count,
    currentPage: listEnvironment.get('environments').currentPage,
    perPage: listEnvironment.get('environments').perPage,
    totalPages: listEnvironment.get('environments').totalPages
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): DispatchToProps {
  return {
    getListEnvironment: payload =>
      dispatch(listEnvironmentActions.listEnvironmentRequest(payload)),
    deleteEnvironment: payload =>
      dispatch(deleteEnvironmentActions.deleteEnvironmentRequest(payload)),
    getEnvironment: payload =>
      dispatch(getEnvironmentActions.getEnvironmentRequest(payload)),
    editEnvironment: payload =>
      dispatch(editEnvironmentActions.patchEnvironmentRequest(payload)),
    createEnvironment: payload =>
      dispatch(createEnvironmentActions.createEnvironmentRequest(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EnvironmentContainer));
