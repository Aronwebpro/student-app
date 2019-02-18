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
            disciplineName,
            heartRate,
            coachNote,
            coachAvatar,
        } = this.props;

        return (
            <div className="row-mobile">
                <div className="row-left-mobile">
                    <div className="grade-wrapper">
                        <h2> {grade} </h2>
                    </div>
                    <p>Pažymys</p>
                </div>
                <div className="author-avatar">
                    <img src={coachAvatar} alt="Coach"/>
                </div>
                <div className="row-middle-mobile">
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
    date: PropTypes.number.isRequired,
    grade: PropTypes.string.isRequired,
    lessonId: PropTypes.string.isRequired,
    disciplineName: PropTypes.string.isRequired,
    heartRate: PropTypes.string.isRequired,
    coachNote: PropTypes.string.isRequired,
    coachAvatar: PropTypes.string.isRequired,
    coachName: PropTypes.string.isRequired,
};