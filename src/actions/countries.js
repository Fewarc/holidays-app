import * as api from '../api/api.js';

export const getCountries = () => async(dispatch) => {
    try {
        const { data } = await api.fetchCountries();    
        dispatch({ type: 'FETCH_COUNTRIES', payload: data }); // get countries list
    } catch (error) {
        console.log(error.messsage);
    }
}

export const updateCachedCountries = (countries) => async(dispatch) => {
    try {
        dispatch({ type: 'UPDATE_COUNTRIES', payload: countries }); // update existing countries
    } catch (error) {
        console.log(error);
    }
}