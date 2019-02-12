export default function changeNewCommentModalState(state) {
    return {
        type: 'CHANGE_NEW_COMMENT_MODAL_STATE',
        payload: {
            visible: state,
        }
    };
}