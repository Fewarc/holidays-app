
export default (calendar = { country: '', year: null, data: [], translable: false }, action) => {
    switch (action.type) {
        case 'FETCH_HOLIDAYS':
            return {
                country: action.payload.query.country, 
                year: action.payload.query.year, 
                data: action.payload.holidays,
                translable: false,
            };
        
        case 'FETCH_TRANSLATIONS':
            return { ...calendar, 
                translable: true,
                data: calendar.data.map(holiday => ({ 
                    ...holiday, 
                    nativeName: action.payload.holidays.find(day => (holiday.date === day.date)).name }))
            }

        default:
            return calendar;
    }
}