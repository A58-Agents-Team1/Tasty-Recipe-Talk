import { ref, push } from 'firebase/database';
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
