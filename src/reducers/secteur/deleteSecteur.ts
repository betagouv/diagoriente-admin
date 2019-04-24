import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { DeleteSecteur } from 'reducers';

const INITIAL_STATE: DeleteSecteur = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  deleteSecteurRequest: ['payload'],
  deleteSecteurSuccess: [],
  deleteSecteurFailure: ['error'],
});

const deleteSecteurRequest = () => INITIAL_STATE.merge({ fetching: true });

const deleteSecteurSuccess = (state: DeleteSecteur) =>
  state.merge({ fetching: false });

const deleteSecteurFailure = (state: DeleteSecteur, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const deleteSecteurTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_SECTEUR_REQUEST]: deleteSecteurRequest,
  [Types.DELETE_SECTEUR_SUCCESS]: deleteSecteurSuccess,
  [Types.DELETE_SECTEUR_FAILURE]: deleteSecteurFailure,
});
