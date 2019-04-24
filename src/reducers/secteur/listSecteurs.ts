import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { ListSecteurs } from 'reducers';

const INITIAL_STATE: ListSecteurs = Map({
  fetching: false,
  error: '',
  secteurs: { data: [] },
});

const { Types, Creators } = createActions({
  listSecteursRequest: ['payload'],
  listSecteursSuccess: ['secteurs'],
  listSecteursFailure: ['error'],
});

const listSecteursRequest = (state: ListSecteurs) =>
  state.merge({ fetching: true, error: '' });

const listSecteursSuccess = (state: ListSecteurs, { secteurs }: AnyAction) => {
  return state.merge({ secteurs, fetching: false });
};

const listSecteursFailure = (state: ListSecteurs, { error }: AnyAction) => {
  return state.merge({ error, fetching: false });
};

export const listSecteursTypes = Types;
export default Creators;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_SECTEURS_REQUEST]: listSecteursRequest,
  [Types.LIST_SECTEURS_SUCCESS]: listSecteursSuccess,
  [Types.LIST_SECTEURS_FAILURE]: listSecteursFailure,
});
