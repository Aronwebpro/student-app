import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

//Utils
import { changeMonthFromEngToLt } from '../../../utils';

//Antd
import Icon from 'antd/lib/icon';

//Styles
import './week-swticher.css';

const styles = {
    button: {
        fontSize: '40px',
        cursor: 'pointer',
    }
};

export default class WeekSwitcher extends React.PureComponent {
    render() {
        const {
            week,
            handleLeftClick,
            handleRightClick
        } = this.props;
        const startDayMonth = changeMonthFromEngToLt(moment(week.firstDayString).format('MM'), {});
        const startDay = moment(week.firstDayString).format('DD');
        const endDayMonth = changeMonthFromEngToLt(moment(week.lastDayString).format('MM'), {});
        const endDay = moment(week.lastDayString).format('DD');

        const weekString = `${startDayMonth} ${startDay} - ${endDayMonth} ${endDay}`;
        return (
            <div className='week-switcher-container'>
                <div onClick={handleLeftClick} className='button-left-container'>
                    <Icon style={styles.button} type="caret-left"/>
                </div>
                <div>
                    {weekString}
                </div>
                <div onClick={handleRightClick} className='button-right-container'>
                    <Icon style={styles.button} type="caret-right"/>
                </div>
            </div>
        )
    }
}

WeekSwitcher.propTypes = {
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