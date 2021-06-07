import axios from 'axios';

const countriesURL = 'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;alpha3Code;flag';
const holidaysURL = 'https://api.getfestivo.com/v2/holidays?api_key=8f2f78c8b69cd110f1b8241902dba837';

export const fetchCountries = () => axios.get(countriesURL);
export const fetchHolidays = (country, year, language) => axios.get(holidaysURL + `&country=${country}&year=${year}&language=${language}`);