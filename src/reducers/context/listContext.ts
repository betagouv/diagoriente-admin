import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { ListContext } from 'reducers';

const INITIAL_STATE: ListContext = Map({
  fetching: false,
  error: '',
  contexts: { data: [] },
});

const { Types, Creators } = createActions({
  listContextRequest: ['payload'],
  listContextSuccess: ['contexts'],
  listContextFailure: ['error'],
});

const listContextRequest = (state: ListContext) =>
  state.merge({ fetching: true, error: '' });

const listContextSuccess = (state: ListContext, { contexts }: AnyAction) =>
  state.merge({ contexts, fetching: false });

const listContextFailure = (state: ListContext, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const listContextTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_CONTEXT_REQUEST]: listContextRequest,
  [Types.LIST_CONTEXT_SUCCESS]: listContextSuccess,
  [Types.LIST_CONTEXT_FAILURE]: listContextFailure,
});
