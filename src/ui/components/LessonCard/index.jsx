import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//Styles
import './lessonCard.css';

//Utils
import { formatToDateString } from '../../../utils'

//Components
import UserView from '../UserView';

//View Parts
import LessonCardDesktopView from './LessonCardDesktopView';
import LessonCardMobileView from './LessonCardMobileView';

export default class LessonCard extends Component {

    render() {
        const {
            lessonId,
        } = this.props;

        return (
            <div className="card">
                <Link to={`/lesson/${lessonId}`} className="card-link">
                    <LessonCardDesktopView {...this.props} />
                    <LessonCardMobileView {...this.props}/>
                </Link>
            </div>
        );
    }
}

LessonCard.propTypes = {
    date: PropTypes.number.isRequired,
    grade: PropTypes.string.isRequired,
    lessonId: PropTypes.string.isRequired,
    disciplineName: PropTypes.string.isRequired,
    heartRate: PropTypes.string.isRequired,
    coachNote: PropTypes.string.isRequired,
    coachAvatar: PropTypes.string.isRequired,
    coachName: PropTypes.string.isRequired,
};