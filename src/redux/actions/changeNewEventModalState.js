export default function changeNewEventModalState(state) {
    return {
        type: 'CHANGE_NEW_EVENT_MODAL_STATE',
        payload: {
            visible: state,
        }
    };
}