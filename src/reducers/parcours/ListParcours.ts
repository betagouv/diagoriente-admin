import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { listParcours } from 'reducers';

const INITIAL_STATE: listParcours = Map({
  fetching: false,
  error: '',
  parcours: { data: [] },
});

const { Types, Creators } = createActions({
  listParcoursRequest: ['payload'],
  listParcoursSuccess: ['parcours'],
  listParcoursFailure: ['error'],
});

const listParcoursRequest = (state: listParcours) =>
  state.merge({ fetching: true, error: '' });

const listParcoursSuccess = (state: listParcours, { parcours }: AnyAction) => {
  return state.merge({ parcours, fetching: false });
};

const listParcoursFailure = (state: listParcours, { error }: AnyAction) => {
  return state.merge({ error, fetching: false });
};

export const listParcoursTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_PARCOURS_REQUEST]: listParcoursRequest,
  [Types.LIST_PARCOURS_SUCCESS]: listParcoursSuccess,
  [Types.LIST_PARCOURS_FAILURE]: listParcoursFailure,
});
