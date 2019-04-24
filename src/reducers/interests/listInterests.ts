import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { ListInterests } from 'reducers';

const INITIAL_STATE: ListInterests = Map({
  fetching: false,
  error: '',
  interests: { data: [] },
});

const { Types, Creators } = createActions({
  listInterestsRequest: ['payload'],
  listInterestsSuccess: ['interests'],
  listInterestsFailure: ['error'],
});

const listInterestsRequest = (state: ListInterests) =>
  state.merge({ fetching: true });

const listInterestsSuccess = (state: ListInterests, { interests }: AnyAction) =>
  state.merge({ interests, fetching: false });

const listInterestsFailure = (state: ListInterests, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const listInterestsTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_INTERESTS_REQUEST]: listInterestsRequest,
  [Types.LIST_INTERESTS_SUCCESS]: listInterestsSuccess,
  [Types.LIST_INTERESTS_FAILURE]: listInterestsFailure,
});
