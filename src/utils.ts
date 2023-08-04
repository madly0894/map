import { Country } from './types';

export const sortByName = (array: Country[]) => {
   return [...array].sort((a, b) => a.name.common.localeCompare(b.name.common));
};

export const filterByRegion = (array: Country[]) => {
   return array.filter(item => item.region !== 'Antarctic');
};

export const getRegions = (array: Country[]) => {
   return array.map(item => item.region);
};

export const removeDuplicates = (array: Country[]) => {
   return [...new Set(getRegions(array))];
};

const getColor = (d: number) => {
   return d > 17
      ? '#800026'
      : d > 16
      ? '#BD0026'
      : d > 15
      ? '#E31A1C'
      : d > 14
      ? '#FC4E2A'
      : d > 12
      ? '#FD8D3C'
      : d > 11
      ? '#FEB24C'
      : d > 8
      ? '#FED976'
      : '#FFEDA0';
};

export const style = (feature: any) => {
   return {
      fillColor: getColor(feature.properties.pop_rank),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
   };
};
