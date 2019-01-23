import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//Styles
import './lessonCard.css';

//Utils
import { formatToDateString } from '../../../utils'

//Components
import UserView from '../UserView';

export default class LessonCard extends Component {

    render() {
        const {
            date,
            grade,
            lessonId,
            disciplineName,
            heartRate,
            coachNote,
            coachAvatar,
            coachName
        } = this.props;

        return (
            <div className="topic">
                <Link to={`/lesson/${lessonId}`}>
                    <div className="row-left">
                        <div className="topic-category">
                            <div className="grade-wrapper" id='star-shape'>
                                <h2> {grade} </h2>
                            </div>

                            <p>Pamokos Pažymys</p>
                        </div>
                    </div>
                    <div className="row-middle">
                        <div className="topic-title-wrapper topic-title">
                            <div className="fl_l title-left">
                                <h3>{disciplineName}</h3>
                                <p>
                                    <span className="theme-color_txt">Data:</span>
                                    <span className="created-time">{`${formatToDateString(date)}`}</span>
                                </p>
                            </div>
                            <div className="fl_l title-right">
                                <table style={{ borderLeft: '1px solid #ededde' }}>
                                    <tbody>
                                    <tr>
                                        <th className="theme-color_txt">Dienos Širdies Ritmas:</th>
                                        <th style={{ fontWeight: '600', fontSize: '1.1em' }}>{heartRate}</th>
                                        {/*<th rowSpan="2" style={{ borderLeft: '1px solid #ededde' }}>*/}
                                        {/*/!*<UserView {...lastUser} {...{ lastReply }} type={'last'}/>*!/*/}
                                        {/*</th>*/}
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="fl_c"></div>
                        </div>
                        <div className="topic-description">
                            <p>{coachNote}</p>
                        </div>
                        <div className="topic-readmore theme-color_txt">
                            <p>Plačiau</p>
                        </div>
                    </div>
                    <div className="row-right">
                        <UserView
                            userName={coachName}
                            userAvatar={coachAvatar}
                            coach={true}
                        />

                    </div>

                </Link>
                <div className="fl_c"/>
            </div>
        );
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        //Setup Flag to know is component Unmounted
        this.isUnmounted = true;
    }

}

LessonCard.propTypes = {
    date: PropTypes.string.isRequired,
    grade: PropTypes.string.isRequired,
    lessonId: PropTypes.string.isRequired,
    disciplineName: PropTypes.string.isRequired,
    heartRate: PropTypes.string.isRequired,
    coachNote: PropTypes.string.isRequired,
    coachAvatar: PropTypes.string.isRequired,
    coachName: PropTypes.string.isRequired,
};