import { SET_LOADING, SET_ERROR, SET_COUNTRIES } from './countryActions';

const initialState = {
  status: 'idle', // loading || recieved || rejected
  error: null,
  countryList: [],
};

export const countryReducer = (state = initialState, action) => {
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

    case SET_COUNTRIES:
      return {
        ...state,
        status: 'recieved',
        error: null,
        countryList: payload,
      };

    default:
      return state;
  }
};
