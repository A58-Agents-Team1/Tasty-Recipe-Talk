import { ref, push, update, get, remove } from 'firebase/database';
import { db } from '../config/firebase-config';

export const addPost = async (author, title, content, recipe) => {
  const post = {
    author,
    title,
    content,
    comments: '',
    recipe,
    createdOn: Date.now(),
  };
  const result = await push(ref(db, 'posts'), post);
  return result.key;
};

export const getAllPosts = async (search) => {
  const snapshot = await get(ref(db, 'posts'));
  if (!snapshot.exists()) return [];

  return Object.entries(await snapshot.val())
    .map(([key, value]) => {
      return {
        ...value,
        id: key,
        likedBy: value.likedBy ? Object.keys(value.likedBy) : [],
        createdOn: new Date(value.createdOn).toString(),
      };
    })
    .filter((post) => post.title?.toLowerCase().includes(search.toLowerCase()));
};

export const getPostById = async (id) => {
  const snapshot = await get(ref(db, `posts/${id}`));

  if (!snapshot.val()) throw new Error('Post with this id does not exist!');

  return {
    ...snapshot.val(),
    id,
    likedBy: snapshot.val().likedBy ? Object.keys(snapshot.val().likedBy) : [],
    createdOn: new Date(snapshot.val().createdOn).toString(),
  };
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

export const addComment = async (postId, author, content) => {
  const comment = {
    author,
    content,
    lastEdited: Date.now(),
    createdOn: Date.now(),
  };
  const result = await push(ref(db, `posts/${postId}/comments`), comment);
  return result.key;
};

export const getComments = async (postId) => {
  const snapshot = await get(ref(db, `posts/${postId}/comments`));
  if (!snapshot.exists()) return [];

  return Object.entries(snapshot.val()).map(([key, value]) => {
    return {
      ...value,
      id: key,
      createdOn: new Date(value.createdOn).toString(),
      lastEdited: new Date(value.lastEdited).toString(),
    };
  });
};

export const updateComment = async (postId, commentId, content) => {
  const updateVal = {};
  updateVal[`posts/${postId}/comments/${commentId}/content`] = content;
  updateVal[`posts/${postId}/comments/${commentId}/lastEdited`] = Date.now();
  await update(ref(db), updateVal);
};

export const deleteComment = async (postId, commentId) => {
  try {
    const postRef = ref(db, `posts/${postId}/comments/${commentId}`);
    await remove(postRef);
  } catch (error) {
    console.error('Error deleting comment:', error.message);
  }
};

export const likeComment = async (postId, commentId, handle) => {
  const updateVal = {};
  updateVal[`posts/${postId}/comments/${commentId}/likedBy/${handle}`] = true;
  updateVal[`users/${handle}/likedComments/${commentId}`] = true;
  await update(ref(db), updateVal);
};

export const dislikeComment = async (postId, commentId, handle) => {
  const updateVal = {};
  updateVal[`posts/${postId}/comments/${commentId}/likedBy/${handle}`] = null;
  updateVal[`users/${handle}/likedComments/${commentId}`] = null;
  await update(ref(db), updateVal);
};
