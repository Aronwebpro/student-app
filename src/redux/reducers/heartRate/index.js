const initialState = {
    heartRate: null,
};
//Heart Rate Value Reducer
export default function heartRateReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ HEART_RATE_VALUE' :
            return action.payload;
        default :
            return state;
    }
}