import { auth } from 'firebase/app';
import API from './transactions';
import setUser from "../redux/actions/setUser";
import store from "../redux/store";

/**
 * Sign with FireBase SDK
 * @param email -> String
 * @param password -> String
 * @returns {Promise} Object Of User
 */
const signIn = (email, password) => {
    return auth().signInWithEmailAndPassword(email, password);
};

/**
 * Sign In/Up with Facebook
 * If new User new User Object is created in pending User Collection and Router Redirecting to Sign Up Page
 * If returning User Router redirects to Home Page
 * @returns {Promise}
 */
const signInWithFacebook = async () => {
    auth().useDeviceLanguage();
    try {
        const provider = new auth.FacebookAuthProvider();
        const result = await auth().signInWithPopup(provider);
        if (result) {
            const userInfo = result.additionalUserInfo;
            const user = {
                userName: userInfo.profile.first_name,
                userAvatar: userInfo.profile.picture.data.url,
            };
            const uid = result.user.uid;

            if (userInfo.isNewUser) {
                await API.createPendingUser({ uid, user });
            }
            return {};
        } else {
            throw new Error('Auth Failed');
        }
    } catch (e) {
        console.log(e);
        return { error: 'Login Failed' }
    }
};

/**
 * SignOut with FireBase SDK
 * @returns {Promise}
 */
const signOut = () => {
    store.dispatch(setUser(null));
    return auth().signOut();
};

export {
    signIn,
    signOut,
    signInWithFacebook,
}