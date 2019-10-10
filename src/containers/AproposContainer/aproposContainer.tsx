import React from 'react';
import { RouteComponentProps, matchPath } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import CircularProgress from '@material-ui/core/CircularProgress';

import Table from '../../component/Table/Tables';
import FullModal from '../../component/fullScreenModal/fullModal';
import { Location } from 'history';

import classes from './apropos.module.css';

import {
  listApropos,
  CreateApropos,
  getApropos,
  patchApropos,
  deleteApropos,
  ListAproposParams,
} from '../../requests';
import { createAproposParams } from 'requests';

import withApi, { ApiComponentProps } from '../../hoc/withApis';
import AproposForm from '../../component/Forms/AproposForm';

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
    create: typeof CreateApropos;
    list: typeof listApropos;
    details: typeof getApropos;
    edit: typeof patchApropos;
    delete: typeof deleteApropos;
  }>;

const PER_PAGE = 5;

class AproposContainer extends React.Component<Props, State> {
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
      id: 'title',
      title: 'Title',
    },
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
      console.log('details call')
      this.props.details.call({ id: (edit.params as any).id });
    }
    if (
      this.checkSuccess('edit', props) ||
      (props.list.fetching &&
        !this.props.list.fetching &&
        this.props.list.data.totalPages < page)
    ) {
      this.props.history.push('/apropos');
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
        pathname: '/apropos',
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
      path: '/apropos/edit/:id',
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
    this.props.history.push(`/apropos/edit/${id}`);
  };

  handleEdit = (id: string) => {
    this.title = 'Modifier Apropos Question';
    this.props.details.call(id);
  };

  closeModal = () => {
    this.props.history.push('/apropos');
  };

  edit = (data: createAproposParams) => {
    const editMatch = this.checkEdit();
    const id = this.props.details.data._id;

    if (editMatch) {
      this.props.edit.call({
        id: id,
        data,
      });
    }
  };
  create = (data: createAproposParams) => {
    this.props.create.call(data);
  };

  searchRequest = (search: string) => {
    this.search = search;
    this.getList({ search });
  };

  getList = (params: ListAproposParams = {}) => {
    this.props.list.call({ perPage: PER_PAGE, ...params });
  };

  handlePageChange = (page: number) => {
    const params: ListAproposParams = { page };
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
      pathname: `/apropos/edit/${id}`,
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
      console.log(this.props.details);
      if (this.props.details && this.props.details.data) {
        return (
          <AproposForm
            onSubmitHandler={this.edit}
            data={this.props.details.data}
            buttonName="Modifier"
          />
        );
      }
    } else {
      return (
        <AproposForm onSubmitHandler={this.create} buttonName="Enregistrer" />
      );
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
            {this.props.list.error || 'Aucune apropos ...'}
          </p>
        )}
        <FullModal
          open={!!this.checkEdit()}
          handleClose={this.closeModal}
          title="Modifier apropos"
          maxWidth="lg">
          <div className={classes.center}>{this.renderModalContent()}</div>
        </FullModal>
        <FullModal
          open={this.state.open}
          handleClose={this.handleClose}
          title="Créer apropos"
          maxWidth="lg">
          <div className={classes.center}>{this.renderModalContent()}</div>
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
  create: CreateApropos,
  list: listApropos,
  details: getApropos,
  edit: patchApropos,
  delete: deleteApropos,
})(AproposContainer);