import { ref, push, update, get } from 'firebase/database';
import { db } from '../config/firebase-config';

export const addPost = async (author, title, description, recipe) => {
  const post = {
    author,
    title,
    description,
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
