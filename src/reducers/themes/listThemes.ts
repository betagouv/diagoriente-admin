import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { ListThemes } from 'reducers';

import { PER_PAGE } from '../../containers/ThemesContainer/ThemesContainer';

const INITIAL_THEMES = {
  data: [],
  perPage: PER_PAGE,
};

const INITIAL_STATE: ListThemes = Map({
  fetching: false,
  error: '',
  themes: INITIAL_THEMES,
});

const { Types, Creators } = createActions({
  listThemesRequest: ['payload'],
  listThemesSuccess: ['themes'],
  listThemesFailure: ['error'],
});

const listThemesRequest = (state: ListThemes) =>
  state.merge({ fetching: true, error: '' });

const listThemesSuccess = (state: ListThemes, { themes }: AnyAction) =>
  state.merge({ themes, fetching: false });

const listThemesFailure = (state: ListThemes, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const listThemesTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_THEMES_REQUEST]: listThemesRequest,
  [Types.LIST_THEMES_SUCCESS]: listThemesSuccess,
  [Types.LIST_THEMES_FAILURE]: listThemesFailure,
});
