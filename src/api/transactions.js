import { auth } from 'firebase';
import db from '../firebase.js';
//import * as admin from 'firebase-admin';

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
        roles: [type],
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
const createComment = async ({ lessonId, comment, userId='' }) => {
    const commentDocRef = await db.collection('lessons').doc(lessonId).collection('comments').add(comment);
    const commentDoc = await commentDocRef.get();
    return commentDoc.data();
};

/**
 * Create New Event
 * @param title
 * @param start
 * @param end
 * @param isAllDay
 * @param userId
 * @returns {Promise<{eventId: string}>}
 */
const createEvent = async ({ title, start, end, isAllDay, userId='' }) => {
    const eventDocRef = await db.collection('events').add({ title, start, end, isAllDay, userId });
    return { eventId: eventDocRef.id }
};

/**
 * Update New Event
 * @param id
 * @param title
 * @param start
 * @param end
 * @param isAllDay
 * @param userId
 * @returns {Promise<string>}
 */
const updateEvent = async ({ id, title, start, end, isAllDay, userId='' }) => {
    const eventDocRef = db.collection('events').doc(id);
    await eventDocRef.update({ title, start, end, isAllDay, userId });
    return 'success';
};

/**
 * Update Roles for User
 * @param uid
 * @param roles
 * @returns {Promise<string>}
 */
const updateUserRoles = async ({ uid, roles }) => {
    const userDocRef = db.collection('users').doc(uid);
    await userDocRef.update({ roles });
    return 'success';
};

/**
 * Remove User from Users or PendingUsers Collections
 * @param uid
 * @param isPendingUser
 * @returns {Promise<string>}
 */
const removeUser = async ({ uid, isPendingUser=false}) => {
    const userDocRef = db.collection(isPendingUser ? 'pendingUsers' : 'users').doc(uid);
    await userDocRef.delete();
    //TODO: Remove User from auth() account
    //TODO: Now only removes from Users Collection
    //await admin.auth().deleteUser(uid);
    return 'success';
};

/**
 * Move User Object from Pending User Collection to Users Collection
 * @param uid
 * @returns {Promise<string>}
 */
const confirmPendingUser = async ({ uid }) => {
    const pendingUserDocRef = db.collection('pendingUsers').doc(uid);
    const pendingUserDoc = await pendingUserDocRef.get();
    if (pendingUserDoc.exists) {
       const newUser = { id: pendingUserDoc.id, ...pendingUserDoc.data() };
       delete newUser.userStatus;
       if (newUser.roles.includes('teacher')) {
           newUser.discipline = 'Discipline Name';
       }
       await db.collection('users').doc(uid).set({ ...newUser });
       await pendingUserDocRef.delete();
    }
    return 'success';
};

//API Object
const API = {
    createLesson: TransactionWrapper.bind(this, createLesson),
    createComment: TransactionWrapper.bind(this, createComment),
    insertHeartRate: TransactionWrapper.bind(this, insertHeartRate),
    createPendingUser: TransactionWrapper.bind(this, createPendingUser),
    submitPendingUser: TransactionWrapper.bind(this, submitPendingUser),
    createEvent: TransactionWrapper.bind(this, createEvent),
    updateEvent: TransactionWrapper.bind(this, updateEvent),
    updateUserRoles: TransactionWrapper.bind(this, updateUserRoles),
    removeUser: TransactionWrapper.bind(this, removeUser),
    confirmPendingUser: TransactionWrapper.bind(this, confirmPendingUser),
};

export default API;