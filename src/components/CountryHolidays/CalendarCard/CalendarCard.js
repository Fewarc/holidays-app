import React from 'react';

function CalendarCard(props) {
    
    var style = {background: ""};

    if (props.day.weekDay === 6 || props.day.weekDay === 5) {
        style = {backgroundColor: "rgba(243, 3, 3, 0.4)"} 
    }

    if (props.day.holiday.occurs) {
        if (props.day.holiday.data.public) {
            if (style.background !== "") {
                style = {background: "linear-gradient(225deg, rgba(243, 3, 3, 0.4) 20%, rgba(3, 167, 243, 0.4) 100%)"}
            } else {
                style = {background: "rgba(3, 167, 243, 0.4)"}
            }
        } else {
            if (!props.onlyPublic) {
                if (style.background !== "") {
                    style = {background: "linear-gradient(225deg, rgba(243, 3, 3, 0.4) 20%, rgba(147, 3, 243, 0.4) 100%)"}
                } else {
                    style = {background: "rgba(147, 3, 243, 0.4)"}
                }
            }
        }
    }

    return (
        <div className="calendar-card" style={props.day.monthDay === -1 ? {visibility: "hidden"} : style}>
            <div className="calendar-tile">
                {props.day.holiday.occurs && (props.day.holiday.data.public || !props.onlyPublic) ? <p className="holiday-name">{ props.nativeLanguage ? props.day.holiday.data.nativeName : props.day.holiday.data.name}</p> : <p></p>}
                <div className="calendar-day">
                    <h1>{props.day.monthDay}</h1>
                </div>    
            </div>
        </div> 
    );
};

export default CalendarCard;