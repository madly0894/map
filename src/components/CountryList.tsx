import * as React from 'react';
import { Country } from '../types';

type Props = {
   countries: Country[];
   markerOnClick: (value: Country) => void;
};

const CountryList: React.FC<Props> = ({ countries, markerOnClick }): React.JSX.Element => (
   <div className='list-countries'>
      <div className='header'>
         <h3>List of countries</h3>
      </div>

      {countries.map((country, index) => (
         <button key={`fb-${index}`} onClick={() => markerOnClick(country)}>
            {country.name.common}
         </button>
      ))}
   </div>
);

export default CountryList;
