import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  selectVisibleCountries,
  selectCountryListInfo,
} from '../store/countries/countrySelectors';
import { loadCountries } from '../store/countries/countryActions';
import { selectRegion, selectSearch } from '../store/controls/controlSelectors';

import { Controls } from '../components/Controls';
import { List } from '../components/List';
import { Card } from '../components/Card';

export const HomePage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const search = useSelector(selectSearch);
  const region = useSelector(selectRegion);

  const countries = useSelector((state) =>
    selectVisibleCountries(state, { search, region })
  );
  const { status, error, quantity } = useSelector(selectCountryListInfo);

  useEffect(() => {
    if (!quantity) {
      dispatch(loadCountries());
    }
    // eslint-disable-next-line
  }, [quantity]);

  return (
    <>
      <Controls />
      {error && <h2>Can not fetch data...</h2>}
      {status === 'loading' && <h2>Loading...</h2>}
      {status === 'recieved' && (
        <List>
          {countries.map((country) => {
            const countryInfo = {
              img: country.flags.png,
              name: country.name.common,
              info: [
                {
                  title: 'Population',
                  description: country.population.toLocaleString(),
                },
                {
                  title: 'Region',
                  description: country.region,
                },
                {
                  title: 'Capital',
                  description: country.capital[0],
                },
              ],
            };
            return (
              <Card
                key={country.name.common}
                {...countryInfo}
                onClick={() => {
                  navigate(`/country/${country.name.common}`);
                }}
              ></Card>
            );
          })}
        </List>
      )}
    </>
  );
};
