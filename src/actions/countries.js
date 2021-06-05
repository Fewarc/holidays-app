import * as api from '../api/api.js';

export const getCountries = () => async(dispatch) => {
    try {
        const { data } = await api.fetchCountries();
        dispatch({ type: 'FETCH_HOLIDAYS', payload: data });
    } catch (error) {
        console.log(error.messsage);
    }
}