import db from '../firebase.js';
import { auth } from 'firebase/app';
import moment from 'moment';

/**
 * Fetch User Object from Firebase by userId
 * @param userId
 * @returns {Promise} -> Object
 */
const getUser = async (userId) => {
    try {
        const userRef = db.collection('users');
        const userDoc = await userRef.doc(userId).get();
        if (!userDoc.exists) {
            return null;
        } else {
            return { uid: userId, ...userDoc.data() }
        }
    } catch (e) {
        return null;
    }
};

/**
 * Get Pending User by ID.heart-rate-input-container input
 * @param userId
 * @returns {Promise<*>}
 */
const getPendingUser = async (userId) => {
    try {
        const userRef = db.collection('pendingUsers');
        const userDoc = await userRef.doc(userId).get();
        if (!userDoc.exists) {
            return null;
        } else {
            return { uid: userId, ...userDoc.data() }
        }
    } catch (e) {
        console.log('GET PENDING USER');
        console.log(e);
        return null
    }
};

/**
 * Get Logged In User Object
 * @returns {Promise} -> Object
 */
const getCurrentUser = async () => {
    const uid = auth().currentUser.uid;
    return await getUser(uid);
};

/**
 * Fetch Day Heart Rate from Firebase
 * @returns {Promise} -> Object
 */
const getDayHeartRate = async () => {
    const date = moment().format('YYYY-MM-DD');
    const heartRateRef = db.collection('heartRates').doc(date);
    const heartRatesDoc = await heartRateRef.get();
    if (!heartRatesDoc.exists) {
        return undefined;
    }
    return heartRatesDoc.data().heartRate
};

const getHeartRatesForMonth = async (month = '') => {
    const heartRatesRef = db.collection('heartRates');
    const heartRatesDocs = await heartRatesRef.where('month', '==', month).get();

    return heartRatesDocs.docs.map((doc) => {
        const { date, heartRate } = doc.data();
        //TODO: Unknow Shape of Data
        return {
            x: parseInt(moment(date).format('DD'), 10),
            y: parseInt(heartRate, 10),
        }
    });
};

/**coachId
 * Fetch Lessons for one current week from Firebase
 * @param firstDayOfWeek
 * @returns Object -> { WeekDay -> []}
 */
const getLessons = async (firstDayOfWeek) => {
    const { role, uid } = await getCurrentUser();
    const weekLessons = {};
    const lessonsRef = db.collection('lessons');
    let lessonsDoc;
    if (role === 'teacher') {
        lessonsDoc = await lessonsRef.where('firstDayOfWeek', '==', firstDayOfWeek).where('teacherId', '==', uid).get();
    } else {
        lessonsDoc = await lessonsRef.where('firstDayOfWeek', '==', firstDayOfWeek).get();
    }

    lessonsDoc.docs.forEach(lessonDoc => {
        const lesson = { lessonId: lessonDoc.id, ...lessonDoc.data() };
        const weekDay = moment(lesson.date).format('d');
        if (!weekLessons[weekDay]) {
            weekLessons[weekDay] = [];
        }
        weekLessons[weekDay].push(lesson);
    });

    return weekLessons;
};

/**
 * Fetch Lesson by Lesson Id
 * @param lessonId
 * @returns {Promise<*>}
 */
const getSingleLesson = async (lessonId) => {
    const lessonsRef = db.collection('lessons').doc(lessonId);
    const lessonDoc = await lessonsRef.get();
    if (!lessonDoc.exists) {
        return undefined;
    }
    return { lessonId: lessonDoc.id, ...lessonDoc.data() };

};


const getCommentsForLesson = async (lessonId) => {
    const commentsDocRef = db.collection('lessons').doc(lessonId).collection('comments');
    const commentsDoc = await commentsDocRef.orderBy('date', 'desc').get();
    return await commentsDoc.docs.map(commentDoc => {
        return { commentId: commentsDoc.id, ...commentDoc.data() }
    });
};

/**
 * Get All Events from FireStore
 * @returns ArrayOf [
 *  Objects shape of { start: Date, end: Date, title: String, isAllDay: Boolean,  userId: String }
 * ]
 */
const getAllEvents = async () => {
    const eventsRef = db.collection('events');
    const eventsDocs = await eventsRef.get();
    return await eventsDocs.docs.map((doc) => {
        const event =  {...doc.data()};
        event.start = event.start.toDate();
        event.end = event.end.toDate();
        event.id = doc.id;
        return event;
    });
};

const getAllUsersAdmin = async () => {
    const usersRef = db.collection('users');
    const userDocs = await usersRef.get();
    return await userDocs.docs.map((doc) => {
        return { id: doc.id, ...doc.data()}
    });
};

const getAllPendingUsersAdmin = async () => {
    const usersRef = db.collection('pendingUsers');
    const userDocs = await usersRef.get();
    return await userDocs.docs.map((doc) => {
        return { id: doc.id, ...doc.data()}
    });
};

const getAllTeacherUsers = async () => {
    const usersRef = db.collection('users');
    const usersDocs = await usersRef.where('roles', 'array-contains', 'teacher').get();
    return usersDocs.docs.map((doc) => ({id: doc.id, ...doc.data()}));

};

export {
    getLessons,
    getSingleLesson,
    getUser,
    getCurrentUser,
    getDayHeartRate,
    getCommentsForLesson,
    getPendingUser,
    getHeartRatesForMonth,
    getAllEvents,
    getAllUsersAdmin,
    getAllPendingUsersAdmin,
    getAllTeacherUsers,
}