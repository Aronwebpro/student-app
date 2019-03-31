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

//User Placeholder
import userPlaceholder from './assets/img/user_placeholder.png';

//AntD
import Message from 'antd/lib/message';

//Redux Action
import setUser from './redux/actions/setUser';

auth().onAuthStateChanged(async userObj => {
    if (userObj) {
        const pendingUser = await getPendingUser(userObj.uid);
        if (pendingUser) {
            ReactDOM.render(
                <Provider store={store}>
                    <App {...{ pendingUser }} />
                </Provider>,
                document.getElementById('root'));
        } else {
            const user = await getUser(userObj.uid);
            if (user) {
                if (!user.userAvatar) {
                    user.userAvatar = userPlaceholder;
                }
                store.dispatch(setUser(user));
                ReactDOM.render(
                    <Provider store={store}>
                        <App {...{ user }} />
                    </Provider>,
                    document.getElementById('root'));
            } else {
                await auth().signOut();
                Message.error('Prisijungti Nepavyko, susisiekite su sistemos administratoriumi!');
                setTimeout(() => window && window.location.reload(), 3000);
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
