import { SET_THEME } from './themeActions';

export const themeReducer = (state = 'light', action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_THEME:
      return payload;
    default:
      return state;
  }
};
