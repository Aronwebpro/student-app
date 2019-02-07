import React from 'react';

//Api
import { getHeartRatesForMonth } from '../../../api/lookups';

//Utils
import { changeMonthFromEngToLt } from '../../../utils';
//Styles
import './heart-rate.css';
import WeekSwitcher from '../../components/WeekSwitcher';
import moment from 'moment';


export default class HeartRate extends React.Component {
    state = {
        week: {
            firstDayString: '',
            lastDayString: '',
            firstDayOfWeek: '',
            weekNumber: '',
            weekObj: {},
        },
        lineData: null,
    };

    render() {
        const { week, lineData } = this.state;
        return (
            <div className='heart-rate-page-container'>
                <div className="forum-header">
                    <div className="forum-title">
                        <h2>Mėnesio Širdies Ritmas</h2>
                    </div>
                    <div className="week-switcher">
                        <WeekSwitcher
                            week={week}
                            handleRightClick={this.handleClickWeekRight}
                            handleLeftClick={this.handleClickWeekLeft}
                        />
                    </div>
                </div>
                <div className='section'>
                    <div className='sign-up-user-info-container'>
                        <div className='sign-up-user-info-wrapper'>
                            <h4>Vartotojo vardas</h4>
                        </div>
                        {lineData && (
                            <div className='sign-up-user-info-wrapper'>
                                {/*TODO: Add Chart*/}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        const week = this.currentWeek();
        this.setState({ week });

        this.getScreenData();
    }

    getScreenData = async () => {
        const month = moment().format('YYYY-MM');

        const lineData = await getHeartRatesForMonth(month);
        this.setState({ lineData });
    };

    handleClickWeekRight = () => {

    }

    handleClickWeekLeft = () => {

    }

    //Generate current week Object with Moment JS
    currentWeek = (date) => {
        const startOfWeek = moment(date).startOf('isoWeek');
        const endOfWeek = moment(date).endOf('isoWeek');
        return {
            firstDayString: startOfWeek.format('YYYY-MM-DD'),
            lastDayString: endOfWeek.format('YYYY-MM-DD'),
            weekNumber: startOfWeek.format('YYYY-Wo'),
            firstDayOfWeek: startOfWeek.format('YYYY-MM-DD'),
            weekObj: moment(date ? date : startOfWeek),
        };
    };
}