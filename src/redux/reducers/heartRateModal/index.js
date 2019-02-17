const initialState = {
    visible: false,
};

//Heart Rate Modal Reducer
export default function heartRateModalReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_HEART_RATE_MODAL_STATE' :
            return { ...action.payload };
        default :
            return state;
    }
}