
export default (calendar = { country: '', year: null, data: [] }, action) => {
    switch (action.type) {
        case 'FETCH_HOLIDAYS':
            return {
                country: action.payload.query.country, 
                year: action.payload.query.year, 
                data: action.payload.holidays};
        
        default:
            return calendar;
    }
}