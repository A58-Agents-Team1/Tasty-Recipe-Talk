import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getUserByHandle = (handle) => {

    return get(ref(db, `users/${handle}`));
};

export const createUserHandle = (handle, uid, email, firstName, lastName) => {

    return set(ref(db, `users/${handle}`), { uid, handle, email, firstName, lastName, createdOn: new Date() })
};

export const getUserData = (uid) => {

    return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};