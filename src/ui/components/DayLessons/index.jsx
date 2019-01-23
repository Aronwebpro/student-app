import React from 'react';
import PropTypes from 'prop-types';
import { changeWeekDayFromEngToLt } from '../../../utils/index';
//Styles
import './day-lessons.css';

//Components
import Index from '../LessonCard';

export default class DayLessons extends React.PureComponent {
    render() {
        const {
            title,
            data
        } = this.props;
        return (
            <div className="day-lessons-header">
                <h5>{changeWeekDayFromEngToLt(title)}</h5>
                {data && data.length > 0 && data.map((lesson) => {
                    return (
                        <Index {...lesson} key={lesson.lessonId}/>
                    )
                })}
            </div>
        )
    }
}

DayLessons.propTypes = {
    title: PropTypes.string.isRequired,
};