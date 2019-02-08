import React from 'react';
import moment from 'moment';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineMarkSeries,
} from 'react-vis';
//Api
import { getHeartRatesForMonth } from '../../../api/lookups';

//Utils
import { changeMonthFromEngToLt } from '../../../utils';

//Components
import WeekSwitcher from '../../components/WeekSwitcher';
import Spinner from "../../components/Spinner";

//Styles
import './heart-rate.css';

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
        const monthString = changeMonthFromEngToLt(moment().format('MMM'));
        return (
            <div className='heart-rate-page-container'>
                <div className="forum-header">
                    <div className="forum-title">
                        <h2>{`${monthString} Mėnesio Širdies Ritmas`}</h2>
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
                        <div className='chart-container'>
                            {lineData ? (
                                <div className='sign-up-user-info-wrapper'>
                                    <XYPlot height={500} width={500} xDomain={[0, 31]} yDomain={[50, 80]}>
                                        <XAxis tickInterval={1}/>
                                        <YAxis tickInterval={5}/>
                                        <VerticalGridLines/>
                                        <HorizontalGridLines/>
                                        <LineMarkSeries
                                            data={lineData}
                                            color={'rgb(106, 185, 213)'}
                                            //style={{ strokeLineJoin: "round", strokeWidth: 5, mark: { stroke: 'white' } }}
                                        />
                                    </XYPlot>
                                </div>
                            ) : (
                                <Spinner/>
                            )}
                        </div>
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

    };

    handleClickWeekLeft = () => {

    };

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