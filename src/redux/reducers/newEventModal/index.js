const initialState = {
    visible: false,
};

//Heart Rate Modal Reducer
export default function changeNewEventModalReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_NEW_EVENT_MODAL_STATE' :
            return { ...action.payload };
        default :
            return state;
    }
}