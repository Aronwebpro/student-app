export default function setUser(state) {
    return {
        type: 'SET_USER',
        payload: {
            user: state,
        }
    };
}