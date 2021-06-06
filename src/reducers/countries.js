
export default (countries = [], action) => {
    switch (action.type) {
        case 'FETCH_COUNTRIES':
            return action.payload.map(country => ({ ...country, fav: false }));
        
        case 'UPDATE_COUNTRIES':
            return action.payload;

        default:
            return countries;
    }
}