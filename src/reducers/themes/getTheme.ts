import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { GetTheme } from 'reducers';

const INITIAL_STATE: GetTheme = Map({
  fetching: false,
  error: '',
  theme: {},
});

const { Types, Creators } = createActions({
  getThemeRequest: ['payload'],
  getThemeSuccess: ['theme'],
  getThemeFailure: ['error'],
});

const getThemeRequest = () => INITIAL_STATE.merge({ fetching: true });

const getThemeSuccess = (state: GetTheme, { theme }: AnyAction) =>
  state.merge({ theme, fetching: false });

const getThemeFailure = (state: GetTheme, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const getThemeTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_THEME_REQUEST]: getThemeRequest,
  [Types.GET_THEME_SUCCESS]: getThemeSuccess,
  [Types.GET_THEME_FAILURE]: getThemeFailure,
});
