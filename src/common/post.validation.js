export const validatePost = (post) => {
  if (!post.title || !post.content || !post.recipe) {
    throw new Error('auth/empty-fields');
  }
  if (post.title.length < 8 || post.title.length > 64) {
    throw new Error('auth/title-length');
  }
  if (post.content.length < 16 || post.content.length > 100) {
    throw new Error('auth/content-length');
  }
  if (post.recipe.length < 32 || post.recipe.length > 8192) {
    throw new Error('auth/recipe-length');
  }
};

export const validateImage = (image) => {
  if (!image) {
    throw new Error('auth/no-image');
  }
};
