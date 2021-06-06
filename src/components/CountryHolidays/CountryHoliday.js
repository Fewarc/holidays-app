import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { getHolidays } from '../../actions/calendar.js';
import CountryCard from '../Main/CountryCard/CountryCard.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import './CountryHoliday.scss';

function CountryHoliday({ match }) {
    const dispatch = useDispatch();
    const cachedCalendar = useSelector( (state) => state.calendar );
    const cachedCountries = useSelector( (state) => state.countries );
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

    const [calendarData, setCalendarData] = useState({
        country: match.params.alpha2,
        year: new Date().getFullYear() - 1,
        month: new Date().getMonth() + 1
    });

    const country = cachedCountries.find( (country) => {
        if (country.alpha2Code === calendarData.country)
            return true;
    });

    useEffect(() => {
        if (cachedCalendar.country !== match.params.alpha2 || cachedCalendar.country === '') {
            console.log('sent holiday request');
            dispatch(getHolidays(calendarData.country, calendarData.year));
        }
    }, []);

    useEffect(() => {
        console.log(cachedCalendar);
    }, [cachedCalendar]);

    const updateYear = (val) => {
        if (calendarData.year + val <= new Date().getFullYear() - 1) {
            setCalendarData({ ...calendarData, year: calendarData.year + val });
        } 
    }

    const updateMonth = (val) => {
        if (calendarData.month + val > 12) {

        }else {
            if(calendarData.month + val < 1) {

            } else {

            }
        }
    }

    return (
    <div>
        <Container maxWidth="md">
            <CountryCard country={country} updateFavs={() => {}} alterDisplay={true}/>
            <div>
                <h1>
                    <FontAwesomeIcon className="calendar-icon" icon={faCaretLeft} size="1x" onClick={() => updateYear(-1)}/>
                    {calendarData.year}
                    <FontAwesomeIcon className="calendar-icon" icon={faCaretRight} size="1x" onClick={() => updateYear(1)}/>
                </h1>
            </div>
            <div>
                <h1>
                    <FontAwesomeIcon className="calendar-icon" icon={faCaretLeft} size="1x" onClick={() => updateMonth(-1)}/>
                    {monthNames[calendarData.month - 1]}
                    <FontAwesomeIcon className="calendar-icon" icon={faCaretRight} size="1x" onClick={() => updateMonth(1)}/>
                </h1>
            </div>
        </Container>
    </div>);
};

export default CountryHoliday;