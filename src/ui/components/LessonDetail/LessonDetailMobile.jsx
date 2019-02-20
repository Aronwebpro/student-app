import React from 'react';
import PropTypes from 'prop-types';

//Utils
import {
    formatToDateString,
    formatToTimeString,
} from '../../../utils';

//Components
import UserView from '../UserView';
import Spinner from '../Spinner';

//Styles
import './lesson-detail.css';

export default class LessonDetailMobile extends React.PureComponent {
    render() {
        const {
            date,
            grade,
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
            <div className="full-post post-details-container mobile">
                <div className="post">
                    <div className='row-top'>
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
                        <div className="author-info">
                            <UserView {...user}/>
                        </div>
                    </div>
                    <div className='post-middle-title'>
                        <h3 className='bold'>
                            Mokytojo Komentaras:
                        </h3>
                    </div>
                    <div className="post-text">
                        <p>{coachNote}</p>
                    </div>
                </div>
            </div>
        )
    }
}

LessonDetailMobile.propTypes = {
    postId: PropTypes.string,
    created: PropTypes.number,
    category: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    postUser: PropTypes.object,
};