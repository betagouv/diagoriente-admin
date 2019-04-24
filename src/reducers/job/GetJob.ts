import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { getJobs } from 'reducers';

const INITIAL_STATE: getJobs = Map({
  fetching: false,
  error: '',
  jobs: {},
});

const { Types, Creators } = createActions({
  getJobsRequest: ['payload'],
  getJobsSuccess: ['jobs'],
  getJobsFailure: ['error'],
});

const getJobsRequest = (state: getJobs) => state.merge({ fetching: true, error: '' });

const getJobsSuccess = (state: getJobs, { jobs }: AnyAction) => {
  return state.merge({ jobs, fetching: false });
};

const getJobsFailure = (state: getJobs, { error }: AnyAction) => {
  return state.merge({ error, fetching: false });
};

export const getJobsTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_JOBS_REQUEST]: getJobsRequest,
  [Types.GET_JOBS_SUCCESS]: getJobsSuccess,
  [Types.GET_JOBS_FAILURE]: getJobsFailure,
});
