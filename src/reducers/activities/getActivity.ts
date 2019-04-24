import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { GetActivity } from 'reducers';

const INITIAL_STATE: GetActivity = Map({
  fetching: false,
  error: '',
  activity: {},
});

const { Types, Creators } = createActions({
  getActivityRequest: ['payload'],
  getActivitySuccess: ['activity'],
  getActivityFailure: ['error'],
});

const getActivityRequest = () => INITIAL_STATE.merge({ fetching: true });

const getActivitySuccess = (state: GetActivity, { activity }: AnyAction) =>
  state.merge({ activity, fetching: false });

const getActivityFailure = (state: GetActivity, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const getActivityTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_ACTIVITY_REQUEST]: getActivityRequest,
  [Types.GET_ACTIVITY_SUCCESS]: getActivitySuccess,
  [Types.GET_ACTIVITY_FAILURE]: getActivityFailure,
});
