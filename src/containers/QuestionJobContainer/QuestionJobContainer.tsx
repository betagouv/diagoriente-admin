import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import {
  IQuestionJob,
  CreateQuestionJobParams,
  GetQuestionJobParams,
  ListQuestionJobsParams,
  DeleteQuestionJobParams,
  PatchQuestionJobparams,
  ListQuestionJobResponse,
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
import listQuestionJobActions from '../../reducers/questionJob/listQuestionJob';
import deleteQuestionJobActions from '../../reducers/questionJob/deleteQuestionJob';
import getQuestionJobActions from '../../reducers/questionJob/getQuestionJob';
import editQuestionJobActions from '../../reducers/questionJob/patchQuestionJob';
import createQuestionJobActions from '../../reducers/questionJob/createQuestionJob';
import ConfirmModal from '../../component/ConfirmModal/ConfirmModal';
import FullModal from '../../component/fullScreenModal/fullModal';

// utils
import { encodeUri, decodeUri } from '../../utils/url';
import classNames from '../../utils/classNames';
import ContecxtForm from '../../component/Forms/QuestionJobForm';
import { listQuestionJob } from '../../requests';

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
  questionJobs: IQuestionJob[];
  deleteFetching: boolean;
  deleteError: string;
  getQuestionJobFetching: boolean;
  QuestionJob: IQuestionJob;
  getQuestionJobError: string;
  editQuestionJobFetching: boolean;
  editQuestionJobError: string;
  createQuestionJobFetching: boolean;
  createQuestionJobError: string;
  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
}

interface DispatchToProps {
  getListQuestionJob: (payload: ListQuestionJobsParams) => void;
  deleteQuestionJob: (payload: DeleteQuestionJobParams) => void;
  getQuestionJob: (payload: GetQuestionJobParams) => void;
  editQuestionJob: (payload: PatchQuestionJobparams) => void;
  createQuestionJob: (payload: CreateQuestionJobParams) => void;
}

export const PER_PAGE = 5;

type Props = MapToProps & DispatchToProps & RouteComponentProps & StyleProps;

interface State {
  open: boolean;
  openConfirm: boolean;
  currentSelectedId: string;
}

class QuestionJobContainer extends Component<Props, State> {
  state: State = {
    open: false,
    openConfirm: false,
    currentSelectedId: ''
  };

  headers = [
    {
      id: 'label',
      title: 'Label'
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
    this.getListQuestionJob();
    const edit = this.isEdit(this.props.location);
    if (edit) {
      this.props.getQuestionJob({ id: (edit.params as any).id });
    }
  }

  componentDidUpdate(props: Props) {
    if (
      !this.props.deleteFetching &&
      props.deleteFetching &&
      !this.props.deleteError
    ) {
      this.getListQuestionJob();
    }

    const edit = this.isEdit(this.props.location);
    if (!this.isEdit(props.location) && edit) {
      this.props.getQuestionJob({ id: (edit.params as any).id });
    }

    if (
      !this.props.editQuestionJobFetching &&
      props.editQuestionJobFetching &&
      !this.props.editQuestionJobError
    ) {
      this.getListQuestionJob();
      this.props.history.push({
        pathname: '/questionJob',
        search: this.props.location.search
      });
    }

    if (
      !this.props.createQuestionJobFetching &&
      props.createQuestionJobFetching &&
      !this.props.createQuestionJobError
    ) {
      this.search = '';
      this.getListQuestionJob({ page: 1 });
      this.setState({ open: false });
    }
  }

  isEdit = (location: Location<any>) =>
    matchPath(location.pathname, {
      path: '/questionJob/:id',
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
      pathname: `/questionJob/${id}`,
      search: this.props.location.search
    });
  };

  closeEditModal = () => {
    this.props.history.push({
      pathname: '/questionJob',
      search: this.props.location.search
    });
  };

  openModalDelete = (id: string) => {
    this.setState({ openConfirm: true, currentSelectedId: id });
  };
  YesDelete = (id: string) => {
    this.props.deleteQuestionJob({ id: this.state.currentSelectedId });
    this.setState({ openConfirm: false });
  };
  NoDelete = () => {
    this.setState({ openConfirm: false });
  };

  edit = (params: CreateQuestionJobParams) => {
    const id = this.props.QuestionJob._id;
    this.props.editQuestionJob({ id, ...params });
  };

  create = (params: CreateQuestionJobParams) => {
    this.props.createQuestionJob(params);
  };

  onChangeType = (type: string) => {
    this.type = type;
    this.getListQuestionJob();
  };

  handleSearch = (value: string) => {
    this.search = value;
    this.getListQuestionJob();
  };

  reset = () => {
    this.type = '';
    this.search = '';
    this.getListQuestionJob({ page: 1 });
  };

  handlePageChange = (page: number) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: encodeUri({ page })
    });
    this.getListQuestionJob({
      page
    });
  };

  getListQuestionJob = (params: ListQuestionJobsParams = {}) => {
    this.props.getListQuestionJob({
      perPage: PER_PAGE,
      page: this.props.currentPage,
      search: this.search,
      ...params
    });
  };

  renderModalContent = () => {
    if (this.props.getQuestionJobFetching) {
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
    const props = isEdit ? this.props.QuestionJob : {};
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
            header={isEdit ? 'Modifier Question Métier' : 'Créer Question Métier'}
            submitText={
              isEdit ? 'Modifier Question Métier' : 'Créer Question Métier'
            }
            onSubmitHandler={!isEdit ? this.create : this.edit}
            requestClose={isEdit ? this.closeEditModal : this.closeCreateModal}
            label={isEdit ? this.props.QuestionJob.label : ''}
            {...props}
          />
        </div>
      </Grid>
    );
  };
  /*  clickme = async () => {
    const response: Response<ListQuestionJobResponse> = await listQuestionJob();
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
          rows={this.props.questionJobs}
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
          title="Modifier Question Métier"
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
          title="Créer Question Métier"
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
  const getQuestionJob = state.QuestionJob.get('getQuestionJob');
  const deleteQuestionJob = state.QuestionJob.get('deleteQuestionJob');
  const editQuestionJob = state.QuestionJob.get('patchQuestionJob');
  const createQuestionJob = state.QuestionJob.get('createQuestionJob');
  const listQuestionJob = state.QuestionJob.get('listQuestionJob');

  return {
    fetching: listQuestionJob.get('fetching'),
    questionJobs: listQuestionJob.get('questionJobs').data,
    deleteFetching: deleteQuestionJob.get('fetching'),
    deleteError: deleteQuestionJob.get('error'),
    getQuestionJobFetching: getQuestionJob.get('fetching'),
    QuestionJob: getQuestionJob.get('questionJob'),
    getQuestionJobError: getQuestionJob.get('error'),
    editQuestionJobFetching: editQuestionJob.get('fetching'),
    editQuestionJobError: editQuestionJob.get('error'),
    createQuestionJobFetching: createQuestionJob.get('fetching'),
    createQuestionJobError: createQuestionJob.get('error'),
    count: listQuestionJob.get('questionJobs').count,
    currentPage: listQuestionJob.get('questionJobs').currentPage,
    perPage: listQuestionJob.get('questionJobs').perPage,
    totalPages: listQuestionJob.get('questionJobs').totalPages
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): DispatchToProps {
  return {
    getListQuestionJob: payload =>
      dispatch(listQuestionJobActions.listQuestionJobRequest(payload)),
    deleteQuestionJob: payload =>
      dispatch(deleteQuestionJobActions.deleteQuestionJobRequest(payload)),
    getQuestionJob: payload =>
      dispatch(getQuestionJobActions.getQuestionJobRequest(payload)),
    editQuestionJob: payload =>
      dispatch(editQuestionJobActions.patchQuestionJobRequest(payload)),
    createQuestionJob: payload =>
      dispatch(createQuestionJobActions.createQuestionJobRequest(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(QuestionJobContainer));
