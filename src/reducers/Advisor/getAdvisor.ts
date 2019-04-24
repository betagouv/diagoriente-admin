import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { GetAdvisor } from 'reducers';

const INITIAL_STATE: GetAdvisor = Map({
  fetching: false,
  error: '',
  advisor: { profile: {} },
});

const { Types, Creators } = createActions({
  getAdvisorRequest: ['payload'],
  getAdvisorSuccess: ['advisor'],
  getAdvisorFailure: ['error'],
});

const getAdvisorRequest = () => INITIAL_STATE.merge({ fetching: true });

const getAdvisorSuccess = (state: GetAdvisor, { advisor }: AnyAction) =>
  state.merge({ advisor, fetching: false });

const getAdvisorFailure = (state: GetAdvisor, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const getAdvisorTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_ADVISOR_REQUEST]: getAdvisorRequest,
  [Types.GET_ADVISOR_SUCCESS]: getAdvisorSuccess,
  [Types.GET_ADVISOR_FAILURE]: getAdvisorFailure,
});
