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
import { update } from 'firebase/database';

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

export const getUsersByEmail = async (email) => {
  const pureEmail = email.split('.').join('').split('.').join('');
  const snapshot = await get(ref(db, 'users'));
  const users = [];
  snapshot.forEach((acc) => {
    const user = acc.val();

    if (user.email.includes(pureEmail)) {
      users.push(user);
    }
  });
  return users;
};

export const getUsersByName = async (name) => {
  const snapshot = await get(ref(db, 'users'));
  const users = [];
  snapshot.forEach((acc) => {
    const user = acc.val();
    if (user.firstName.includes(name)) {
      users.push(user);
    }
  });
  return users;
};

export const blockAccount = async (handle) => {
  return update(ref(db, `users/${handle}`), {
    isBlocked: true,
  });
};

export const unblockAccount = async (handle) => {
  return update(ref(db, `users/${handle}`), {
    isBlocked: false,
  });
};
