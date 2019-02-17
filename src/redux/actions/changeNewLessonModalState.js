export default function changeNewLessonModalState(state) {
    return {
        type: 'CHANGE_NEW_LESSON_MODAL_STATE',
        payload: {
            visible: state,
        }
    };
}