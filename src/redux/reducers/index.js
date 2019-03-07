import { combineReducers } from 'redux';
import user from './user/index';
import newLessonModal from './newLessonModal';
import heartRateModal from './heartRateModal';
import newCommentModal from './newCommentModal';
import newEventModal from './newEventModal';
import heartRate from './heartRate';


export default combineReducers({
    user,
    newLessonModal,
    heartRateModal,
    newCommentModal,
    newEventModal,
    heartRate,
});
