import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { GetSecteur } from 'reducers';

const INITIAL_STATE: GetSecteur = Map({
  fetching: false,
  error: '',
  secteur: { data: [] , secteur:{} },
});

const { Types, Creators } = createActions({
  getSecteurRequest: ['payload'],
  getSecteurSuccess: ['secteur'],
  getSecteurFailure: ['error'],
});

const getSecteurRequest = () => INITIAL_STATE.merge({ fetching: true });

const getSecteurSuccess = (state: GetSecteur, { secteur }: AnyAction) =>
  state.merge({ secteur, fetching: false });

const getSecteurFailure = (state: GetSecteur, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const getSecteurTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SECTEUR_REQUEST]: getSecteurRequest,
  [Types.GET_SECTEUR_SUCCESS]: getSecteurSuccess,
  [Types.GET_SECTEUR_FAILURE]: getSecteurFailure,
});
