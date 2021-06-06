import * as api from '../api/api.js';

export const getHolidays = (country, year) => async(dispatch) => {
    try {
        const { data } = await api.fetchHolidays(country, year);
        console.log(data);
        dispatch({ type: 'FETCH_HOLIDAYS', payload: data });
    } catch (error) {
        console.log(error.messsage);
    }
}