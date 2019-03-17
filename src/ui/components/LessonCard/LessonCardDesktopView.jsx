import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
            disciplineName,
            heartRate,
            coachNote,
            coachAvatar,
            coachName
        } = this.props;

        return (
            <div className='row-desktop'>
                <div className="row-left">
                    <div className="grade-wrapper">
                        <h2> {grade} </h2>
                    </div>
                    <p>Pamokos Pažymys</p>
                </div>
                <div className="row-middle">
                    <div className="row-middle-top">
                        <div className="row-middle-top-left">
                            <h3>{disciplineName}</h3>
                            <p>
                                <span className="theme-color_txt">Data: </span>
                                <span className="created-time">{`${formatToDateString(date)}`}</span>
                            </p>
                        </div>
                        <div className="row-middle-top-right">
                            <p className="theme-color_txt">Dienos Širdies Ritmas:</p>
                            <p>{heartRate}</p>
                        </div>
                    </div>
                    <div className="row-middle-bottom">
                        <p>{coachNote}</p>
                    </div>
                    <div className="card-read-more-button theme-color_txt">
                        <button>Plačiau</button>
                    </div>
                </div>
                <div className="row-right">
                    <UserView
                        userName={coachName}
                        userAvatar={coachAvatar}
                        coach={true}
                    />
                </div>
            </div>
        );
    }
}

LessonCard.propTypes = {
    date: PropTypes.number.isRequired,
    grade: PropTypes.string.isRequired,
    disciplineName: PropTypes.string.isRequired,
    heartRate: PropTypes.string.isRequired,
    coachNote: PropTypes.string.isRequired,
    coachAvatar: PropTypes.string.isRequired,
    coachName: PropTypes.string.isRequired,
};