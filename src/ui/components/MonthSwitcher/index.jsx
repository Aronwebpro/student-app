import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

//Utils
import { capitalizeString } from '../../../utils';

//Antd
import Icon from 'antd/lib/icon';

//Styles
import './month-switcher.css';

const styles = {
    button: {
        fontSize: '40px',
        cursor: 'pointer',
    }
};

export default class MonthSwitcher extends React.Component {
    render() {
        const {
            month,
            handleLeftClick,
            handleRightClick,
        } = this.props;
        const nextMonth  = capitalizeString(moment(month).add(1, 'month').format('MMMM'));
        const prevMonth = capitalizeString(moment(month).subtract(1, 'month').format('MMMM'));

        const monthString = `${prevMonth} - ${nextMonth}`;
        return (
            <div className='month-switcher-container'>
                <div onClick={handleLeftClick} className='button-left-container'>
                    <Icon style={styles.button} type="caret-left"/>
                </div>
                <div>
                    {monthString}
                </div>
                <div onClick={handleRightClick} className='button-right-container'>
                    <Icon style={styles.button} type="caret-right"/>
                </div>
            </div>
        )
    }
}

MonthSwitcher.propTypes = {
    week: PropTypes.shape({
        firstDayString: PropTypes.string.isRequired,
        lastDayString: PropTypes.string.isRequired,
        firstDayOfWeek: PropTypes.string.isRequired,
        weekNumber: PropTypes.string.isRequired,
        weekObj: PropTypes.object.isRequired,
    }),
    handleLeftClick: PropTypes.func.isRequired,
    handleRightClick: PropTypes.func.isRequired,
};