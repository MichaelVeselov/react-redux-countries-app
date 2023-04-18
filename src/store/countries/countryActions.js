import { orderBy } from 'lodash';

export const SET_COUNTRIES = '@@country/SET_COUNTRIES';
export const SET_LOADING = '@@country/SET_LOADING';
export const SET_ERROR = '@@country/SET_ERROR';

export const setCountries = (countries) => {
  const sortedCountries = orderBy(countries, ['name.common'], ['asc']);

  return {
    type: SET_COUNTRIES,
    payload: sortedCountries,
  };
};

export const setLoading = () => ({
  type: SET_LOADING,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const loadCountries = () => (dispatch, getState, extra) => {
  const { client, api } = extra;

  dispatch(setLoading());

  client
    .get(api.ALL_COUNTRIES)
    .then((response) => {
      const { data } = response;
      dispatch(setCountries(data));
    })
    .catch((error) => dispatch(setError(error.message)));
};
