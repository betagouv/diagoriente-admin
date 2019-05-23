import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import moment from 'moment';
import {
  IUser,
  listUsersParams,
  DeleteUserParams,
  GetUserParams,
} from 'requests';
import { isArray } from 'lodash';
import { ReduxState } from 'reducers';
import { RouteComponentProps } from 'react-router-dom';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

import listUserActions from '../../reducers/users/listUsers';
import getUserActions from '../../reducers/users/getUser';
import deleteUserActions from '../../reducers/users/deleteUsers';

import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '../../component/Table/Tables';
import ConfirmModal from '../../component/ConfirmModal/ConfirmModal';

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
export const PER_PAGE = 5;

interface MapToProps {
  fetching: boolean;
  users: IUser[];
  deleteFetching: boolean;
  deleteError: string;
  getUserFetching: boolean;
  User: IUser;
  getUserError: string;
  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
}

interface DispatchToProps {
  getListUsers: (payload: listUsersParams) => void;
  deleteUser: (payload: DeleteUserParams) => void;
  getUser: (payload: GetUserParams) => void;
}
interface State {
  currentSelectedId: string;
  openConfirm: boolean;
  search: string;
}

type Props = MapToProps & DispatchToProps & RouteComponentProps & StyleProps;

const customRender = (row: string): string => row || '--';

class UsersContainer extends Component<Props> {
  state = {
    currentSelectedId: '',
    openConfirm: false,
  };

  headers = [
    {
      id: 'profile',
      title: 'Nom et prénom',
      render: (profile: any) => `${profile.firstName}  ${profile.lastName}`,
    },
    {
      id: 'profile',
      title: 'SNU',
      render: (profile: any) => profile.institution,
    },
    {
      id: 'role',
      title: 'Role',
    },
    {
      id: 'email',
      title: 'Email',
      render: (row: string) => row || '--',
    },
    {
      id: 'createdAt',
      title: 'Date de creation',
      render: (row: string) => moment(row).format('DD/MM/YYYY, HH:mm:ss'),
    },
    { id: 'platform', title: 'Device' },
  ];

  search: string = '';

  componentDidMount() {
    const { page } = decodeUri(this.props.location.search);
    this.getListUsers({ page });
  }
  componentDidUpdate = (props: Props) => {
    if (
      !this.props.deleteFetching &&
      props.deleteFetching &&
      !this.props.deleteError
    ) {
      this.getListUsers();
    }
  }

  openModalDelete = (id: string) => {
    this.setState({ openConfirm: true, currentSelectedId: id });
  }

  YesDelete = (id: string) => {
    this.props.deleteUser({ id: this.state.currentSelectedId });
    this.setState({ openConfirm: false });
  }

  NoDelete = () => {
    this.setState({ openConfirm: false });
  }

  handleSearch = (value: string) => {
    this.search = value;
    this.getListUsers();
  }

  handleValue(value: any): any {
    if (typeof value !== 'object' || value === null) {
      return value;
    }
    if (isArray(value)) {
      return value.map(item => this.handleValue(item));
    }
    return { ...this.deepObject(value) };
  }

  deepObject(obj: any) {
    let result: any = {};

    const keys = Object.keys(obj);

    keys.forEach(key => {
      const value = this.handleValue(obj[key]);
      if (typeof value !== 'object' || value === null) {
        result[key] = value;
      } else {
        result = { ...result, ...this.deepObject(obj[key]) };
      }
    });
    return result;
  }

  resetUsers = () => {
    this.search = '';
    this.getListUsers();
  }
  handlePageChange = (page: number) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: encodeUri({ page }),
    });
    this.getListUsers({
      page,
    });
  }

  getListUsers = (params: listUsersParams = {}) => {
    this.props.getListUsers({
      search: this.search,
      page: this.props.currentPage,
      perPage: PER_PAGE,
      ...params,
    });
  }

  render(): JSX.Element {
    const users: any = this.props.users.map(item => {
      let name = '';
      let institution = '';
      if (item.profile.firstName && item.profile.lastName) {
        name = `${item.profile.firstName} ${item.profile.lastName}`;
      }
      if (item.profile.institution) {
        institution = item.profile.institution;
      }
      console.log(name);

      return { ...users, name, institution };
    });

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
          rows={this.props.users}
          delete={this.openModalDelete}
          hasEdit={false}
          hasAdd={false}
          search={this.handleSearch}
          reset={this.resetUsers}
          rowsPerPage={this.props.perPage}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          count={this.props.count}
          handlePageChange={this.handlePageChange}
          user
        />

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
  const listUsers = state.users.get('listUsers');
  const deleteUser = state.users.get('deleteUser');
  const getUser = state.users.get('getUser');
  return {
    fetching: listUsers.get('fetching'),
    users: listUsers.get('users').data,
    deleteFetching: deleteUser.get('fetching'),
    deleteError: deleteUser.get('error'),
    getUserFetching: getUser.get('fetching'),
    User: getUser.get('User'),
    getUserError: getUser.get('error'),
    count: listUsers.get('users').count,
    currentPage: listUsers.get('users').currentPage,
    perPage: listUsers.get('users').perPage,
    totalPages: listUsers.get('users').totalPages,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): DispatchToProps {
  return {
    getListUsers: payload =>
      dispatch(listUserActions.listUsersRequest(payload)),
    deleteUser: payload =>
      dispatch(deleteUserActions.deleteUserRequest(payload)),
    getUser: payload => dispatch(getUserActions.getUserRequest(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(UsersContainer));
