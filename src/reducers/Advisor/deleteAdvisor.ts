import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { DeleteAdvisor } from 'reducers';

const INITIAL_STATE: DeleteAdvisor = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  deleteAdvisorRequest: ['payload'],
  deleteAdvisorSuccess: [],
  deleteAdvisorFailure: ['error'],
});

const deleteAdvisorRequest = () => INITIAL_STATE.merge({ fetching: true });

const deleteAdvisorSuccess = (state: DeleteAdvisor) =>
  state.merge({ fetching: false });

const deleteAdvisorFailure = (state: DeleteAdvisor, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const deleteAdvisorTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_ADVISOR_REQUEST]: deleteAdvisorRequest,
  [Types.DELETE_ADVISOR_SUCCESS]: deleteAdvisorSuccess,
  [Types.DELETE_ADVISOR_FAILURE]: deleteAdvisorFailure,
});
