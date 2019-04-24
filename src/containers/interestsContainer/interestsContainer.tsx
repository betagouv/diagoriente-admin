import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import {
  Interest,
  CreateInterestParams,
  DeleteInterestParams,
  GetInterestParams,
  ListInterestsParams,
  PatchInterestParams,
} from 'requests';
import { ReduxState } from 'reducers';
import { RouteComponentProps, matchPath } from 'react-router-dom';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Location } from 'history';

// components
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '../../component/Table/Tables';
import InterestForm from '../../component/Forms/interrestForm';
import FullModal from '../../component/fullScreenModal/fullModal';

// actions
import listInterestsActions from '../../reducers/interests/listInterests';
import deleteInterestActions from '../../reducers/interests/deleteInterest';
import getInterestsActions from '../../reducers/interests/getInterest';
import editInterestsActions from '../../reducers/interests/patchInterest';
import createInterestsActions from '../../reducers/interests/createInterest';
import ConfirmModal from '../../component/ConfirmModal/ConfirmModal';
import InterestModal from '../../component/Modal/InterestModal';

// utils
import { encodeUri, decodeUri } from '../../utils/url';

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
  });

interface StyleProps extends WithStyles<typeof styles> {
  classes: {
    fill: string;
    center: string;
    absolute: string;
  };
}

interface MapToProps {
  fetching: boolean;
  interests: Interest[];
  deleteFetching: boolean;
  deleteError: string;
  getInterestsFetching: boolean;
  interest: Interest;
  getInterestsError: string;
  editInterestFetching: boolean;
  editInterestError: string;
  createInterestFetching: boolean;
  createInterestError: string;
  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
}

interface DispatchToProps {
  getListInterest: (payload: ListInterestsParams) => void;
  deleteInterest: (payload: DeleteInterestParams) => void;
  getInterest: (payload: GetInterestParams) => void;
  editInterest: (payload: PatchInterestParams) => void;
  createInterest: (payload: CreateInterestParams) => void;
}

type Props = MapToProps & DispatchToProps & RouteComponentProps & StyleProps;

interface State {
  open: boolean;
  openConfirm: boolean;
  currentSelectedId: string;
}
export const PER_PAGE = 5;

class ActivitiesContainer extends Component<Props, State> {
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
    { id: 'nom', title: 'Nom' },
  ];

  search: string = '';

  componentDidMount() {
    const { page } = decodeUri(this.props.location.search);
    this.getListInterest({ page });
  }

  componentDidUpdate(props: Props) {
    if (
      !this.props.deleteFetching &&
      props.deleteFetching &&
      !this.props.deleteError
    ) {
      this.getListInterest();
    }
    const edit = this.isEdit(this.props.location);
    if (edit && !this.isEdit(props.location)) {
      this.props.getInterest({ id: (edit.params as any).id });
    }

    if (
      !this.props.editInterestFetching &&
      props.editInterestFetching &&
      !this.props.editInterestError
    ) {
      this.getListInterest();
      this.props.history.push({
        pathname: '/interests',
        search: this.props.location.search,
      });
    }

    if (
      !this.props.createInterestFetching &&
      props.createInterestFetching &&
      !this.props.createInterestError
    ) {
      this.search = '';
      this.getListInterest({ page: 0 });
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
      path: '/interests/:id',
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
      pathname: `/interests/${id}`,
      search: this.props.location.search,
    });
  }

  closeEditModal = () => {
    this.props.history.push({
      pathname: '/interests',
      search: this.props.location.search,
    });
  }

  delete = (id: string) => {
    this.props.deleteInterest({ id });
  }

  edit = (params: CreateInterestParams) => {
    const id = this.props.interest._id;
    this.props.editInterest({ id, ...params });
  }

  create = (params: CreateInterestParams) => {
    this.props.createInterest(params);
  }

  openModalDelete = (id: string) => {
    this.setState({ openConfirm: true, currentSelectedId: id });
  }

  YesDelete = (id: string) => {
    this.props.deleteInterest({ id: this.state.currentSelectedId });
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
    this.getListInterest({
      page,
    });
  }

  handleSearch = (value: string) => {
    this.search = value;
    this.getListInterest();
  }

  resetInterests = () => {
    this.search = '';
    this.getListInterest();
  }

  getListInterest = (params: ListInterestsParams = {}) => {
    this.props.getListInterest({
      search: this.search,
      page: this.props.currentPage,
      perPage: PER_PAGE,
      ...params,
    });
  }

  renderModalContent = () => {
    if (this.props.getInterestsFetching) {
      return <CircularProgress />;
    }
    return (
      <InterestForm
        // header={'Modifier intérêt'}
        submitText={'Modifier intérêt'}
        onSubmitHandler={this.edit}
        nom={this.props.interest.nom}
        rank={this.props.interest.rank}
        buttonName="Modifier intérêt"
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
            }`}
          >
            <CircularProgress />
          </div>
        )}

        <Table
          headers={this.headers}
          rows={this.props.interests}
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
        />

        <FullModal
          open={!!this.isEdit(this.props.location)}
          handleClose={this.closeEditModal}
          title="Modifier intérêt"
        >
          <div
            className={`${this.props.classes.fill} ${
              this.props.classes.center
            }`}
          >
            {this.renderModalContent()}
          </div>
        </FullModal>
        <FullModal
          open={this.state.open}
          handleClose={this.handleClose}
          title="Créer intérêt"
        >
          <InterestForm
            onSubmitHandler={this.create}
            buttonName="Créer intérêt"
          />
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
  const listInterests = state.interests.get('listInterests');
  const deleteInterests = state.interests.get('deleteInterest');
  const getInterests = state.interests.get('getInterest');
  const editInterests = state.interests.get('patchInterest');
  const createInterests = state.interests.get('createInterest');

  return {
    fetching: listInterests.get('fetching'),
    interests: listInterests.get('interests').data,
    deleteFetching: deleteInterests.get('fetching'),
    deleteError: deleteInterests.get('error'),
    getInterestsFetching: getInterests.get('fetching'),
    interest: getInterests.get('interest'),
    getInterestsError: getInterests.get('error'),
    editInterestFetching: editInterests.get('fetching'),
    editInterestError: editInterests.get('error'),
    createInterestFetching: createInterests.get('fetching'),
    createInterestError: createInterests.get('error'),
    count: listInterests.get('interests').count,
    currentPage: listInterests.get('interests').currentPage,
    perPage: listInterests.get('interests').perPage,
    totalPages: listInterests.get('interests').totalPages,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): DispatchToProps {
  return {
    getListInterest: payload =>
      dispatch(listInterestsActions.listInterestsRequest(payload)),
    deleteInterest: payload =>
      dispatch(deleteInterestActions.deleteInterestRequest(payload)),
    getInterest: payload =>
      dispatch(getInterestsActions.getInterestRequest(payload)),
    editInterest: payload =>
      dispatch(editInterestsActions.patchInterestRequest(payload)),
    createInterest: payload =>
      dispatch(createInterestsActions.createInterestRequest(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ActivitiesContainer));
