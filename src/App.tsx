import * as React from 'react';
import ReactDOM from 'react-dom/server';
import * as L from 'leaflet';

// Styles
import 'leaflet/dist/leaflet.css';
import './App.scss';
import { getAllCountries } from './api/countries';
import { Country } from './types';
import CountryDetails from './components/CountryDetails';
import CountryList from './components/CountryList';
import { removeDuplicates, style } from './utils';
import geoJSON from './geo.json';
import { Layer } from 'leaflet';

const gjsonMarker: any = geoJSON;

const options: L.MapOptions = {
   center: L.latLng(40.731253, -73.996139),
   zoom: 5,
   minZoom: 3,
   maxZoom: 12,
   maxBounds: [
      [-90, -Infinity],
      [90, Infinity],
   ],
   maxBoundsViscosity: 1.0,
   worldCopyJump: true,
   closePopupOnClick: true,
   layers: [
      L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
         // tileSize: 512,
         // zoomOffset: -1,
         minZoom: 3,
         maxZoom: 12,
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
         // noWrap: true,
         // crossOrigin: true
      }),
   ],
};

const markersLayer = new L.LayerGroup();

const App: React.FC = (): React.JSX.Element => {
   const myMap = React.useRef<L.Map>();
   const popUp = React.useRef<L.Popup>();
   const [countries, setCountries] = React.useState<Country[]>([]);

   const addMarker = React.useCallback((array: Country[]) => {
      array.forEach(country => {
         const marker = L.marker(country.latlng)
            .addTo(myMap.current!)
            .setIcon(
               L.icon({
                  iconSize: [36, 22],
                  // iconAnchor: [0, 0],
                  iconUrl: country.flags.png,
               }),
            )
            .on('click', e => markerOnClick(country));

         // NOTE: We add the markers to the layers
         markersLayer.addLayer(marker);
      });
   }, []);

   React.useEffect(() => {
      // initialize the map on the "map" div with a given center and zoom
      myMap.current = L.map('map', options)
         .locate({
            setView: true,
            maxZoom: 8,
         })
         .once('locationfound', event => {
            // NOTE: We add the markersLayer to the map here. This way, the layer is only added once.
            markersLayer.addTo(event.target);

            getAllCountries().then(countries => {
               addMarker(countries);

               L.geoJson(gjsonMarker, {
                  style,
                  onEachFeature(feature: any, layer: Layer) {
                     layer.on('click', event => {
                        console.log(event.target.feature.properties.formal_en);

                        const country = countries.find(country => {
                           console.log(country.name.official);
                           return country.name.official === event.target.feature.properties.formal_en;
                        });
                        markerOnClick(country!);
                     });
                  },
               }).addTo(myMap.current!);

               setCountries(countries);
            });
         });

      return () => {
         myMap.current!.remove();
      };
   }, [addMarker]);

   const onSelectRegion = (region: string) => {
      // NOTE: The first thing we do here is clear the markers from the layer.
      markersLayer.clearLayers();

      getAllCountries(region).then(countries => {
         addMarker(countries);
      });
   };

   function markerOnClick(country: Country) {
      markersLayer.closeTooltip();

      popUp.current = L.popup({
         minWidth: 320,
         closeButton: false,
         closeOnClick: true,
         offset: L.point(1, -2),
      })
         .setLatLng(country.latlng)
         .setContent(ReactDOM.renderToStaticMarkup(<CountryDetails details={country} />))
         .addTo(myMap.current!);
      // NOTE: Change view position by latlng
      myMap.current!.setView(country.latlng);
   }

   return (
      <div className='wrapper'>
         <CountryList
            countries={countries}
            markerOnClick={country => {
               myMap.current!.setView(country.latlng, 8);
               myMap.current!.closePopup(popUp.current);
            }}
         />

         <div className='map-container'>
            <div id='map'>
               <select className='list-regions' onChange={e => onSelectRegion(e.target.value)}>
                  <option value='all'>All</option>
                  {removeDuplicates(countries).map((region, index) => (
                     <option key={`fb-${index}`} value={`region/${region}`}>
                        {region}
                     </option>
                  ))}
               </select>
            </div>
         </div>
      </div>
   );
};

export default App;
