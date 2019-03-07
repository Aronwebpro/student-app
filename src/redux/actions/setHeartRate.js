export default function setHeartRate(state) {
    return {
        type: 'SET_ HEART_RATE_VALUE',
        payload: {
            value: state,
        }
    };
}