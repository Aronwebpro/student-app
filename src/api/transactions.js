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
        //console.log(e.message);
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

//TODO:
const createComment = async ({ lessonId, comment, userId }) => {
    const commentDocRef = await db.collection('lessons').doc(lessonId).collection('comments').add(comment);
    const commentDoc = await commentDocRef.get();
    return commentDoc.data();
};


const API = {
    createLesson: TransactionWrapper.bind(this, createLesson),
    createComment: TransactionWrapper.bind(this, createComment),
};

export default API;