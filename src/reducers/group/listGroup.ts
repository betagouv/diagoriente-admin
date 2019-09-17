import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { ListGroup } from 'reducers';

const INITIAL_STATE: ListGroup = Map({
  fetching: false,
  error: '',
  groups: { data:[] },
});

const { Types, Creators } = createActions({
  listGroupRequest: ['payload'],
  listGroupSuccess: ['groups'],
  listGroupFailure: ['error'],
});

const listGroupRequest = (state: ListGroup) =>
  state.merge({ fetching: true });

const listGroupSuccess = (state: ListGroup, { groups }: AnyAction) =>
  state.merge({ groups, fetching: false });

const listGroupFailure = (state: ListGroup, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const listGroupTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_GROUP_REQUEST]: listGroupRequest,
  [Types.LIST_GROUP_SUCCESS]: listGroupSuccess,
  [Types.LIST_GROUP_FAILURE]: listGroupFailure,
});
