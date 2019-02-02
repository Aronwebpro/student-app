export default function newLessonModalReducer(state = false, action) {
    switch (action.type) {
        case 'OPEN_MODAL' :
            return action.payload;
        case 'CLOSE_MODAL' :
            return action.payload;
        default :
            return state;
    }
}