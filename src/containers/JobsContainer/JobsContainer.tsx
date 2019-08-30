import React from 'react';
import { RouteComponentProps, matchPath } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';

import Table from '../../component/Table/Tables';
import FullModal from '../../component/fullScreenModal/fullModal';

import { listJobs, createJob, deleteJob, getJob, patchJob } from '../../requests/jobs';
import { getListSecteurs } from '../../requests/secteur';
import { listEnvironment } from '../../requests/environment';

import classes from './jobsContainer.module.css';
import { ListParams, Job, ListResponse, Response, CreateJobData, ISecteur } from 'requests';

import withApi, { ApiComponentProps } from '../../hoc/withApis';
import JobForm from '../../component/Forms/JobForm';

import { decodeUri, encodeUri } from '../../utils/url';
import ConfirmModal from '../../component/ConfirmModal/ConfirmModal';

interface State {
  open: boolean;
  title: string;
  openConfirm: boolean;
  currentSelectedId: string;
}

type Props = any;

const PER_PAGE = 5;

class JobsContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    if (this.checkCreate()) {
      this.handleAdd();
    } else {
      const match = this.checkEdit();
      if (match) {
        const { id } = match.params as any;
        this.handleEdit(id);
      }
    }
    this.state = {
      open: false,
      title: '',
      openConfirm: false,
      currentSelectedId: '',
    };
  }

  headers = [
    {
      id: 'title',
      title: 'Titre',
    },
    { id: 'description', title: 'Description' },
  ];

  search: string = '';
  title: string = '';
  page: number = 1;

  componentDidMount() {
    const { page } = decodeUri(this.props.location.search);
    this.getList({ page });
    this.getSecteurs();
    this.getEnvironments();
  }

  componentDidUpdate(props: Props) {
    const { page } = decodeUri(this.props.location.search);
    if (
      this.checkSuccess('create', props) ||
      this.checkSuccess('edit', props) ||
      (props.list.fetching && !this.props.list.fetching && this.props.list.data.totalPages < page)
    ) {
      this.props.history.push('/jobs');
      this.getList({ search: this.search });
    } else if (this.checkSuccess('delete', props)) {
      this.getList({ search: this.search });
    }
  }

  checkSuccess = (api: 'delete' | 'create' | 'edit', prevProps: Props) => {
    const currentItems = this.props[api];
    const prevItems = prevProps[api];
    return !currentItems.fetching && prevItems.fetching && !currentItems.error;
  };

  checkEdit = () => {
    const { location } = this.props;
    return matchPath(location.pathname, {
      path: '/jobs/edit/:id',
      exact: true,
    });
  };

  checkCreate = () => {
    const { location } = this.props;
    return matchPath(location.pathname, {
      path: '/jobs/create',
      exact: true,
    });
  };

  openAdd = () => {
    this.handleAdd();
    this.props.history.push('/jobs/create');
  };

  handleAdd = () => {
    this.title = 'Ajouter un métier';
  };

  openEdit = (id: string) => {
    this.handleEdit(id);
    this.props.history.push(`/jobs/edit/${id}`);
  };

  handleEdit = (id: string) => {
    this.title = 'Modifier métier';
    this.props.details.call(id);
  };

  closeModal = () => {
    this.props.history.push('/jobs');
  };

  edit = (values: CreateJobData) => {
    const editMatch = this.checkEdit();
    if (editMatch) {
      this.props.edit.call({
        id: (editMatch.params as { id: string }).id,
        ...values,
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
  getSecteurs = (params: ListParams = {}) => {
    this.props.secteurs.call({ perPage: 100, type: 'secteur', ...params });
  };
  getEnvironments = (params: ListParams = {}) => {
    this.props.environments.call({ perPage: 100, ...params });
  };

  handlePageChange = (page: number) => {
    const params: ListParams = { page };
    if (this.search) params.search = this.search;
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: encodeUri({ page }),
    });
    this.getList(params);
  };

  openModalDelete = (id: string) => {
    this.setState({ openConfirm: true, currentSelectedId: id });
  };

  YesDelete = (id: string) => {
    this.props.delete.call(this.state.currentSelectedId);
    this.setState({ openConfirm: false });
  };

  NoDelete = () => {
    this.setState({ openConfirm: false });
  };

  render() {
    const { data, totalPages, currentPage, count, perPage } = this.props.list.data;
    return (
      <>
        {this.props.list.fetching && (
          <div className={classes.loader_container}>
            <CircularProgress />
          </div>
        )}
        {data && (
          <Table
            rows={data}
            headers={this.headers}
            totalPages={totalPages}
            count={count}
            currentPage={currentPage}
            rowsPerPage={perPage}
            handlePageChange={this.handlePageChange}
            search={this.searchRequest}
            reset={this.getList}
            add={this.openAdd}
            edit={this.openEdit}
            delete={this.openModalDelete}
          />
        )}
        {!this.props.list.fetching && (!data || data.length === 0) && (
          <p className={classes.empty}>{this.props.list.error || 'Aucune piste métier a afficher...'}</p>
        )}
        <FullModal title={this.title} handleClose={this.closeModal} open={!!this.checkCreate()} maxWidth={'md'}>
          {this.props.secteurs.data.data && (
            <JobForm
              submitText={this.title}
              fetching={this.props.create.fetching}
              onSubmit={this.props.create.call}
              error={this.props.create.error}
              secteur={this.props.secteurs.data.data}
              environments={this.props.environments.data.data}
            />
          )}
        </FullModal>
        <FullModal title={this.title} handleClose={this.closeModal} open={!!this.checkEdit()} maxWidth={'md'} fullScreen>
          {this.props.secteurs.data.data && this.props.details.data.secteur && (
            <JobForm
              submitText={this.title}
              fetching={this.props.details.fetching || this.props.edit.fetching}
              onSubmit={this.edit}
              title={this.props.details.data.title}
              description={this.props.details.data.description}
              error={this.props.details.error || this.props.edit.error}
              interests={this.props.details.data.interests}
              competences={this.props.details.data.competences}
              secteur={this.props.secteurs.data.data}
              environments={this.props.details.data.environments}
              Acceccible={this.props.details.data.accessibility}
              selectedSecteur={
                this.props.details.data.secteur && this.props.details.data.secteur.length ? this.props.details.data.secteur[0]._id : ''
              }
              link={this.props.details.data.link}
            />
          )}
        </FullModal>
        <ConfirmModal open={this.state.openConfirm} YesButton={this.YesDelete} NoButton={this.NoDelete} close={this.NoDelete} />
      </>
    );
  }
}

export default withApi({
  list: listJobs,
  create: createJob,
  delete: deleteJob,
  details: getJob,
  edit: patchJob,
  secteurs: getListSecteurs,
  environments: listEnvironment,
})(JobsContainer);
