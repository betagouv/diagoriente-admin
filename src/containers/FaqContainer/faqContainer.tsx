import React from 'react';
import { RouteComponentProps, matchPath } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import CircularProgress from '@material-ui/core/CircularProgress';

import Table from '../../component/Table/Tables';
import FullModal from '../../component/fullScreenModal/fullModal';
import { Location } from 'history';

import classes from './faq.module.css';

import {
  listFaq,
  CreateFaq,
  getFaq,
  patchFaq,
  deleteFaq,
  ListFaqParams,
} from '../../requests';
import { createFaqParams } from 'requests';

import withApi, { ApiComponentProps } from '../../hoc/withApis';
import FaqForm from '../../component/Forms/FaqForm';

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
    create: typeof CreateFaq;
    list: typeof listFaq;
    details: typeof getFaq;
    edit: typeof patchFaq;
    delete: typeof deleteFaq;
  }>;

const PER_PAGE = 5;

class FaqContainer extends React.Component<Props, State> {
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
      currentSelectedId: '',
    };
  }

  headers = [
    {
      id: 'question',
      title: 'Question',
    },
    { id: 'response', title: 'Response' },
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
    const edit = this.isEdit(this.props.location);
    if (edit && !this.isEdit(props.location)) {
      this.props.details.call({ id: (edit.params as any).id });
    }
    if (
      this.checkSuccess('edit', props) ||
      (props.list.fetching &&
        !this.props.list.fetching &&
        this.props.list.data.totalPages < page)
    ) {
      this.props.history.push('/faq');
      this.getList({ search: this.search });
    }
    if (
      !this.props.create.fetching &&
      props.create.fetching &&
      !this.props.create.error
    ) {
      this.setState({ open: false });
      this.getList({ page });
    }
    if (
      !this.props.edit.fetching &&
      props.edit.fetching &&
      !this.props.edit.error
    ) {
      this.getList({ page });
      this.props.history.push({
        pathname: '/faq',
        search: this.props.location.search,
      });
    }
    if (
      !this.props.delete.fetching &&
      props.delete.fetching &&
      !this.props.delete.error
    ) {
      this.setState({ open: false });
      this.getList({ page });
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
      path: '/faq/edit/:id',
      exact: true,
    });
  };
  isEdit = (location: Location<any>) =>
    matchPath(location.pathname, {
      path: '/questions/:id',
      exact: true,
    });
  openEdit = (id: string) => {
    this.handleEdit(id);
    this.props.history.push(`/faq/edit/${id}`);
  };

  handleEdit = (id: string) => {
    this.title = 'Modifier FAQ Question';
    this.props.details.call(id);
  };

  closeModal = () => {
    this.props.history.push('/faq');
  };

  edit = (data: createFaqParams) => {
    const editMatch = this.checkEdit();
    const id = this.props.details.data._id;

    if (editMatch) {
      this.props.edit.call({
        id: id,
        data,
      });
    }
  };
  create = (data: createFaqParams) => {
    this.props.create.call(data);
  };

  searchRequest = (search: string) => {
    this.search = search;
    this.getList({ search });
  };

  getList = (params: ListFaqParams = {}) => {
    this.props.list.call({ perPage: PER_PAGE, ...params });
  };

  handlePageChange = (page: number) => {
    const params: ListFaqParams = { page };
    if (this.search) params.search = this.search;
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: encodeUri({ page }),
    });
    this.getList(params);
  };
  /** */
  handleClickOpen = () => {
    this.setState({
      open: true,
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
      pathname: `/faq/edit/${id}`,
      search: this.props.location.search,
    });
  };

  openModalDelete = (id: string) => {
    this.setState({ openConfirm: true, currentSelectedId: id });
  };
  YesDelete = (id: string) => {
    this.props.delete.call({ id: this.state.currentSelectedId });
    this.setState({ openConfirm: false });
  };
  NoDelete = () => {
    this.setState({ openConfirm: false });
  };

  renderModalContent = () => {
    if (!!this.checkEdit()) {
      if (this.props.details && this.props.details.data) {
        return (
          <FaqForm
            onSubmitHandler={this.edit}
            response={this.props.details.data.response}
            question={this.props.details.data.question}
            buttonName="Modifier"
          />
        );
      }
    } else {
      return <FaqForm onSubmitHandler={this.create} buttonName="Ajouter" />;
    }
  };

  render() {
    const {
      data,
      totalPages,
      currentPage,
      count,
      perPage,
    } = this.props.list.data;
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
            edit={this.openEdit}
            add={this.openCreateModal}
            delete={this.openModalDelete}
            typeFilter={false}
            hasEdit={true}
            hasDelete={true}
            hasAdd={true}
          />
        )}
        {!this.props.list.fetching && (!data || data.length === 0) && (
          <p className={classes.empty}>
            {this.props.list.error || 'Aucune faq ...'}
          </p>
        )}
        <FullModal
          open={!!this.checkEdit()}
          handleClose={this.closeModal}
          title="Modifier Faq">
          <div className={classes.center}>{this.renderModalContent()}</div>
        </FullModal>
        <FullModal
          open={this.state.open}
          handleClose={this.handleClose}
          title="Créer Faq">
          <Grid container spacing={16} justify="space-between">
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

export default withApi({
  create: CreateFaq,
  list: listFaq,
  details: getFaq,
  edit: patchFaq,
  delete: deleteFaq,
})(FaqContainer);
