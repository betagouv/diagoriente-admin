import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { CreateAdvisor } from 'reducers';

const INITIAL_STATE: CreateAdvisor = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  createAdvisorRequest: ['payload'],
  createAdvisorSuccess: [],
  createAdvisorFailure: ['error'],
});

const createAdvisorRequest = () => INITIAL_STATE.merge({ fetching: true });

const createAdvisorSuccess = (state: CreateAdvisor) =>
  state.merge({ fetching: false });

const createAdvisorFailure = (state: CreateAdvisor, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const createAdvisorTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_ADVISOR_REQUEST]: createAdvisorRequest,
  [Types.CREATE_ADVISOR_SUCCESS]: createAdvisorSuccess,
  [Types.CREATE_ADVISOR_FAILURE]: createAdvisorFailure,
});
