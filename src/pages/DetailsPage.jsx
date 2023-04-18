import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  loadCountryByName,
  clearDetails,
} from '../store/details/detailActions';
import { selectAllDetails } from '../store/details/detailSelectors';

import { IoArrowBack } from 'react-icons/io5';
import { Button } from '../components/Button';
import { Info } from '../components/Info';

export const DetailsPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { status, error, currentCountry } = useSelector(selectAllDetails);

  useEffect(() => {
    dispatch(loadCountryByName(name));
    return () => dispatch(clearDetails());
    // eslint-disable-next-line
  }, [name]);

  const countryInfo = () => ({
    name: currentCountry?.name.common || '',

    nativeNames: currentCountry?.name?.nativeName
      ? Object.keys(currentCountry?.name?.nativeName).map((key) => [
          key,
          currentCountry?.name?.nativeName[key]?.common,
        ])
      : [],

    flag: currentCountry?.flags.png || currentCountry?.flags.svg || '',

    flagDescription: currentCountry?.flags.alt || '',

    capital: currentCountry?.capital ? currentCountry?.capital[0] : '',

    population: currentCountry?.population.toLocaleString() || '',

    region: currentCountry?.region || '',

    subregion: currentCountry?.subregion || '',

    topLevelDomains: currentCountry?.tld || '',

    currencies: currentCountry?.currencies
      ? Object.keys(currentCountry?.currencies).map((key) => [
          key,
          currentCountry?.currencies[key].name,
        ])
      : [],

    languages: currentCountry?.languages
      ? Object.keys(currentCountry?.languages).map((key) => [
          key,
          currentCountry?.languages[key],
        ])
      : [],

    borders: currentCountry?.borders || [],
  });

  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {currentCountry && <Info {...countryInfo()} />}
    </div>
  );
};
