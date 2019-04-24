import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { DeleteActivity } from 'reducers';

const INITIAL_STATE: DeleteActivity = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  deleteActivityRequest: ['payload'],
  deleteActivitySuccess: [],
  deleteActivityFailure: ['error'],
});

const deleteActivityRequest = () => INITIAL_STATE.merge({ fetching: true });

const deleteActivitySuccess = (state: DeleteActivity) =>
  state.merge({ fetching: false });

const deleteActivityFailure = (state: DeleteActivity, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const deleteActivityTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_ACTIVITY_REQUEST]: deleteActivityRequest,
  [Types.DELETE_ACTIVITY_SUCCESS]: deleteActivitySuccess,
  [Types.DELETE_ACTIVITY_FAILURE]: deleteActivityFailure,
});
