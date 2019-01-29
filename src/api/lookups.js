import db from '../firebase.js';
import { auth } from 'firebase/app';
import moment from 'moment';

const getUser = async (userId) => {
    const userRef = db.collection('users');
    const userDoc = await userRef.doc(userId).get();
    return { uid: userId, ...userDoc.data() }
};

const getCurrentUser = async () => {
    const uid = auth().currentUser.uid;
    return await getUser(uid);
};

const getDayHeartRate = async () => {
    const date = moment().format('YYYY-MM-DD');
    const heartRateRef =  db.collection('heartRates').doc(date);
    const heartRatesDoc = await heartRateRef.get();
    if (!heartRatesDoc.exists) {
        return {};
    }
    return { heartRateId: heartRatesDoc.id, ...heartRatesDoc.data() };
};

/**
 * Fetch Lessons for one current week from Firebase
 * @param date
 * @returns Object -> { WeekDay -> []}
 */
const getLessons = async (firstDayOfWeek) => {
    const uid = auth().currentUser.uid;
    const weekLessons = {};
    const lessonsRef = db.collection('lessons');
    const lessonsDoc = await lessonsRef.where('firstDayOfWeek', '==', firstDayOfWeek).where('coachId', '==', uid).get();
    lessonsDoc.docs.forEach(lessonDoc => {
        const lesson = { lessonId: lessonDoc.id, ...lessonDoc.data() };
        if (!weekLessons[lesson.weekDay]) {
            weekLessons[lesson.weekDay] = [];
        }
        weekLessons[lesson.weekDay].push(lesson);
    });

    return weekLessons;
};

const getSingleLesson = async (id) => {
    console.log(id);
    const lessonsRef = db.collection('lessons').doc(id);
    const lessonDoc = await lessonsRef.get();
    if (!lessonDoc.exists) {
        return undefined;
    }
    return { lessonId: lessonDoc.id, ...lessonDoc.data() };

};


export {
    getLessons,
    getSingleLesson,
    getUser,
    getCurrentUser,
    getDayHeartRate,
}