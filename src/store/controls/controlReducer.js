import { SET_SEARCH, SET_REGION, CLEAR_CONTROLS } from './controlActions';

const initialState = {
  search: '',
  region: '',
};

export const controlReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SEARCH:
      return { ...state, search: payload };

    case SET_REGION:
      return { ...state, region: payload };

    case CLEAR_CONTROLS:
      return initialState;

    default:
      return state;
  }
};
