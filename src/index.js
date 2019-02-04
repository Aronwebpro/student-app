import React from 'react';
import ReactDOM from 'react-dom';

//Firebase
import { auth } from 'firebase/app';

//Api
import { getUser, getPendingUser } from './api/lookups';

//Components
import App from './App';

//TODO: Temp
//Avatar Images
import face1 from './assets/img/1face.png';
import face2 from './assets/img/2face.png';
import face3 from './assets/img/3face.png';
import face4 from './assets/img/4face.png';
import face5 from './assets/img/5face.png';
import face6 from './assets/img/6face.png';
import face7 from './assets/img/7face.png';
import face8 from './assets/img/8face.png';
import face9 from './assets/img/9face.png';
import face10 from './assets/img/10face.png';
import face11 from './assets/img/11face.png';
import face12 from './assets/img/12face.png';
import face13 from './assets/img/13face.png';
import face14 from './assets/img/14face.png';
import face15 from './assets/img/15face.png';
import face16 from './assets/img/16face.png';

auth().onAuthStateChanged(async userObj => {
    if (userObj) {
        const user = await getUser(userObj.uid);
        if (user) {
            ReactDOM.render(<App {...{ user }} />, document.getElementById('root'));
        } else {
            const pendingUser = await getPendingUser(userObj.uid);
            if (pendingUser) {
                ReactDOM.render(<App {...{ pendingUser }} />, document.getElementById('root'));
            } else {
                auth().signOut();
            }
        }
    } else {
        ReactDOM.render(<App/>, document.getElementById('root'));
    }
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
