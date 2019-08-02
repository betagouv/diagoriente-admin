import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { listUsers } from 'reducers';

const INITIAL_STATE: listUsers = Map({
  fetching: false,
  error: '',
  users: { data: [] }
});

const { Types, Creators } = createActions({
  listUsersRequest: ['payload'],
  listUsersSuccess: ['users'],
  listUsersFailure: ['error']
});

const listUsersRequest = (state: listUsers) =>
  state.merge({ fetching: true, error: '' });

const listUsersSuccess = (state: listUsers, { users }: AnyAction) => {
  return state.merge({ users, fetching: false });
};

const listUsersFailure = (state: listUsers, { error }: AnyAction) => {
  return state.merge({ error, fetching: false });
};

export const listUserTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_USERS_REQUEST]: listUsersRequest,
  [Types.LIST_USERS_SUCCESS]: listUsersSuccess,
  [Types.LIST_USERS_FAILURE]: listUsersFailure
});
