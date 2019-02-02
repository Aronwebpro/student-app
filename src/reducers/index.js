import { combineReducers } from 'redux';
import user from './user';
import newLessonModal from './newLessonModal';
import heartRateModal from './heartRateModal';

export default combineReducers({
    user,
    newLessonModal,
    heartRateModal,
});
