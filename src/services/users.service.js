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
import { API_KEY, GET_GIPHY_URL } from '../common/constants.js';

export const getUserByHandle = async (handle) => {
  const snapshot = await get(ref(db, 'users'));
  const users = [];
  snapshot.forEach((acc) => {
    const user = acc.val();
    if (user.handle.toLowerCase().includes(handle.toLowerCase())) {
      users.push(user);
    }
  });
  return users;
};

export const getUsersByEmail = async (email) => {
  const snapshot = await get(ref(db, 'users'));
  const users = [];
  snapshot.forEach((acc) => {
    const user = acc.val();

    if (user.email.toLowerCase().includes(email.toLowerCase())) {
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
    if (user.firstName.toLowerCase().includes(name.toLowerCase())) {
      users.push(user);
    }
  });
  return users;
};

export const getAllUsersByIsBlocked = async (isBlocked) => {
  const snapshot = await get(ref(db, 'users'));
  const users = [];
  snapshot.forEach((acc) => {
    const user = acc.val();
    if (user.isBlocked === isBlocked) {
      users.push(user);
    }
  });
  return users;
};

export const createUserHandle = (handle, uid, email, firstName, lastName) => {
  return set(ref(db, `users/${handle}`), {
    uid,
    handle,
    email,
    firstName,
    lastName,
    isBlocked: false,
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
  } catch (error) {
    console.error('Error deleting post:', error.message);
  }
};

export const blockAccount = async (handle) => {
  return await update(ref(db, `users/${handle}`), {
    isBlocked: true,
  });
};

export const unblockAccount = async (handle) => {
  return await update(ref(db, `users/${handle}`), {
    isBlocked: false,
  });
};

export const updateUser = async (handle, data) => {
  return await update(ref(db, `users/${handle}`), data);
};

export const updatePost = async (handle, data) => {
  return await update(ref(db, `posts/${handle}`), data);
};

export const getTrendyGifAsync = async () => {
  try {
    const data = await fetch(
      `${GET_GIPHY_URL}search?api_key=${API_KEY}&limit=12&rating=g&q=cooking`
    );
    const getTrendyGif = await data.json();

    if (!getTrendyGif.data) {
      alert('Error getting trendy gifs');
      throw new Error(getTrendyGif.meta.msg);
    }

    return getTrendyGif;
  } catch (e) {
    console.log(e.message);
  }
};
