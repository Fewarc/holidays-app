import * as api from '../api/api.js';

export const getHolidays = (country, year, languages) => async(dispatch) => {
    try {
        const { data } = await api.fetchHolidays(country, year);
        dispatch({ type: 'FETCH_HOLIDAYS', payload: data });

        const iso639_1 = data.availableFilters.language.find(e => (languages.includes(e)));

        if ( typeof iso639_1 !== 'undefined') {
            const { data } = await api.fetchHolidays(country, year, iso639_1);
            dispatch({ type: 'FETCH_TRANSLATIONS', payload: data });
        }
        
    } catch (error) {
        console.log(error);
    }
}