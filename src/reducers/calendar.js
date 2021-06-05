
export default (calendar = [], action) => {
    switch (action.type) {
        case 'FETCH_HOLIDAYS':
            return action.payload.holidays;
        
        default:
            return calendar;
    }
}