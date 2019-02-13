const initialState = {
    visible: false,
};
//New Lesson Modal Reducer
export default function newLessonModalReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_NEW_LESSON_MODAL_STATE' :
            return { ...action.payload };
        default :
            return state;
    }
}