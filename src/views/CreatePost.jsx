import { useContext, useState } from 'react';
import { addPost } from '../services/posts.service';
import { AppContext } from '../context/AppContext';
import { useToast, Heading } from '@chakra-ui/react';
import { showToast, showToastError } from '../components/Alerts';
import { IsBlocked } from '../hoc/Authenticated';
import { uploadPhoto } from '../config/firebase-config';
import { validateImage, validatePost } from '../common/post.validation';
import { useNavigate } from 'react-router-dom';

export const CreatePost = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    recipe: '',
  });

  const { userData } = useContext(AppContext);
  const toast = useToast();
  const [imageUpload, setImageUpload] = useState(null);
  const navigate = useNavigate();
  const updatePost = (value, key) => {
    setPost({ ...post, [key]: value });
  };

  const createPost = async () => {
    try {
      validatePost(post);
      validateImage(imageUpload);
      const postKey = await addPost(
        userData.handle,
        post.title,
        post.content,
        post.recipe
      );

      await uploadPhoto(imageUpload, postKey);

      setPost({
        title: '',
        content: '',
        recipe: '',
      });

      showToast('Post created.', 'You created a post successfully.', toast);

      navigate(`/posts/${postKey}`);
    } catch (error) {
      if (error.message === 'auth/empty-fields') {
        showToastError('Error', 'Please fill in all fields.', toast);
      }

      if (error.message === 'auth/no-image') {
        showToastError('Error', 'Please upload an image.', toast);
      }
    }
  };

  return (
    <div>
      <Heading>Create a recipe!</Heading>
      <label htmlFor='input-title'>Title:</label>
      <br />
      <input
        type='text'
        value={post.title}
        onChange={(e) => updatePost(e.target.value, 'title')}
        name='title'
        id='title'
      />
      <br />
      <label htmlFor='input-content'>Short description</label>
      <br />
      <textarea
        name='input-content'
        id='input-content'
        cols='50'
        rows='5'
        value={post.content}
        onChange={(e) => updatePost(e.target.value, 'content')}
      ></textarea>
      <br />
      <label htmlFor='input-recipe'>Recipe:</label>
      <br />
      <textarea
        name='input-recipe'
        id='input-recipe'
        cols='50'
        rows='7'
        value={post.recipe}
        onChange={(e) => updatePost(e.target.value, 'recipe')}
      ></textarea>
      <br />
      <label htmlFor='image'>Upload Image: </label>
      <input
        type='file'
        id='image'
        name='image'
        accept='image/*'
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <br />
      <IsBlocked>
        <button onClick={createPost}>Create post</button>
      </IsBlocked>
    </div>
  );
};
