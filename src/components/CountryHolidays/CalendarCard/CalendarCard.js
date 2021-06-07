import { Card } from '@material-ui/core';
import React from 'react';

function CalendarCard(props) {
    
    return (
        <Card className="calendar-card" variant="outlined" style={props.day.monthDay === -1 ? {visibility: "hidden"} : {}}>
            <div>
                <h1>{props.day.monthDay}</h1>
            </div>
        </Card>
    );
};

export default CalendarCard;