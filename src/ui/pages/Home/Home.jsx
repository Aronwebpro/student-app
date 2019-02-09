import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

//Api
import { getLessons } from '../../../api/lookups';

//Components
import Spinner from '../../components/Spinner';
import WeekSwitcher from '../../components/WeekSwitcher';
import DayLessons from '../../components/DayLessons';
import NewLessonModal from '../../components/NewLessonModal';
import HeartRateModal from "../../components/HeartRateModal";

export default class Home extends React.Component {
    state = {
        lessons: {},
        redirect: false,
        hideLoadBtn: true,
        empty: false,
        week: {
            firstDayString: '',
            lastDayString: '',
            firstDayOfWeek: '',
            weekNumber: '',
            weekObj: {},
        },
    };

    render() {
        const { lessons, postsLoading, week } = this.state;
        const { sideBarButtonState, sideBarButtonActions } = this.props;
        if (this.state.redirect) return <Redirect to="/"/>;
        const empty = Object.keys(lessons).length === 0;
        return (
            <div className="forum-container">
                {sideBarButtonState.newLessonModalVisible && (
                    <NewLessonModal
                        visible={sideBarButtonState.newLessonModalVisible}
                        hideModal={sideBarButtonActions.handleNewLessonModal}
                        refreshData={this.getScreenData}
                    />
                )}
                {sideBarButtonState.heartRateModalVisible && (
                    <HeartRateModal
                        visible={sideBarButtonState.heartRateModalVisible}
                        hideModal={sideBarButtonActions.handleHeartRateModal}
                        refreshData={sideBarButtonActions.generateHeartRateData}
                    />
                )}
                <div className="forum">
                    <div className="forum-header">
                        <div className="forum-title">
                            <h2>Savaites Pamokos</h2>
                        </div>
                        <div className="week-switcher">
                            <WeekSwitcher
                                week={week}
                                handleRightClick={this.handleClickWeekRight}
                                handleLeftClick={this.handleClickWeekLeft}
                            />
                        </div>
                    </div>
                    <div className="forum-content">
                        <div className="forum-content-inner">
                            {
                                !postsLoading ? (
                                    <div>
                                        {!empty ? Object.keys(lessons).map(day => {
                                            if (lessons[day].length > 0) {
                                                return (
                                                    <DayLessons title={day} data={lessons[day]} key={day}/>
                                                )
                                            } else {
                                                return null;
                                            }
                                        }) : (
                                            <div style={{ textAlign: 'center', fontSize: '2em' }}>
                                                Šią Savaitę Pamokų Įvestų Nėra
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <Spinner/>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="load-more-wrapper">
                    {!this.state.hideLoadBtn && (
                        <button className="btn" onClick={this.handleLoadMoreClick}>Load More</button>)}
                </div>
            </div>
        )
    }

    async componentDidMount() {
        if (window) {
            window.scrollTo(0, 0);
        }
        const week = this.currentWeek();
        this.setState({ week })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.week.firstDayOfWeek !== this.state.week.firstDayOfWeek) {
            window.scrollTo(0, 0);
            await this.getScreenData();
        }
    }

    componentWillUnmount() {
        this.isUnmount = true;
    }

    //Retrieve Topics and categories from DB
    getScreenData = async () => {
        if (!this.isUnmount) {
            this.setState({ postsLoading: true });
        }
        const firstDayOfWeek = this.state.week.firstDayOfWeek || moment().startOf('isoWeek').format('YYYY-MM-DD');
        const lessons = await getLessons(firstDayOfWeek);
        if (!this.isUnmount) {
            this.setState({ lessons, postsLoading: false });
        }

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

    //Update Week Object after week switch
    handleClickWeekRight = () => this.setState({ week: this.currentWeek(this.state.week.weekObj.add(1, 'week')) });

    //Update Week Object after week switch
    handleClickWeekLeft = () => this.setState({ week: this.currentWeek(this.state.week.weekObj.subtract(1, 'week')) });

}

Home.propTypes = {
    user: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        authorName: PropTypes.string.isRequired,
        authorAvatar: PropTypes.string.isRequired,
    }.isRequired),
    params: PropTypes.object
};
