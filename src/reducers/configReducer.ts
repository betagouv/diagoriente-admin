import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { createActions, createReducer } from 'reduxsauce';
import { ConfigState } from 'reducers';

import { DEFAULT_LOCALE } from '../config/intl';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  languageChange: ['language'],
});

export const configTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE: ConfigState = Map({
  language: DEFAULT_LOCALE,
});

/* ------------- Reducers ------------- */

const languageChange = (state: ConfigState, { language }: AnyAction) =>
  state.merge({ language });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer<ConfigState>(INITIAL_STATE, {
  [Types.LANGUAGE_CHANGE]: languageChange,
});
