export default function changeHeartRateModalState(state) {
    return {
        type: 'CHANGE_HEART_RATE_MODAL_STATE',
        payload: {
            visible: state,
        }
    };
}