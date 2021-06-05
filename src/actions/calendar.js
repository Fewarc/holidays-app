import * as api from '../api/api.js';

export const getHolidays = (country, year) => async(dispatch) => {
    try {
        const { data } = await api.fetchHolidays();
        dispatch({ type: 'FETCH_COUNTRIES', payload: data });
    } catch (error) {
        console.log(error.messsage);
    }
}