import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { GetGroup } from 'reducers';

const INITIAL_STATE: GetGroup = Map({
  fetching: false,
  error: '',
  group: {},
});

const { Types, Creators } = createActions({
  getGroupRequest: ['payload'],
  getGroupSuccess: ['group'],
  getGroupFailure: ['error'],
});

const getGroupRequest = () => INITIAL_STATE.merge({ fetching: true });

const getGroupSuccess = (state: GetGroup, { group }: AnyAction) =>
  state.merge({ group, fetching: false });

const getGroupFailure = (state: GetGroup, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const getGroupTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_GROUP_REQUEST]: getGroupRequest,
  [Types.GET_GROUP_SUCCESS]: getGroupSuccess,
  [Types.GET_GROUP_FAILURE]: getGroupFailure,
});
