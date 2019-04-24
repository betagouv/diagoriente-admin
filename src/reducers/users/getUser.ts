import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { GetUser } from 'reducers';

const INITIAL_STATE: GetUser = Map({
  fetching: false,
  error: '',
  User: {},
});

const { Types, Creators } = createActions({
  getUserRequest: ['payload'],
  getUserSuccess: ['User'],
  getUserFailure: ['error'],
});

const getUserRequest = () => INITIAL_STATE.merge({ fetching: true });

const getUserSuccess = (state: GetUser, { User }: AnyAction) => {
  state.merge({ User, fetching: false });
};

const getUserFailure = (state: GetUser, { error }: AnyAction) => {
  state.merge({ error, fetching: false });
};

export const getUserTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_USER_REQUEST]: getUserRequest,
  [Types.GET_USER_SUCCESS]: getUserSuccess,
  [Types.GET_USER_FAILURE]: getUserFailure,
});
