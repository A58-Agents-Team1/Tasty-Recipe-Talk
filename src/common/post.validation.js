
export const validatePost = (post) => {
  if (!post.title || !post.content || !post.recipe) {
    throw new Error('auth/empty-fields');
  }
};

export const validateImage = (image) => {
  if (!image) {
    throw new Error('auth/no-image');
  }
};
