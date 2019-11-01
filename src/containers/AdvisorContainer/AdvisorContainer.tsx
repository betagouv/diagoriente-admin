import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import moment from 'moment';
import { Iadvisor, ListAdvisorsParams, DeleteAdvisorParams, GetAdvisorParams, CreateAdvisorParams, PatchAdvisorParams } from 'requests';
// redux and material styles
import { ReduxState } from 'reducers';
import { RouteComponentProps, matchPath } from 'react-router-dom';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Location } from 'history';
// actions
import listAdvisorsActions from '../../reducers/Advisor/listAdvisors';
import getAdvisorActions from '../../reducers/Advisor/getAdvisor';
import deleteAdvisorActions from '../../reducers/Advisor/deleteAdvisor';
import createAdvisorActions from '../../reducers/Advisor/createAdvisor';
import patchAdvisorActions from '../../reducers/Advisor/patchAdvisor';
// components
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '../../component/Table/Tables';
import ConfirmModal from '../../component/ConfirmModal/ConfirmModal';
import FullModal from '../../component/fullScreenModal/fullModal';
import AdvisorForm, { AdvisorFormComponent } from '../../component/Forms/AdvisorForm';
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
    progress: {
      height: 100,
    },
  });

interface StyleProps extends WithStyles<typeof styles> {
  classes: {
    fill: string;
    center: string;
    absolute: string;
    progress: string;
  };
}
export const PER_PAGE = 5;

interface MapToProps {
  fetching: boolean;
  advisors: Iadvisor[];
  deleteFetching: boolean;
  deleteError: string;
  getAdvisorFetching: boolean;
  advisor: Iadvisor;
  getAdvisorError: string;
  patchAdvisorFetching: boolean;
  patchAdvisorError: string;
  createAdvisorFetching: boolean;
  createAdvisorError: string;

  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;

  role: any;
  id: string;
}

interface DispatchToProps {
  ListAdvisors: (payload: ListAdvisorsParams) => void;
  deleteAdvisor: (payload: DeleteAdvisorParams) => void;
  getAdvisor: (payload: GetAdvisorParams) => void;
  createAdvisor: (payload: CreateAdvisorParams) => void;
  patchAdvisor: (payload: PatchAdvisorParams) => void;
}
interface State {
  currentSelectedId: string;
  openConfirm: boolean;
  search: string;
}

type Props = MapToProps & DispatchToProps & RouteComponentProps & StyleProps;

class AdvisorContainer extends Component<Props> {
  state = {
    currentSelectedId: '',
    openConfirm: false,
    open: false,
  };

  headers = [
    { id: 'firstName', title: 'Prénom' },
    {
      id: 'lastName',
      title: 'Nom',
    },
    {
      id: 'institution',
      title: 'Institution',
    },
    {
      id: 'pseudo',
      title: 'Pseudo',
    },
    { id: 'email', title: 'Email', render: (row: string) => row || '--' },
  ];

  search: string = '';

  advisorForm: AdvisorFormComponent | null = null;

  componentDidMount() {
    const { page } = decodeUri(this.props.location.search);
    this.getListAdvisors({ page, role: 'advisor' });
  }
  componentDidUpdate = (props: Props) => {
    if (!this.props.deleteFetching && props.deleteFetching && !this.props.deleteError) {
      this.getListAdvisors({ role: 'advisor' });
    }
    const edit = this.isEdit(this.props.location);
    if (edit && !this.isEdit(props.location)) {
      this.props.getAdvisor({ id: (edit.params as any).id });
    }

    if (!this.props.patchAdvisorFetching && props.patchAdvisorFetching && !this.props.patchAdvisorError) {
      this.getListAdvisors({ role: 'advisor' });
      this.props.history.push({
        pathname: '/advisor',
        search: this.props.location.search,
      });
    }

    if (!this.props.createAdvisorFetching && props.createAdvisorFetching && !this.props.createAdvisorError) {
      this.search = '';
      this.getListAdvisors({ page: 0 });
      this.setState({ open: false });
    }
  };

  isEdit = (location: Location<any>) =>
    matchPath(location.pathname, {
      path: '/advisor/:id',
      exact: true,
    });

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
      pathname: `/advisor/${id}`,
      search: this.props.location.search,
    });
  };

  closeEditModal = () => {
    this.props.history.push({
      pathname: '/advisor',
      search: this.props.location.search,
    });
  };

  delete = (id: string) => {
    this.props.deleteAdvisor({ id });
  };

  edit = (params: { password?: string; pseudo: string; firstName: string; lastName: string; institution: string; OldPassword?: string }) => {
    const id = this.props.advisor._id;
    const node = this.advisorForm;
    if (node) {
      const password = node.state.password;
      if (password.length === 0) {
      }
    }
    this.props.patchAdvisor({ id, ...params });
  };

  create = (params: CreateAdvisorParams) => {
    this.props.createAdvisor(params);
  };

  openModalDelete = (id: string) => {
    this.setState({ openConfirm: true, currentSelectedId: id });
  };

  YesDelete = (id: string) => {
    this.props.deleteAdvisor({ id: this.state.currentSelectedId });
    this.setState({ openConfirm: false });
  };

  NoDelete = () => {
    this.setState({ openConfirm: false });
  };

  handleSearch = (value: string) => {
    this.search = value;
    this.getListAdvisors({ role: 'advisor' });
  };

  resetUsers = () => {
    this.search = '';
    this.getListAdvisors({ role: 'advisor' });
  };
  handlePageChange = (page: number) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: encodeUri({ page }),
    });
    this.getListAdvisors({
      page,
      role: 'advisor',
    });
  };

  getListAdvisors = (params: ListAdvisorsParams = {}) => {
    if (this.props.role === 'admin') {
      this.props.ListAdvisors({
        search: this.search,
        page: this.props.currentPage,
        perPage: PER_PAGE,
        role: 'advisor',
        ...params,
      });
    } else {
      this.props.getAdvisor({
        id: this.props.id,
      });
    }
  };
  renderModalContent = () => {
    if (this.props.getAdvisorFetching) {
      return <CircularProgress className={this.props.classes.progress} />;
    }
    return (
      <AdvisorForm
        submitText={'Modifier Conseiller'}
        onSubmitHandler={this.edit}
        buttonName="Modifier Conseiller"
        firstName={this.props.advisor.profile.firstName}
        lastName={this.props.advisor.profile.lastName}
        pseudo={this.props.advisor.profile.pseudo}
        institution={this.props.advisor.profile.institution}
        email={this.props.advisor.email}
        editPass={this.props.role === 'admin' ? false : true}
        checked
      />
    );
  };

  role = this.props.role === 'admin';

  render(): JSX.Element {
    const { advisor } = this.props;
    return (
      <>
        {this.props.fetching && (
          <div className={`${this.props.classes.absolute} ${this.props.classes.center}`}>
            <CircularProgress />
          </div>
        )}

        <Table
          headers={this.headers}
          rows={
            this.role
              ? this.props.advisors.map((advisor) => ({
                  ...advisor,
                  ...advisor.profile,
                }))
              : [advisor].map((el) => ({
                  ...el,
                  ...el.profile,
                }))
          }
          delete={this.openModalDelete}
          hasEdit={true}
          hasAdd={this.role ? true : false}
          search={this.handleSearch}
          reset={this.resetUsers}
          rowsPerPage={this.props.perPage}
          totalPages={this.role ? this.props.totalPages : 1}
          currentPage={this.role ? this.props.currentPage : 1}
          count={this.role ? this.props.count : 1}
          handlePageChange={this.handlePageChange}
          edit={this.openEditModal}
          add={this.openCreateModal}
          advisor
          typeSearch={this.role ? true : false}
          typeButton={this.role ? true : false}
          hasDelete={this.role ? true : false}
        />
        <button id="feedback-form">Feedback</button>
        <FullModal open={!!this.isEdit(this.props.location)} handleClose={this.closeEditModal} title="Modifier Conseiller">
          <div className={`${this.props.classes.fill} ${this.props.classes.center}`}>{this.renderModalContent()}</div>
        </FullModal>
        <FullModal open={this.state.open} handleClose={this.handleClose} title="Créer Conseiller">
          <AdvisorForm onSubmitHandler={this.create} buttonName="Créer Conseiller" editPass={false} create={true} />
        </FullModal>

        <ConfirmModal open={this.state.openConfirm} YesButton={this.YesDelete} NoButton={this.NoDelete} close={this.NoDelete} />
      </>
    );
  }
}

function mapStateToProps(state: ReduxState): MapToProps {
  const listAdvisors = state.advisor.get('listAdvisors');
  const deleteAdvisor = state.advisor.get('deleteAdvisor');
  const getAdvisor = state.advisor.get('getAdvisor');
  const patchAdvisor = state.advisor.get('patchAdvisor');
  const createAdvisor = state.advisor.get('createAdvisor');

  return {
    fetching: listAdvisors.get('fetching'),
    advisors: listAdvisors.get('advisors').data,
    deleteFetching: deleteAdvisor.get('fetching'),
    deleteError: deleteAdvisor.get('error'),
    getAdvisorFetching: getAdvisor.get('fetching'),
    advisor: getAdvisor.get('advisor'),
    getAdvisorError: getAdvisor.get('error'),
    patchAdvisorFetching: patchAdvisor.get('fetching'),
    patchAdvisorError: patchAdvisor.get('error'),
    createAdvisorFetching: createAdvisor.get('fetching'),
    createAdvisorError: createAdvisor.get('error'),

    count: listAdvisors.get('advisors').count,
    currentPage: listAdvisors.get('advisors').currentPage,
    perPage: listAdvisors.get('advisors').perPage,
    totalPages: listAdvisors.get('advisors').totalPages,

    role: state.login.get('role'),
    id: state.login.get('_id'),
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): DispatchToProps {
  return {
    ListAdvisors: (payload) => dispatch(listAdvisorsActions.listAdvisorsRequest(payload)),
    deleteAdvisor: (payload) => dispatch(deleteAdvisorActions.deleteAdvisorRequest(payload)),
    getAdvisor: (payload) => dispatch(getAdvisorActions.getAdvisorRequest(payload)),
    createAdvisor: (payload) => dispatch(createAdvisorActions.createAdvisorRequest(payload)),
    patchAdvisor: (payload) => dispatch(patchAdvisorActions.patchAdvisorRequest(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(AdvisorContainer));
