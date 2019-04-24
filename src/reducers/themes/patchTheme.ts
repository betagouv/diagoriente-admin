import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { PatchTheme } from 'reducers';

const INITIAL_STATE: PatchTheme = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  patchThemeRequest: ['payload'],
  patchThemeSuccess: [],
  patchThemeFailure: ['error'],
});

const patchThemeRequest = () => INITIAL_STATE.merge({ fetching: true });

const patchThemeSuccess = (state: PatchTheme) =>
  state.merge({ fetching: false });

const patchThemeFailure = (state: PatchTheme, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const patchThemeTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PATCH_THEME_REQUEST]: patchThemeRequest,
  [Types.PATCH_THEME_SUCCESS]: patchThemeSuccess,
  [Types.PATCH_THEME_FAILURE]: patchThemeFailure,
});
