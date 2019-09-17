import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { CreateGroup } from 'reducers';

const INITIAL_STATE: CreateGroup = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  createGroupRequest: ['payload'],
  createGroupSuccess: [],
  createGroupFailure: ['error'],
});

const createGroupRequest = () => INITIAL_STATE.merge({ fetching: true });

const createGroupSuccess = (state: CreateGroup) =>
  state.merge({ fetching: false });

const createGroupFailure = (state: CreateGroup, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const createGroupTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_GROUP_REQUEST]: createGroupRequest,
  [Types.CREATE_GROUP_SUCCESS]: createGroupSuccess,
  [Types.CREATE_GROUP_FAILURE]: createGroupFailure,
});
