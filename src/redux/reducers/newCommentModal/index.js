const initialState = {
    visible: false,
};

//Heart Rate Modal Reducer
export default function newCommentModalReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_NEW_COMMENT_MODAL_STATE' :
            return { ...action.payload };
        default :
            return state;
    }
}