import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/lt';

//Styles
import './schedule.css';
import '../../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';

//Big Calendar Localizer
const localizer = BigCalendar.momentLocalizer(moment);

export default class Schedule extends React.Component {
    render() {
        return (
            <div className='schedule-page-container'>
                <div className="forum-header">
                    <div className="forum-title">
                        <h2>Tvarkaraštis</h2>
                    </div>
                </div>
                <div className='schedule-page-calendar-container'>
                    <BigCalendar
                        culture='lt'
                        localizer={localizer}
                        events={[]}
                        startAccessor="start"
                        endAccessor="end"
                        messages={{
                            next: "Pirmyn",
                            previous: "Atagal",
                            today: "Šiandiena",
                            month: "Mėnesis",
                            week: "Savaitė",
                            day: "Diena",
                            agenda: "Dienotvarkė"
                        }}
                    />
                </div>
            </div>
        )
    }
}