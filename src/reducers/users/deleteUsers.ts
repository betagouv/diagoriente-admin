import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { DeleteUser } from 'reducers';

const INITIAL_STATE: DeleteUser = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  deleteUserRequest: ['payload'],
  deleteUserSuccess: [],
  deleteUserFailure: ['error'],
});

const deleteUserRequest = () => INITIAL_STATE.merge({ fetching: true });

const deleteUserSuccess = (state: DeleteUser) =>
  state.merge({ fetching: false });

const deleteUserFailure = (state: DeleteUser, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const deleteUserTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_USER_REQUEST]: deleteUserRequest,
  [Types.DELETE_USER_SUCCESS]: deleteUserSuccess,
  [Types.DELETE_USER_FAILURE]: deleteUserFailure,
});
