import React from 'react';
import PropTypes from 'prop-types';

//Utils
import {
    formatToDateString,
    formatToTimeString,
} from "../../../utils";

//Components
import UserView from '../UserView';
import Spinner from '../Spinner';

//Styles
import './lesson-detail.css';

export default class LessonDetail extends React.PureComponent {
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

        const dateString = formatToDateString(date);
        const timeString = formatToTimeString(date);
        const user = {
            userName: coachName,
            userAvatar: coachAvatar,
            coach: true,
        };
        return (
            <div className='lesson-detail-container'>
                <div className="post-title forum-header">
                    <h2>
                        Disciplina: <span className="theme-color_txt">{disciplineName}</span>
                    </h2>
                </div>
                {lessonId ? (
                    <div className="full-post post-details-container">
                        <div className="post">
                            <div className="post-info">
                                <div>
                                    <h2 className='bold'>
                                        Dienos Širdies Ritmas:
                                        <span className="theme-color_txt">{` ${heartRate}`}</span>
                                    </h2>
                                </div>
                                <div>
                                    <h2>
                                        Data: {` ${dateString}`}
                                    </h2>
                                    <h2>
                                        Laikas: {` ${timeString}`}
                                    </h2>
                                </div>
                                <div>
                                    <h2 className="bold">
                                        <span>Pažymys: </span>
                                        {
                                            grade &&
                                            (<span className="lesson-detail-grade theme-color_txt">{` #${grade}`}</span>)
                                        }
                                    </h2>
                                </div>
                            </div>
                            <h3>
                                Komentaras:
                            </h3>
                            <div className="post-text">
                                <p>{coachNote}</p>
                            </div>
                        </div>
                        <div className="author-info">
                            <UserView {...user}/>
                        </div>
                        <div className="fl_c"/>
                    </div>
                ) : (
                    <div className="full-post post-details-container">
                        <Spinner/>
                    </div>
                )}
            </div>
        )
    }
}

LessonDetail.propTypes = {
    postId: PropTypes.string,
    created: PropTypes.number,
    category: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    postUser: PropTypes.object,
};