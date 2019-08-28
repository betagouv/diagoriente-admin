import React from 'react';
import { RouteComponentProps, matchPath } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';

import { isEmpty } from 'lodash';
import Table from '../../component/Table/Tables';
import FullModal from '../../component/fullScreenModal/fullModal';

import {
  listJobs,
  getJob,
  patchJob
} from '../../requests/jobs';
import classes from './QuestionJobsContainer.module.css';
import {
  ListParams,
  Job,
  ListResponse,
  Response,
  CreateJobData,
  CreateQuestionJobData
} from 'requests';

import withApi, { ApiComponentProps } from '../../hoc/withApis';
import QuestionJobForm from '../../component/Forms/QuestionJobForm';

import { decodeUri, encodeUri } from '../../utils/url';
import ConfirmModal from '../../component/ConfirmModal/ConfirmModal';

interface State {
  open: boolean;
  title: string;
  openConfirm: boolean;
  currentSelectedId: string;
}

type Props = RouteComponentProps &
  ApiComponentProps<{
    list: ListResponse<Job>;
    details: Job;
    edit: Job;
  }>;

const PER_PAGE = 5;

class QuestionJobContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const match = this.checkEdit();
    if (match) {
      const { id } = match.params as any;
      this.handleEdit(id);
    }
    this.state = {
      open: false,
      title: '',
      openConfirm: false,
      currentSelectedId: ''
    };
  }

  headers = [
    {
      id: 'title',
      title: 'Titre'
    },
    { id: 'description', title: 'Description' }
  ];

  search: string = '';
  title: string = '';
  page: number = 1;

  componentDidMount() {
    const { page } = decodeUri(this.props.location.search);
    this.getList({ page });
  }

  componentDidUpdate(props: Props) {
    const { page } = decodeUri(this.props.location.search);
    if (
      this.checkSuccess('edit', props) ||
      (props.list.fetching &&
        !this.props.list.fetching &&
        this.props.list.data.totalPages < page)
    ) {
      this.props.history.push('/questionJob');
      this.getList({ search: this.search });
    }
  }

  checkSuccess = (api: 'edit', prevProps: Props) => {
    const currentItems = this.props[api];
    const prevItems = prevProps[api];
    return !currentItems.fetching && prevItems.fetching && !currentItems.error;
  };

  checkEdit = () => {
    const { location } = this.props;
    return matchPath(location.pathname, {
      path: '/questionJob/edit/:id',
      exact: true
    });
  };

  openEdit = (id: string) => {
    this.handleEdit(id);
    this.props.history.push(`/questionJob/edit/${id}`);
  };

  handleEdit = (id: string) => {
    this.title = 'Modifier Questions métier';
    this.props.details.call(id);
  };

  closeModal = () => {
    this.props.history.push('/questionJob');
  };

  edit = (questionJobs: any) => {
    const editMatch = this.checkEdit();
    if (editMatch) {
      this.props.edit.call({
        id: (editMatch.params as { id: string }).id,
        questionJobs
      });
    }
  };

  searchRequest = (search: string) => {
    this.search = search;
    this.getList({ search });
  };

  getList = (params: ListParams = {}) => {
    this.props.list.call({ perPage: PER_PAGE, ...params });
  };

  handlePageChange = (page: number) => {
    const params: ListParams = { page };
    if (this.search) params.search = this.search;
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: encodeUri({ page })
    });
    this.getList(params);
  };
  /** */
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  openCreateModal = () => {
    this.setState({ open: true });
  };

  closeCreateModal = () => {
    this.setState({ open: false });
  };

  openEditModal = (id: string) => {
    this.props.history.push({
      pathname: `/questionJob/edit/${id}`,
      search: this.props.location.search
    });
  };

  openModalDelete = (id: string) => {
    this.setState({ openConfirm: true, currentSelectedId: id });
  };

  renderModalContent = () => {
    const { data } = this.props.details;
    if (isEmpty(data)) {
      return <CircularProgress />;
    }

    return (<QuestionJobForm
      questionJobs={data.questionJobs}
      onSubmitHandler={this.edit}
      requestClose={() => { }}
    />);
  };

  render() {
    const {
      data,
      totalPages,
      currentPage,
      count,
      perPage
    } = this.props.list.data;

    return (
      <>
        {this.props.list.fetching && (
          <div
            className={classes.loader_container}
          >
            <CircularProgress />
          </div>
        )}

        {data && (<Table
          rows={data}
          headers={this.headers}
          totalPages={totalPages}
          count={count}
          currentPage={currentPage}
          rowsPerPage={perPage}
          handlePageChange={this.handlePageChange}
          search={this.searchRequest}
          reset={this.getList}
          edit={this.openEdit}
          typeFilter={false}
          hasEdit={true}
          hasDelete={false}
          hasAdd={false}
        />)}
        {!this.props.list.fetching && (!data || data.length === 0) && (
          <p className={classes.empty}>
            {this.props.list.error || 'Aucune piste métier a afficher...'}
          </p>
        )}
        <FullModal
          open={!!this.checkEdit()}
          handleClose={this.closeModal}
          title="Modifier Métier"
          fullScreen
        >
          <div className={classes.center}>
            {this.renderModalContent()}
          </div>
        </FullModal>
      </>
    );
  }
}

export default withApi({
  list: listJobs,
  details: getJob,
  edit: patchJob
})(QuestionJobContainer);
