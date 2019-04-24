import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { ListAdvisors } from 'reducers';

const INITIAL_STATE: ListAdvisors = Map({
  fetching: false,
  error: '',
  advisors: { data: [] },
});

const { Types, Creators } = createActions({
  listAdvisorsRequest: ['payload'],
  listAdvisorsSuccess: ['advisors'],
  listAdvisorsFailure: ['error'],
});

const listAdvisorsRequest = (state: ListAdvisors) =>
  state.merge({ fetching: true, error: '' });

const listAdvisorsSuccess = (state: ListAdvisors, { advisors }: AnyAction) => {
  return state.merge({ advisors, fetching: false });
};

const listAdvisorsFailure = (state: ListAdvisors, { error }: AnyAction) => {
  return state.merge({ error, fetching: false });
};

export const listAdvisorsTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_ADVISORS_REQUEST]: listAdvisorsRequest,
  [Types.LIST_ADVISORS_SUCCESS]: listAdvisorsSuccess,
  [Types.LIST_ADVISORS_FAILURE]: listAdvisorsFailure,
});
