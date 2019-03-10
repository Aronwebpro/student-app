import React from 'react';
import ReactDOM from 'react-dom';

//Firebase
import { auth } from 'firebase/app';

//Api
import { getUser, getPendingUser } from './api/lookups';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';

//Components
import App from './App';

//Redux Action
import setUser from './redux/actions/setUser';

auth().onAuthStateChanged(async userObj => {
    if (userObj) {
        const user = await getUser(userObj.uid);
        store.dispatch(setUser(user));

        if (user) {
            ReactDOM.render(
                <Provider store={store}>
                    <App {...{ user }} />
                </Provider>,
                document.getElementById('root'));
        } else {
            const pendingUser = await getPendingUser(userObj.uid);
            if (pendingUser) {
                ReactDOM.render(
                    <Provider store={store}>
                        <App {...{ pendingUser }} />
                    </Provider>,
                    document.getElementById('root'));
            } else {
                auth().signOut();
            }
        }
    } else {
        ReactDOM.render(
            <Provider store={store}>
                <App/>
            </Provider>,
            document.getElementById('root'));
    }
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
