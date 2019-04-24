import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { CreateTheme } from 'reducers';

const INITIAL_STATE: CreateTheme = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  createThemeRequest: ['payload'],
  createThemeSuccess: [],
  createThemeFailure: ['error'],
});

const createThemeRequest = () => INITIAL_STATE.merge({ fetching: true });

const createThemeSuccess = (state: CreateTheme) =>
  state.merge({ fetching: false });

const createThemeFailure = (state: CreateTheme, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const createThemeTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_THEME_REQUEST]: createThemeRequest,
  [Types.CREATE_THEME_SUCCESS]: createThemeSuccess,
  [Types.CREATE_THEME_FAILURE]: createThemeFailure,
});
