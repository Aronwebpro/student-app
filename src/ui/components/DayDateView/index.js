import React from 'react';
import moment from 'moment';

//Utils
import {
    changeWeekDayFromEngToLt,
    changeMonthFromEngToLt,
} from '../../../utils';

//Styles
import './day-view.css';
const styles = {
    dayNameText: {
        fontSize: 25,
        textAlign: 'center'
    },
    monthDayText: {
        fontSize: 25,
        textAlign: 'center'
    },
    dayNumberText: {
        fontSize: 65,
        textAlign: 'center'
    }
};

export default class DayDateView extends React.PureComponent {
    render() {
        const day = moment().format('DD');
        const weekDay = changeWeekDayFromEngToLt(moment().format('ddd'));
        const month = changeMonthFromEngToLt(moment().format('MMM'));
        return (
            <div className='day-date-view-container'>
                <div className='section-header day-date-view-title-container'>
                    <h2>
                        Šiandien
                    </h2>
                </div>
                <h2 style={styles.monthDayText}>
                    {month}
                </h2>
                <h1 style={styles.dayNumberText}>
                    {day}
                </h1>
                <h2 style={styles.dayNameText}>
                    {weekDay}
                </h2>
            </div>
        )
    }
}

