import db from '../firebase.js';
import { auth } from 'firebase/app';
import moment from 'moment';

/**
 * Fetch User Object from Firebase by userId
 * @param userId
 * @returns {Promise} -> Object
 */
const getUser = async (userId) => {
    const userRef = db.collection('users');
    const userDoc = await userRef.doc(userId).get();
    if (!userDoc.exists) {
        return null;
    } else {
        return { uid: userId, ...userDoc.data() }
    }
};

/**
 * Get Pending User by ID
 * @param userId
 * @returns {Promise<*>}
 */
const getPendingUser = async (userId) => {
    const userRef = db.collection('pendingUsers');
    const userDoc = await userRef.doc(userId).get();
    if (!userDoc.exists) {
        return null;
    } else {
        return { uid: userId, ...userDoc.data() }
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
        return {};
    }
    return { heartRateId: heartRatesDoc.id, ...heartRatesDoc.data() };
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
        if (!weekLessons[lesson.weekDay]) {
            weekLessons[lesson.weekDay] = [];
        }
        weekLessons[lesson.weekDay].push(lesson);
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


export {
    getLessons,
    getSingleLesson,
    getUser,
    getCurrentUser,
    getDayHeartRate,
    getCommentsForLesson,
    getPendingUser,
    getHeartRatesForMonth,
}