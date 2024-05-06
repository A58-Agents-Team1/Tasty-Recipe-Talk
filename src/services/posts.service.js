import { ref, push, update, get } from 'firebase/database';
import { db } from '../config/firebase-config';

export const addPost = async (author, title, content, recipe) => {
  const post = {
    author,
    title,
    content,
    recipe,
    createdOn: Date.now(),
  };
  const result = await push(ref(db, 'posts'), post);
  console.log(result.key);
};

export const getAllPosts = async (search) => {
  const snapshot = await get(ref(db, 'posts'));
  if (!snapshot.exists()) return [];

  return Object.entries(snapshot.val())
    .map(([key, value]) => {
      return {
        ...value,
        id: key,
        likedBy: value.likedBy ? Object.keys(value.likedBy) : [],
        createdOn: new Date(value.createdOn).toString(),
      };
    })
    .filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));
};

export const getPostById = async (id) => {
  const snapshot = await get(ref(db, `posts/${id}`));

  if (!snapshot.val()) throw new Error('Post with this id does not exist!');

  return {
    ...snapshot.val(),
    id,
    likedBy: snapshot.val().likedBy ? Object.keys(snapshot.val().likedBy) : [],
    createdOn: new Date(snapshot.val().createdOn).toString(),
  }
};

export const likePost = async (postId, handle) => {
  const updateVal = {};
  updateVal[`users/${handle}/likedPosts/${postId}`] = true;
  updateVal[`posts/${postId}/likedBy/${handle}`] = true;
  await update(ref(db), updateVal);
};

export const dislikePost = async (postId, handle) => {
  const updateVal = {};
  updateVal[`users/${handle}/likedPosts/${postId}`] = null;
  updateVal[`posts/${postId}/likedBy/${handle}`] = null;
  await update(ref(db), updateVal);
};
