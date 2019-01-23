import React from 'react';
import ReactDOM from 'react-dom';

//Firebase
import './firebase';
import { auth } from 'firebase';

//Api
import { getUser } from './api/lookups';

//Components
import App from './App';

auth().onAuthStateChanged(async userObj => {
    if (userObj) {
        const user = await getUser(userObj.uid);
        if (user) {
            ReactDOM.render(<App {...{ user }} />, document.getElementById('root'));
        } else {
            auth().signOut();
        }
    } else {
        ReactDOM.render(<App />, document.getElementById('root'));
    }
});



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
