import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { GetContext } from 'reducers';

const INITIAL_STATE: GetContext = Map({
  fetching: false,
  error: '',
  context: {},
});

const { Types, Creators } = createActions({
  getContextRequest: ['payload'],
  getContextSuccess: ['context'],
  getContextFailure: ['error'],
});

const getContextRequest = () => INITIAL_STATE.merge({ fetching: true });

const getContextSuccess = (state: GetContext, { context }: AnyAction) =>
  state.merge({ context, fetching: false });

const getContextFailure = (state: GetContext, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const getContextTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_CONTEXT_REQUEST]: getContextRequest,
  [Types.GET_CONTEXT_SUCCESS]: getContextSuccess,
  [Types.GET_CONTEXT_FAILURE]: getContextFailure,
});
