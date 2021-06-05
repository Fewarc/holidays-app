import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { getHolidays } from '../../actions/calendar.js';

function CountryHoliday({ match }) {
    const dispatch = useDispatch();
    const cahcedCalendar = useSelector( (state) => state.calendar );

    const [calendarData, setCalendarData] = useState({
        country: match.params.alpha2,
        year: new Date().getFullYear() - 1,
        month: new Date().getMonth()
    });

    useEffect(() => {
        dispatch(getHolidays(calendarData.country, calendarData.year));
    }, []);

    useEffect(() => {
        
    }, [/** TODO */])

    return (
    <div>
        <Container maxWidth="md">

        </Container>
    </div>);
};

export default CountryHoliday;