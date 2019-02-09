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
 * @param month
 * @param heartRate
 * @returns {Promise<{result: string}>}
 */
const insertHeartRate = async ({ heartRateId, date, heartRate, month }) => {
    await db.collection('heartRates').doc(heartRateId).set({ date, heartRate, month });
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
    await db.collection('pendingUsers').doc(uid).set({ ...user });
    return { result: 'success' };
};

/**
 * When New User is Create with Social button, User is redirect to Sign Up Page to update User Type
 * @param uid
 * @param type
 * @returns {Promise}
 */
const submitPendingUser = async ({ uid, type }) => {
    const userDocumentRef = db.collection('pendingUsers').doc(uid);
    await userDocumentRef.update({
        role: type,
        userStatus: 'submitted',
    });
};

/**
 * Create New Comment
 * @param lessonId
 * @param comment
 * @param userId
 * @returns {Promise<firebase.firestore.DocumentData | undefined>}
 */
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
    submitPendingUser: TransactionWrapper.bind(this, submitPendingUser),

};

export default API;