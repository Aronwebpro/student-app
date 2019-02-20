import React from 'react';
import PropTypes from 'prop-types';

//Components
import Spinner from '../Spinner';

//Component Parts
import LessonDetailDesktop from './LessonDetailDesktop';
import LessonDetailMobile from './LessonDetailMobile';

//Styles
import './lesson-detail.css';

export default class LessonDetail extends React.PureComponent {
    render() {
        const {
            lessonId,
            disciplineName,
        } = this.props;
        return (
            <div className='lesson-detail-container'>
                <div
                    className="post-title lesson-details-header"
                    style={{margin: '0 0 5px'}}
                >
                    <h2>
                        Disciplina: <span className="theme-color_txt">{disciplineName}</span>
                    </h2>
                </div>
                {lessonId ? (
                    <div className="full-post post-details-container">
                        <LessonDetailDesktop {...this.props} />
                        <LessonDetailMobile {...this.props} />
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