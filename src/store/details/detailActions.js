export const SET_LOADING = '@@details/SET_LOADING';
export const SET_ERROR = '@@details/SET_ERROR';
export const SET_COUNTRY = '@@details/SET_COUNTRY';
export const CLEAR_DETAILS = '@@details/CLEAR_DETAILS';
export const SET_NEIGHBORS = '@@details/SET_NEIGHBORS';

const setLoading = () => ({
  type: SET_LOADING,
});

const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

const setCountry = (country) => ({
  type: SET_COUNTRY,
  payload: country,
});

const setNeighbors = (countries) => ({
  type: SET_NEIGHBORS,
  payload: countries,
});

export const clearDetails = () => ({
  type: CLEAR_DETAILS,
});

export const loadCountryByName = (name) => (dispatch, getState, extra) => {
  const { client, api } = extra;

  dispatch(setLoading());

  client
    .get(api.searchByCountry(name))
    .then((reesponse) => {
      const { data } = reesponse;
      dispatch(setCountry(data[0]));
    })
    .catch((error) => dispatch(setError(error.message)));
};

export const loadNeighbors = (codes) => (dispatch, getState, extra) => {
  const { client, api } = extra;

  dispatch(setLoading);

  client
    .get(api.filterByCode(codes))
    .then((response) => {
      const { data } = response;
      const neighbors = data.map((country) => country.name.common);
      dispatch(setNeighbors(neighbors));
    })
    .catch((error) => console.error(error));
};
