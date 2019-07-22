import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { CreateContext } from 'reducers';

const INITIAL_STATE: CreateContext = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  createContextRequest: ['payload'],
  createContextSuccess: [],
  createContextFailure: ['error'],
});

const createContextRequest = () => INITIAL_STATE.merge({ fetching: true });

const createContextSuccess = (state: CreateContext) =>
  state.merge({ fetching: false });

const createContextFailure = (state: CreateContext, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const createContextTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_CONTEXT_REQUEST]: createContextRequest,
  [Types.CREATE_CONTEXT_SUCCESS]: createContextSuccess,
  [Types.CREATE_CONTEXT_FAILURE]: createContextFailure,
});
