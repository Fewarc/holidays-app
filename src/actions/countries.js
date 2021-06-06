import * as api from '../api/api.js';

export const getCountries = () => async(dispatch) => {
    try {
        const { data } = await api.fetchCountries();
        dispatch({ type: 'FETCH_COUNTRIES', payload: data });
    } catch (error) {
        console.log(error.messsage);
    }
}

export const updateCachedCountries = (countries) => async(dispatch) => {
    try {
        console.log(countries);
        dispatch({ type: 'UPDATE_COUNTRIES', payload: countries });
    } catch (error) {
        console.log(error);
    }
}