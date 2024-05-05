import {
  get,
  set,
  ref,
  query,
  equalTo,
  orderByChild,
  remove,
} from 'firebase/database';
import { db } from '../config/firebase-config.js';

export const getUserByHandle = (handle) => {
  return get(ref(db, `users/${handle}`));
};

export const createUserHandle = (handle, uid, email, firstName, lastName) => {
  return set(ref(db, `users/${handle}`), {
    uid,
    handle,
    email,
    firstName,
    lastName,
    userRole: 'user',
    createdOn: new Date(),
  });
};

export const getUserData = (uid) => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const editUserProfile = (uid, data) => {
  return set(ref(db, `users/${uid}`), data);
};

export const getAllUsers = async () => {
  const result = await get(ref(db, 'users'));
  return result.size;
};

export const getAllPosts = async () => {
  const result = await get(ref(db, 'posts'));
  return result.size;
};

export const deletePost = (postId) => {
  try {
    const postRef = ref(db, `posts/${postId}`);
    remove(postRef);
    console.log('Post deleted successfully');
  } catch (error) {
    console.error('Error deleting post:', error.message);
  }
};
