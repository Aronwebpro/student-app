import React from 'react';
import PropTypes from 'prop-types';

//Utils
import { formatToDateString } from '../../../utils'

//Styles
import './lessonCard.css';

export default class LessonCard extends React.PureComponent {
    render() {
        const {
            date,
            grade,
            disciplineName,
            heartRate,
            coachNote,
        } = this.props;

        return (
            <div className="row-mobile">
                <div className="row-middle-mobile">
                    <div className="row-middle-top">
                        <div className='grade-container'>
                            <div className="grade-wrapper">
                                <h2> {grade} </h2>
                                <p>Pažymys</p>
                            </div>
                        </div>
                        <div className="row-middle-top-left">
                            <h3>{disciplineName}</h3>
                            <p>
                                <span className="theme-color_txt">Data: </span>
                                <span className="created-time">{`${formatToDateString(date)}`}</span>
                            </p>
                        </div>
                        <div className="row-middle-top-right">
                            <p className="theme-color_txt">Dienos Širdies Ritmas:</p>
                            <p className='heart-rate-text'>{heartRate}</p>
                        </div>
                    </div>
                </div>
                <div className="row-middle-bottom">
                    <p>{coachNote}</p>
                </div>
                <div className="card-read-more-button-mobile">
                    <button className='btn theme-color_txt'>Plačiau</button>
                </div>
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