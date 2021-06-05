
export default (countries = [], action) => {
    switch (action.type) {
        case 'FETCH_COUNTRIES':
            return action.payload.map(country => ({ ...country, fav: false }));
        
        default:
            return countries;
    }
}