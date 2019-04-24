import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { PatchSecteur } from 'reducers';

const INITIAL_STATE: PatchSecteur = Map({
  fetching: false,
  error: '',
});

const { Types, Creators } = createActions({
  patchSecteurRequest: ['payload'],
  patchSecteurSuccess: [],
  patchSecteurFailure: ['error'],
});

const patchSecteurRequest = () => INITIAL_STATE.merge({ fetching: true });

const patchSecteurSuccess = (state: PatchSecteur) =>
  state.merge({ fetching: false });

const patchSecteurFailure = (state: PatchSecteur, { error }: AnyAction) =>
  state.merge({
    error,
    fetching: false,
  });

export const patchSecteurTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PATCH_SECTEUR_REQUEST]: patchSecteurRequest,
  [Types.PATCH_SECTEUR_SUCCESS]: patchSecteurSuccess,
  [Types.PATCH_SECTEUR_FAILURE]: patchSecteurFailure,
});
