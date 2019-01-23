import db from '../firebase.js';

const getUser = async (userId) => {
    const userRef = db.collection('users');
    const userDoc = await userRef.doc(userId).get();
    return { uid: userId, ...userDoc.data() }
};

/**
 * Fetch Lessons for one current week from Firebase
 * @param date
 * @returns Object -> { WeekDay -> []}
 */
const getLessons = async (date) => {
    const weekLessons = {
        Mon: [],
        Tue: [],
        Wen: [],
        Thu: [],
        Fri: [],
        Sat: [],
        Sun: [],
    };
    const lessonsRef = db.collection('lessons');
    const lessonsDoc = await lessonsRef.orderBy('date', 'desc').get();
    lessonsDoc.docs.forEach(lessonDoc => {
        const lesson = { lessonId: lessonDoc.id, ...lessonDoc.data() };
        weekLessons[lesson.weekDay].push(lesson);
        return lesson;
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
}