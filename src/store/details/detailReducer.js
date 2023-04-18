import {
  SET_LOADING,
  SET_ERROR,
  SET_COUNTRY,
  CLEAR_DETAILS,
  SET_NEIGHBORS,
} from './detailActions';

const initialState = {
  currentCountry: null,
  status: 'idle', // loading || recieved || rejected
  error: null,
  neighbors: [],
};

export const detailReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return { ...state, status: 'loading', error: null };

    case SET_ERROR:
      return {
        ...state,
        status: 'rejected',
        error: payload,
      };

    case SET_COUNTRY:
      return {
        ...state,
        status: 'recieved',
        error: null,
        currentCountry: payload,
      };

    case SET_NEIGHBORS:
      return {
        ...state,
        status: 'recieved',
        error: null,
        neighbors: payload,
      };

    case CLEAR_DETAILS:
      return initialState;

    default:
      return state;
  }
};
