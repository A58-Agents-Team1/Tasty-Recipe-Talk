import { POST_MAX_CONTENT_LENGTH, POST_MAX_RECIPE_LENGTH, POST_MAX_TITLE_LENGTH, POST_MIN_CONTENT_LENGTH, POST_MIN_RECIPE_LENGTH, POST_MIN_TITLE_LENGTH } from "./constants";

export const validatePost = (post) => {
  if (!post.title || !post.content || !post.recipe) {
    throw new Error('auth/empty-fields');
  }
  if (post.title.length < POST_MIN_TITLE_LENGTH || post.title.length > POST_MAX_TITLE_LENGTH) {
    throw new Error('auth/title-length');
  }
  if (post.content.length < POST_MIN_CONTENT_LENGTH || post.content.length > POST_MAX_CONTENT_LENGTH) {
    throw new Error('auth/content-length');
  }
  if (post.recipe.length < POST_MIN_RECIPE_LENGTH || post.recipe.length > POST_MAX_RECIPE_LENGTH) {
    throw new Error('auth/recipe-length');
  }
};

export const validateImage = (image) => {
  if (!image) {
    throw new Error('auth/no-image');
  }
};
