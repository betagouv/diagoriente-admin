import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { LoginStateAdvisor } from 'reducers';
import { AnyAction } from 'redux';

const INITIAL_STATE: LoginStateAdvisor = Map({
  token: null,
  error: null,
  fetching: false,
  connected: false,
  email: '',
  password: '',
  role: '',
  _id: '',
});
const { Types, Creators } = createActions({
  loginAdvisorRequest: ['email', 'password'],
  loginAdvisorSuccess: ['token', 'role', '_id'],
  loginAdvisorFailure: ['error'],
  logout: [],
});

const loginAdvisorRequest = (
  state: LoginStateAdvisor,
  { email, password }: AnyAction,
): LoginStateAdvisor => state.merge({ email, password, fetching: true });

const loginAdvisorFailure = (
  state: LoginStateAdvisor,
  { error }: AnyAction,
): LoginStateAdvisor =>
  state.merge({
    ...state,
    error,
    response: error,
    fetching: false,
  });
const logout = (state: LoginStateAdvisor): LoginStateAdvisor => INITIAL_STATE;

const loginAdvisorSuccess = (
  state: LoginStateAdvisor,
  { token, role, _id }: AnyAction,
): LoginStateAdvisor =>
  state.merge({
    ...state,
    token,
    role,
    _id,
    fetching: false,
    connected: true,
    error: false,
  });

export const loginAdvisorTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_ADVISOR_REQUEST]: loginAdvisorRequest,
  [Types.LOGIN_ADVISOR_SUCCESS]: loginAdvisorSuccess,
  [Types.LOGIN_ADVISOR_FAILURE]: loginAdvisorFailure,
  [Types.LOGOUT]: logout,
});
