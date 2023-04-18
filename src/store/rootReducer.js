import { combineReducers } from 'redux';

import { themeReducer } from './theme/themeReducer';
import { countryReducer } from './countries/countryReducer';
import { controlReducer } from './controls/controlReducer';
import { detailReducer } from './details/detailReducer';

export const rootReducer = combineReducers({
  theme: themeReducer,
  countries: countryReducer,
  controls: controlReducer,
  details: detailReducer,
});
