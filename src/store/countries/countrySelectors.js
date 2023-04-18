export const selectCountryListInfo = (state) => ({
  status: state.countries.status,
  error: state.countries.error,
  quantity: state.countries.countryList.length,
});

export const selectAllCountries = (state) => state.countries.countryList;

export const selectVisibleCountries = (state, { search = '', region = '' }) => {
  const data = state.countries.countryList;

  return data.filter(
    (country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase()) &&
      country.region.includes(region)
  );
};
