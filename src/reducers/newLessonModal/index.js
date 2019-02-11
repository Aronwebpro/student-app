export default function newLessonModalReducer(state = false, action) {
    switch (action.type) {
        case 'CHANGE_MODAL_STATE' :
            return action.payload;
        default :
            return state;
    }
}