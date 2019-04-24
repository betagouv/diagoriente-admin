import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { PatchAdvisor } from 'reducers';

const INITIAL_STATE: PatchAdvisor = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  patchAdvisorRequest: ['payload'],
  patchAdvisorSuccess: [],
  patchAdvisorFailure: ['error'],
});

const patchAdvisorRequest = () => INITIAL_STATE.merge({ fetching: true });

const patchAdvisorSuccess = (state: PatchAdvisor) =>
  state.merge({ fetching: false });

const patchAdvisorFailure = (state: PatchAdvisor, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const patchAdvisorTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PATCH_ADVISOR_REQUEST]: patchAdvisorRequest,
  [Types.PATCH_ADVISOR_SUCCESS]: patchAdvisorSuccess,
  [Types.PATCH_ADVISOR_FAILURE]: patchAdvisorFailure,
});
