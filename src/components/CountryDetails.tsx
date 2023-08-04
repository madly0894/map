import * as React from 'react';
import { Country } from '../types';

type Props = {
   details: Country;
};

const CountryDetails: React.FC<Props> = ({ details }): React.JSX.Element => (
   <div>
      <div className='header'>
         <h3 className='title'>{details.name.official}</h3>

         <div className='flags'>
            <img src={details.coatOfArms.png} alt='' width={30} height={30} style={{ margin: '0 auto' }} />
            <img src={details.flags.png} alt='' width={50} height={30} />
         </div>
      </div>
      <ul className='list-details'>
         <li>
            Capital city: <span>{details.capital.join(', ')}</span>
         </li>
         <li>
            Native name:{' '}
            <span>
               {details.name.common} ({details.fifa}) {details.flag}
            </span>
         </li>
         <li>
            Population: <span>{details.population.toLocaleString('de-DE', { minimumFractionDigits: 0 })}</span>
         </li>
         <li>
            Continents: <span>{details.continents.join(', ')}</span>
         </li>
         <li>
            Region: <span>{details.region}</span>
         </li>
         <li>
            Sub region: <span>{details.subregion}</span>
         </li>
         <li>
            Area: <span>{details.area.toLocaleString('fi-FI')} km²</span>
         </li>
         <li className='country'>
            Alternate Maps:&nbsp;
            <div>
               <a href={details.maps.googleMaps} target='_blank'>
                  Google Maps
               </a>
               ,{' '}
               <a href={details.maps.openStreetMaps} target='_blank'>
                  Open Street Maps
               </a>
            </div>
         </li>
         <li>
            TLD: <span>{details.tld.join(', ')}</span>
         </li>
         <li>
            UN Member: <span>{details.unMember ? 'Yes' : 'No'}</span>
         </li>
         <li>
            Currencies:{' '}
            <span>
               {Object.keys(details.currencies)
                  .map(key => `${details.currencies[key].name} (${details.currencies[key].symbol})`)
                  .join(', ')}
            </span>
         </li>
         <li>
            Country code: <span>{details.idd.root + details.idd.suffixes[0]}</span>
         </li>
         <li>
            Languages: <span>{Object.values(details.languages).join(', ')}</span>
         </li>
         <li>
            Timezones: <span>{details.timezones.join(', ')}</span>
         </li>
      </ul>
   </div>
);

export default CountryDetails;
