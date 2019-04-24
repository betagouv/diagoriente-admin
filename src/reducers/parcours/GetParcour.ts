import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { getParcours } from 'reducers';

const INITIAL_STATE: getParcours = Map({
  fetching: false,
  error: '',
  parcours: { },
});

const { Types, Creators } = createActions({
  getParcoursRequest: ['payload'],
  getParcoursSuccess: ['parcours'],
  getParcoursFailure: ['error'],
});

const getParcoursRequest = (state: getParcours) =>
  state.merge({ fetching: true, error: '' });

const getParcoursSuccess = (state: getParcours, { parcours }: AnyAction) => {
  return state.merge({ parcours, fetching: false });
};

const getParcoursFailure = (state: getParcours, { error }: AnyAction) => {
  return state.merge({ error, fetching: false });
};

export const getParcoursTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PARCOURS_REQUEST]: getParcoursRequest,
  [Types.GET_PARCOURS_SUCCESS]: getParcoursSuccess,
  [Types.GET_PARCOURS_FAILURE]: getParcoursFailure,
});
