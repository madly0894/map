type Flags = {
   png: string;
   svg: string;
};

export type Country = {
   latlng: [number, number];
   flags: Flags;
   area: number;
   population: number;
   region: string;
   subregion: string;
   unMember: boolean;
   maps: {
      googleMaps: string;
      openStreetMaps: string;
   };
   fifa: string;
   flag: string;
   timezones: number[];
   currencies: {
      [key: string]: {
         name: string;
         symbol: string;
      };
   };
   tld: string[];
   name: {
      common: string;
      official: string;
      nativeName?: {
         [key: string]: {
            common: string;
            official: string;
         };
      };
   };
   continents: string[];
   capital: string[];
   languages: Record<string, string>;
   coatOfArms: Flags;
   idd: {
      root: string;
      suffixes: number[];
   };
};
