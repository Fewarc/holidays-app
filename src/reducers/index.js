import { combineReducers  } from 'redux';
import countries from './countries.js';
import calendar from './calendar.js';

export default  combineReducers({
    countries: countries,
    calendar: calendar,
})