import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { LoginState } from 'reducers';
import { AnyAction } from 'redux';

const INITIAL_STATE: LoginState = Map({
  token: null,
  error: null,
  fetching: false,
  connected: false,
  email: '',
  password: '',
  role: '' ,
  _id:'',
});
const { Types, Creators } = createActions({
  loginRequest: ['email', 'password'],
  loginSuccess: ['token', 'role', '_id'],
  loginFailure: ['error'],
  logout: [],
});

const loginRequest = (
  state: LoginState,
  { email, password }: AnyAction,
): LoginState => state.merge({ fetching: true, email, password });

const loginFailure = (state: LoginState, { error }: AnyAction): LoginState =>
  state.merge({
    ...state,
    error,
    response: error,
    fetching: false,
  });
const logout = (state: LoginState): LoginState => INITIAL_STATE;

const loginSuccess = (state: LoginState, { token , role, _id }: AnyAction): LoginState =>
  state.merge({
    ...state,
    token,
    role,
    _id,
    fetching: false,
    connected: true,
    error: false,
  });

export const loginTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT]: logout,
});
