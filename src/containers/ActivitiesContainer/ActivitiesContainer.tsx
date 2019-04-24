import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import {
  Activity,
  CreateActivityParams,
  DeleteActivityParams,
  GetActivityParams,
  ListActivitiesParams,
  PatchActivityParams,
  CreateInterestParams,
  PatchInterestParams,
  Interest,
  GetInterestParams,
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
import Modal from '../../component/Modal/Modal';
import Edit from '../../component/Icons/Edit';
import ActivityForm from '../../component/Forms/activityForm';
import IconVerified from '../../component/Icons/IconVerified';
import IconNotVerified from '../../component/Icons/IconNotVerified';
import InterestForm, {
  InterestFormComponent,
} from '../../component/Forms/interrestForm';

// actions
import listActivitiesActions from '../../reducers/activities/listActivities';
import deleteActivityActions from '../../reducers/activities/deleteActivity';
import getActivityActions from '../../reducers/activities/getActivity';
import editActivityActions from '../../reducers/activities/patchActivity';
import createActivityActions from '../../reducers/activities/createActivity';
import ConfirmModal from '../../component/ConfirmModal/ConfirmModal';
import InterestModal from '../../component/Modal/InterestModal';
import FullModal from '../../component/fullScreenModal/fullModal';
// interest
import getInterestsActions from '../../reducers/interests/getInterest';
import editInterestsActions from '../../reducers/interests/patchInterest';
import createInterestsActions from '../../reducers/interests/createInterest';

// utils
import { encodeUri, decodeUri } from '../../utils/url';
import classNames from '../../utils/classNames';

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
    RowContainer: {
      flexDirection: 'row',
      padding: '15px 40px',
      width: '100%',
      margin: 0,
    },
    modalItem: {
      flex: '1 1 50%',
      alignItems: 'stretch',
    },
    modalLeft: {
      paddingRight: 15,
    },
    modalRight: {
      paddingLeft: 15,
    },
    modalContainer: {
      height: '90%',
      margin: 'auto',
      maxHeight: '100%',
    },
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
  activities: Activity[];
  deleteFetching: boolean;
  deleteError: string;
  getActivityFetching: boolean;
  activity: Activity;
  getActivityError: string;
  editActivityFetching: boolean;
  editActivityError: string;
  createActivityFetching: boolean;
  createActivityError: string;
  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
  // interrest
  createInterestFetching: boolean;
  createInterestError: string;
}

interface DispatchToProps {
  getListActivities: (payload: ListActivitiesParams) => void;
  deleteActivity: (payload: DeleteActivityParams) => void;
  getActivity: (payload: GetActivityParams) => void;
  editActivity: (payload: PatchActivityParams) => void;
  createActivity: (payload: CreateActivityParams) => void;
  // interst
  createInterest: (payload: CreateInterestParams) => void;
}

export const PER_PAGE = 20;

type Props = MapToProps & DispatchToProps & RouteComponentProps & StyleProps;

interface State {
  open: boolean;
  openConfirm: boolean;
  currentSelectedId: string;
}

class ActivitiesContainer extends Component<Props, State> {
  state: State = {
    open: false,
    openConfirm: false,
    currentSelectedId: '',
  };

  headers = [
    {
      id: 'title',
      title: 'Titre',
    },
    { id: 'type', title: 'Type' },
    {
      id: 'verified',
      title: 'Visible',
      render: (value: boolean) => {
        if (value) {
          return <IconVerified />;
        }
        return <IconNotVerified />;
      },
    },
  ];

  search: string = '';
  type: string = '';

  interestForm: InterestFormComponent | null = null;

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  }
  componentDidMount() {
    const { page } = decodeUri(this.props.location.search);
    this.getListActivities({ page });
    const edit = this.isEdit(this.props.location);
    if (edit) {
      this.props.getActivity({ id: (edit.params as any).id });
    }
  }

  componentDidUpdate(props: Props) {
    if (
      !this.props.deleteFetching &&
      props.deleteFetching &&
      !this.props.deleteError
    ) {
      this.getListActivities();
    }

    const edit = this.isEdit(this.props.location);
    if (!this.isEdit(props.location) && edit) {
      this.props.getActivity({ id: (edit.params as any).id });
    }

    if (
      !this.props.editActivityFetching &&
      props.editActivityFetching &&
      !this.props.editActivityError
    ) {
      this.getListActivities();
      this.props.history.push({
        pathname: '/activities',
        search: this.props.location.search,
      });
    }

    if (
      !this.props.createActivityFetching &&
      props.createActivityFetching &&
      !this.props.createActivityError
    ) {
      this.search = '';
      this.type = '';
      this.getListActivities({ page: 1 });
      this.setState({ open: false });
    }

    if (
      !this.props.createInterestFetching &&
      props.createInterestFetching &&
      !this.props.createInterestError &&
      this.interestForm
    ) {
      this.interestForm.resetValues();
    }
  }

  isEdit = (location: Location<any>) =>
    matchPath(location.pathname, {
      path: '/activities/:id',
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
      pathname: `/activities/${id}`,
      search: this.props.location.search,
    });
  }

  closeEditModal = () => {
    this.props.history.push({
      pathname: '/activities',
      search: this.props.location.search,
    });
  }

  /* delete = (id: string) => {
    this.props.deleteActivity({ id });
  } */
  // delete modal pop up
  openModalDelete = (id: string) => {
    this.setState({ openConfirm: true, currentSelectedId: id });
  }
  YesDelete = (id: string) => {
    this.props.deleteActivity({ id: this.state.currentSelectedId });
    this.setState({ openConfirm: false });
  }
  NoDelete = () => {
    this.setState({ openConfirm: false });
  }

  edit = (params: CreateActivityParams) => {
    const id = this.props.activity._id;
    this.props.editActivity({ id, ...params });
  }

  create = (params: CreateActivityParams) => {
    this.props.createActivity(params);
  }

  CreateInterrest = (params: CreateInterestParams) => {
    this.props.createInterest(params);
  }

  onChangeType = (type: string) => {
    this.type = type;
    this.getListActivities();
  }

  handleSearch = (value: string) => {
    this.search = value;
    this.getListActivities();
  }

  reset = () => {
    this.type = '';
    this.search = '';
    this.getListActivities({ page: 1 });
  }

  handlePageChange = (page: number) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: encodeUri({ page }),
    });
    this.getListActivities({
      page,
    });
  }

  getListActivities = (params: ListActivitiesParams = {}) => {
    this.props.getListActivities({
      perPage: PER_PAGE,
      page: this.props.currentPage,
      search: this.search,
      type: this.type,
      ...params,
    });
  }

  captureInterestFormRef = (ref: InterestFormComponent) => {
    this.interestForm = ref;
  }

  renderModalContent = () => {
    if (this.props.getActivityFetching) {
      return (
        <div
          className={classNames(
            this.props.classes.fill,
            this.props.classes.center,
          )}
        >
          <CircularProgress />
        </div>
      );
    }

    const isEdit = this.isEdit(this.props.location);
    const props = isEdit ? this.props.activity : {};
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
            this.props.classes.modalLeft,
          )}
        >
          <ActivityForm
            header={isEdit ? 'Modifier Activité' : 'Créé Activité'}
            submitText={isEdit ? 'Modifier Activité' : 'Créé Activité'}
            onSubmitHandler={!isEdit ? this.create : this.edit}
            requestClose={isEdit ? this.closeEditModal : this.closeCreateModal}
            {...props}
          />
        </div>
        <div
          className={classNames(
            this.props.classes.modalItem,
            this.props.classes.modalRight,
          )}
        >
          <InterestForm
            submitText={'Créé intérêt'}
            onSubmitHandler={this.CreateInterrest}
            buttonName="Créé intérêt"
            innerRef={this.captureInterestFormRef}
            fetching={this.props.createInterestFetching}
          />
        </div>
      </Grid>
    );
  }

  render() {
    return (
      <>
        {this.props.fetching && (
          <div
            className={`${this.props.classes.absolute} ${
              this.props.classes.center
            }`}
          >
            <CircularProgress />
          </div>
        )}

        <Table
          headers={this.headers}
          rows={this.props.activities}
          delete={this.openModalDelete}
          edit={this.openEditModal}
          add={this.openCreateModal}
          onChangeType={this.onChangeType}
          search={this.handleSearch}
          reset={this.reset}
          typeFilter
          rowsPerPage={this.props.perPage}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          count={this.props.count}
          handlePageChange={this.handlePageChange}
        />

        <FullModal
          open={!!this.isEdit(this.props.location)}
          handleClose={this.closeEditModal}
          title="Modifier Activité"
          maxWidth={'lg'}
          modalStyle={this.props.classes.modalContainer}
        >
          <div className={this.props.classes.fill}>
            {this.renderModalContent()}
          </div>
        </FullModal>

        <FullModal
          open={this.state.open}
          handleClose={this.handleClose}
          title="Créer Des Activités"
          maxWidth={'lg'}
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
  const listActivities = state.activities.get('listActivities');
  const deleteActivities = state.activities.get('deleteActivity');
  const getActivities = state.activities.get('getActivity');
  const editActivity = state.activities.get('patchActivity');
  const createActivity = state.activities.get('createActivity');
  // interest
  const getInterests = state.interests.get('getInterest');
  const editInterests = state.interests.get('patchInterest');
  const createInterests = state.interests.get('createInterest');

  return {
    fetching: listActivities.get('fetching'),
    activities: listActivities.get('activities').data,
    deleteFetching: deleteActivities.get('fetching'),
    deleteError: deleteActivities.get('error'),
    getActivityFetching: getActivities.get('fetching'),
    activity: getActivities.get('activity'),
    getActivityError: getActivities.get('error'),
    editActivityFetching: editActivity.get('fetching'),
    editActivityError: editActivity.get('error'),
    createActivityFetching: createActivity.get('fetching'),
    createActivityError: createActivity.get('error'),
    count: listActivities.get('activities').count,
    currentPage: listActivities.get('activities').currentPage,
    perPage: listActivities.get('activities').perPage,
    totalPages: listActivities.get('activities').totalPages,
    // interest
    createInterestFetching: createInterests.get('fetching'),
    createInterestError: createInterests.get('error'),
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): DispatchToProps {
  return {
    getListActivities: payload =>
      dispatch(listActivitiesActions.listActivitiesRequest(payload)),
    deleteActivity: payload =>
      dispatch(deleteActivityActions.deleteActivityRequest(payload)),
    getActivity: payload =>
      dispatch(getActivityActions.getActivityRequest(payload)),
    editActivity: payload =>
      dispatch(editActivityActions.patchActivityRequest(payload)),
    createActivity: payload =>
      dispatch(createActivityActions.createActivityRequest(payload)),
    // interest
    createInterest: payload =>
      dispatch(createInterestsActions.createInterestRequest(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ActivitiesContainer));
