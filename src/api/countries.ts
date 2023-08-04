import axios from './index';
import { Country } from '../types';
import { filterByRegion, sortByName } from '../utils';

export const getAllCountries = async (filter: string = 'all') => {
   try {
      const response = await axios.get<Country[]>(filter);
      const data = await response.data;
      return sortByName(filterByRegion(data));
   } catch (err) {
      throw err;
   }
};
