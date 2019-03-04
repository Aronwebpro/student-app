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
import MonthSwitcher from '../../components/MonthSwitcher';
import Spinner from "../../components/Spinner";

//Styles
import './heart-rate.css';

export default class HeartRate extends React.Component {
    state = {
        month: moment().format('YYYY-MM'),
        lineData: null,
        width: 768,
    };

    render() {
        const { month, lineData, width } = this.state;
        const monthString = changeMonthFromEngToLt(moment(month).format('MMM'), {});
        return (
            <div className='heart-rate-page-container'>
                <div className="forum-header">
                    <div className="forum-title">
                        <h2><span style={{fontSize: '1.5em'}}>{`${monthString} `}</span>Mėnesio Širdies Ritmas</h2>
                    </div>
                    <div className="week-switcher">
                        <MonthSwitcher
                            month={month}
                            handleRightClick={this.handleClickWeekRight}
                            handleLeftClick={this.handleClickWeekLeft}
                        />
                    </div>
                </div>
                <div className='section'>
                    <div className='sign-up-user-info-container'>
                        <div className='chart-container'>
                            {lineData ? (
                                <div className='heart-rate-page-chart-wrapper'>
                                    {lineData.length > 0 ? (
                                        <XYPlot height={500} width={width} xDomain={[0, 31]} yDomain={[50, 80]}>
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
                                    ) : (
                                        <div className='heart-rate-page-placeholder'>
                                            <h2>Šį mėnesį širdies ritmo įvesta nėra.</h2>
                                        </div>
                                    )}
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
        //Scroll Page to Top on Start
        if (window) {
            window.scrollTo(0, 0);
        }
        window.addEventListener("resize", this.setWidth);
        this.getScreenData();
        this.setWidth();


    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.month !== this.state.month) {
            this.getScreenData();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.setWidth);
    }

    getScreenData = async () => {
        this.setState({ lineData: null });
        const { month } = this.state;
        const lineData = await getHeartRatesForMonth(month);
        this.setState({ lineData });
    };

    //Update Month Object after month switch
    handleClickWeekRight = () => this.setState({ month: moment(this.state.month).add(1, 'M').format('YYYY-MM') });

    //Update Month Object after month switch
    handleClickWeekLeft = () => this.setState({ month: moment(this.state.month).subtract(1, 'M').format('YYYY-MM') });

    setWidth = () => {
        const width = window.innerWidth > 1170 ? 768 : window.innerWidth > 768 ? window.innerWidth - 220 :  window.innerWidth - 30;
        this.setState({width})
    }
}