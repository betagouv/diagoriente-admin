import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { ListActivities } from 'reducers';

const INITIAL_STATE: ListActivities = Map({
  fetching: false,
  error: '',
  activities: { data: [] },
});

const { Types, Creators } = createActions({
  listActivitiesRequest: ['payload'],
  listActivitiesSuccess: ['activities'],
  listActivitiesFailure: ['error'],
});

const listActivitiesRequest = (state: ListActivities) =>
  state.merge({ fetching: true, error: '' });

const listActivitiesSuccess = (
  state: ListActivities,
  { activities }: AnyAction,
) => state.merge({ activities, fetching: false });

const listActivitiesFailure = (state: ListActivities, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const listActivitiesTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_ACTIVITIES_REQUEST]: listActivitiesRequest,
  [Types.LIST_ACTIVITIES_SUCCESS]: listActivitiesSuccess,
  [Types.LIST_ACTIVITIES_FAILURE]: listActivitiesFailure,
});
