import React, { useEffect } from 'react';
import { fetchHolidays } from '../../api/api';

function CountryHoliday({ match }) {
    
    useEffect(() => {
        fetchHolidays(match.params.alpha2, new Date().getFullYear())
        .then(res => {
            console.log(res);
        });
    }, []);

    return (
    <div>
        XD
    </div>);
};

export default CountryHoliday;