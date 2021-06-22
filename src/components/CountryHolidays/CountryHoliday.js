import { Switch, Container, Grid, FormControlLabel, Checkbox, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { getHolidays } from '../../actions/calendar.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import CalendarCard from './CalendarCard/CalendarCard.js';

import './CountryHoliday.scss';

function CountryHoliday({ match }) {
    const dispatch = useDispatch();
    const cachedCalendar = useSelector(state => state.calendar);
    const cachedCountries = useSelector(state => state.countries);
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const [calendarDays, setCalendarDays] = useState([]); // holds calendar days grouped as weeks
    const [calendarData, setCalendarData] = useState({ // holds calnedar Data
        country: match.params.alpha2,
        year: new Date().getFullYear() - 1,
        month: new Date().getMonth()
    });
    const [toggles, setToggles] = useState({ // toggle states
        onlyPublic: false,
        nativeLanguage: false,
        loading: true,
    });

    const country = cachedCountries.find(country => country.alpha2Code === calendarData.country); // find chosen country

    useEffect(() => {
        if ( cachedCalendar.country !== match.params.alpha2 || cachedCalendar.country === '' ) {
            setToggles({ ...toggles, loading: true });
            console.log('sent holiday request');
            dispatch(getHolidays(calendarData.country, calendarData.year, country.languages.map(c => c.iso639_1)));
        }
    }, []);

    useEffect(() => {   // once cachedClendar changes due to api response or year/month change calendar updates
        buildCalendar();
        if ( cachedCalendar.country === match.params.alpha2 && cachedCalendar.country !== '' ) {
            setToggles({ ...toggles, loading: false });
        }
    }, [cachedCalendar, calendarData.month]);

    // const updateYear = (val) => {    // handle year change                        // DISABLED*
    //     if (calendarData.year + val <= new Date().getFullYear() - 1) {
    //         setCalendarData({ ...calendarData, year: calendarData.year + val });
    //         dispatch(getHolidays(calendarData.country, calendarData.year));
    //     } 
    // }

    const updateMonth = (val) => {  // handle month change
        if (calendarData.month + val > 11) {
            if ( calendarData.year === new Date().getFullYear() - 1 ) {
                setCalendarData({ ...calendarData, month: 11 });
            } else {
                setCalendarData({ ...calendarData, year: calendarData.year + 1, month: 0 });
            }
        }else {
            if( calendarData.month + val < 0 ) {
                setCalendarData({ ...calendarData, year: calendarData.year, month: 11 }); // DISABLED*
            } else {
                setCalendarData({ ...calendarData, month: calendarData.month + val });
            }
        }
    }

    // * -> festivo api allows only past year data while using free subscription, hence the year blocked at 2020

    const buildCalendar = () => {
        const date = new Date(calendarData.year, calendarData.month, 1);
        const days = [];

        while ( date.getMonth() === calendarData.month ) {
            const curDate = new Date(date);
            days.push({ 
                weekDay: curDate.getDay() === 0 ? 6 : curDate.getDay() - 1, // make monday a first day of the week
                monthDay: curDate.getDate(),
                month: curDate.getMonth() + 1,
            });
            date.setDate(date.getDate() + 1);
        }     

        var newDays = days.map(day => ({ ...day, holiday: checkHoliday(day.month, day.monthDay) }));  // check if holiday occurs
        
        for (var i = 0; i < days[0].weekDay; i++) { // add blank days on the beginning
            newDays = [ { monthDay: -1, holiday: { occurs: false } }, ...newDays ];
        }

        for (var i = 0; i < 6 - days[days.length - 1].weekDay; i++) { // add blank days on the end
            newDays = [ ...newDays, { monthDay: -1, holiday: { occurs: false } } ];
        }
        
        var groupedDays = [];

        for (var i = 0; i < newDays.length; i++) {  // group week by week
            if (i % 7 === 0) {
                groupedDays.push([]);
            }
            groupedDays[Math.floor(i * 1/7)].push(newDays[i]);
        }
        
        setCalendarDays(groupedDays);
    }
    
    const checkHoliday = (month, day) => {
        const holiday = cachedCalendar.data.find(( element => ( new Date(element.observed).getMonth() + 1 === month) && ( new Date(element.observed).getDate() === day )));
        if ( typeof holiday === 'undefined' ) { // if holiday wasn't found on current day of current month return { occurs: false }, otherwise return { occurs: true } with holiday data
            return {
                occurs: false,
            }
        } else {
            return {
                occurs: true,
                data: holiday
            }
        }
    }
    
    return (
    <div>
        <Container maxWidth="xl">
            <img src={country.flag} className="calendar-flag"/>
            <h1>{country.name}</h1>
            <FormControlLabel
                control={<Checkbox checked={toggles.onlyPublic} onChange={() => setToggles({ ...toggles, onlyPublic: !toggles.onlyPublic })} />}
                label="Show only public holidays" 
            />    
            <FormControlLabel
                control={<Switch checked={toggles.nativeLanguage} onChange={() => setToggles({ ...toggles, nativeLanguage: !toggles.nativeLanguage })} />}
                label="Holiday name in native language"
                disabled={!cachedCalendar.translable}
            />        
            <div>
                <h1>
                    <FontAwesomeIcon className="calendar-icon" icon={faCaretLeft} size="1x" /> {/** onClick={() => updateYear(-1)} */}
                    {calendarData.year}
                    <FontAwesomeIcon className="calendar-icon" icon={faCaretRight} size="1x" /> {/** onClick={() => updateYear(1)} */}
                </h1>
            </div>
            <div>
                <h1>
                    <FontAwesomeIcon className="calendar-icon" icon={faCaretLeft} size="1x" onClick={() => updateMonth(-1)}/>
                    {monthNames[calendarData.month]}
                    <FontAwesomeIcon className="calendar-icon" icon={faCaretRight} size="1x" onClick={() => updateMonth(1)}/>
                </h1>
            </div>
            <Grid container justify="space-evenly">
                <Grid item xs={1} >
                    <div className="day-div">
                        <p>MON</p>
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <div className="day-div">
                        <p>TUE</p>
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <div className="day-div">
                        <p>WED</p>
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <div className="day-div">
                        <p>THR</p>
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <div className="day-div">
                        <p>FRI</p>
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <div className="day-div">
                        <p>SAT</p>
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <div className="day-div">
                        <p>SUN</p>
                    </div>
                </Grid>
            </Grid>
            {toggles.loading ? <CircularProgress color="secondary" /> : calendarDays.map((week, index) => (    // map every week
                <Grid key={index + week[0].weekDay} container justify="space-evenly" className="calendar-row">
                    {week.map((day, index) => ( // map every day of the week
                        <Grid key={index + day.monthDay} item xs={1}>
                            <CalendarCard day={day} onlyPublic={toggles.onlyPublic} nativeLanguage={toggles.nativeLanguage} />
                        </Grid>))}
                </Grid>))}
                <div style={{height: "50px"}/** SPACER */}></div> 
                <Grid container justify="center" spacing={3}>
                    <Grid item xs={12} lg={2}>
                        <p>
                            <svg height='15' width='50' >
                                <rect width='300' height='100' style={{fill: "rgba(243, 3, 3, 0.4)", strokeWidth: "0", stroke: "black"}}></rect>
                            </svg> weekend days
                        </p>
                    </Grid>
                    <Grid item xs={12} lg={2}>
                        <p>
                            <svg height='15' width='50' >
                                <rect width='300' height='100' style={{fill: "rgba(3, 167, 243, 0.4)", strokeWidth: "0", stroke: "black"}}></rect>
                            </svg> public holidays
                        </p>
                    </Grid>
                    <Grid item xs={12} lg={2}>
                        <p>
                            <svg height='15' width='50' >
                                <rect width='300' height='100' style={{fill: "rgba(147, 3, 243, 0.4)", strokeWidth: "0", stroke: "black"}}></rect>
                            </svg> non-public holidays
                        </p>
                    </Grid>
                </Grid>
                <div style={{height: "100px"}/** SPACER */}></div> 
        </Container>
    </div>);
};

export default CountryHoliday;