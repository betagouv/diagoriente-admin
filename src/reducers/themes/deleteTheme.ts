import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { DeleteTheme } from 'reducers';

const INITIAL_STATE: DeleteTheme = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  deleteThemeRequest: ['payload'],
  deleteThemeSuccess: [],
  deleteThemeFailure: ['error'],
});

const deleteThemeRequest = () => INITIAL_STATE.merge({ fetching: true });

const deleteThemeSuccess = (state: DeleteTheme) =>
  state.merge({ fetching: false });

const deleteThemeFailure = (state: DeleteTheme, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const deleteThemeTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_THEME_REQUEST]: deleteThemeRequest,
  [Types.DELETE_THEME_SUCCESS]: deleteThemeSuccess,
  [Types.DELETE_THEME_FAILURE]: deleteThemeFailure,
});
