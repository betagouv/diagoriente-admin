import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { CreateActivity } from 'reducers';

const INITIAL_STATE: CreateActivity = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  createActivityRequest: ['payload'],
  createActivitySuccess: [],
  createActivityFailure: ['error'],
});

const createActivityRequest = () => INITIAL_STATE.merge({ fetching: true });

const createActivitySuccess = (state: CreateActivity) =>
  state.merge({ fetching: false });

const createActivityFailure = (state: CreateActivity, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const createActivityTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_ACTIVITY_REQUEST]: createActivityRequest,
  [Types.CREATE_ACTIVITY_SUCCESS]: createActivitySuccess,
  [Types.CREATE_ACTIVITY_FAILURE]: createActivityFailure,
});
