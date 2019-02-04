import { auth } from 'firebase';
import db from '../firebase.js';

/**
 * Transaction Wrapper to catch Errors
 * @param func
 * @param args
 * @returns {Promise<*>}
 * @constructor
 */
const TransactionWrapper = async (func, { ...args }) => {
    try {
        const result = await func({ ...args });
        return { result };
    } catch (e) {
        console.log(e.message);
        return { error: { msg: e.message } };
    }
};

/**
 * Create Lesson in FireStore DB
 * @param post -> Object
 * @returns Object -> shapeOf({lessonId: String})
 */
const createLesson = async ({ lesson }) => {
    //Create PostDetail
    const lessonDocRef = await db.collection('lessons').add(lesson);
    return { lessonId: lessonDocRef.id }
};

/**
 * Insert New HeartRate for the Day
 * @param heartRateId
 * @param date
 * @param heartRate
 * @returns {Promise<{result: string}>}
 */
const insertHeartRate = async ({ heartRateId, date, heartRate }) => {
    const heartRateDocRef = await db.collection('heartRates').doc(heartRateId).set({ date, heartRate });
    return { result: 'success' };
};

/**
 * On Social Login if New User is created, new user object is created to Pending User Collection
 * Pending Users doesn't have access to Auth Routes
 * @param uid
 * @param user
 * @returns {Promise<{result: string}>}
 */
const createPendingUser = async ({ uid, user }) => {
    const userRef = await db.collection('pendingUsers').doc(uid).set({ ...user });
    return { result: 'success' };
};

//TODO:
const createComment = async ({ lessonId, comment, userId }) => {
    const commentDocRef = await db.collection('lessons').doc(lessonId).collection('comments').add(comment);
    const commentDoc = await commentDocRef.get();
    return commentDoc.data();
};


//API Object
const API = {
    createLesson: TransactionWrapper.bind(this, createLesson),
    createComment: TransactionWrapper.bind(this, createComment),
    insertHeartRate: TransactionWrapper.bind(this, insertHeartRate),
    createPendingUser: TransactionWrapper.bind(this, createPendingUser),
};

export default API;