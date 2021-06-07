import * as api from '../api/api.js';

export const getHolidays = (country, year) => async(dispatch) => {
    try {
        const { data } = await api.fetchHolidays(country, year);
        dispatch({ type: 'FETCH_HOLIDAYS', payload: data });
        if (data.availableFilters.language.find(e => (country.toLowerCase())) !== 'undefined') {
            const { data } = await api.fetchHolidays(country, year, country.toLowerCase());
            dispatch({ type: 'FETCH_TRANSLATIONS', payload: data });
        }
        
    } catch (error) {
        console.log(error);
    }
}