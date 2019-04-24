import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { CreateSecteur } from 'reducers';

const INITIAL_STATE: CreateSecteur = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  createSecteurRequest: ['payload'],
  createSecteurSuccess: [],
  createSecteurFailure: ['error'],
});

const createSecteurRequest = () => INITIAL_STATE.merge({ fetching: true });

const createSecteurSuccess = (state: CreateSecteur) =>
  state.merge({ fetching: false });

const createSecteurFailure = (state: CreateSecteur, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const createSecteurTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_SECTEUR_REQUEST]: createSecteurRequest,
  [Types.CREATE_SECTEUR_SUCCESS]: createSecteurSuccess,
  [Types.CREATE_SECTEUR_FAILURE]: createSecteurFailure,
});
