import { useContext, useState } from 'react';
import { addPost } from '../services/posts.service';
import { AppContext } from '../context/AppContext';
import {
  useToast,
  Heading,
  Box,
  Textarea,
  Input,
  Button,
} from '@chakra-ui/react';
import { showToast, showToastError } from '../components/Alerts';
import { IsBlocked } from '../hoc/Authenticated';
import { uploadPhoto } from '../config/firebase-config';
import { validateImage, validatePost } from '../common/post.validation';
import { useNavigate } from 'react-router-dom';
import {
  POST_MAX_CONTENT_LENGTH,
  POST_MAX_RECIPE_LENGTH,
  POST_MAX_TITLE_LENGTH,
  POST_MIN_CONTENT_LENGTH,
  POST_MIN_RECIPE_LENGTH,
  POST_MIN_TITLE_LENGTH,
} from '../common/constants';

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
        showToastError(
          'Error with creating post',
          'Please fill in all fields.',
          toast
        );
      }
      if (error.message === 'auth/title-length') {
        showToastError(
          'Error with creating post',
          `Title must be between ${POST_MIN_TITLE_LENGTH} and ${POST_MAX_TITLE_LENGTH} characters.`,
          toast
        );
      }
      if (error.message === 'auth/content-length') {
        showToastError(
          'Error with creating post',
          `Content must be between ${POST_MIN_CONTENT_LENGTH} and ${POST_MAX_CONTENT_LENGTH} characters.`,
          toast
        );
      }
      if (error.message === 'auth/recipe-length') {
        showToastError(
          'Error with creating post',
          `Recipe must be between ${POST_MIN_RECIPE_LENGTH} and ${POST_MAX_RECIPE_LENGTH} characters.`,
          toast
        );
      }

      if (error.message === 'auth/no-image') {
        showToastError(
          'Error with creating post',
          'Please upload an image.',
          toast
        );
      }
    }
  };

  return (
    <Box
      p={6}
      maxW='500px'
      mx='auto'
    >
      <Heading mb={4}>Create a recipe!</Heading>
      <Input
        mb={4}
        placeholder='Title'
        value={post.title}
        backgroundColor={'white'}
        onChange={(e) => updatePost(e.target.value, 'title')}
      />
      <Textarea
        mb={4}
        placeholder='Short description'
        value={post.content}
        backgroundColor={'white'}
        onChange={(e) => updatePost(e.target.value, 'content')}
      />
      <Textarea
        mb={4}
        placeholder='Recipe'
        value={post.recipe}
        backgroundColor={'white'}
        onChange={(e) => updatePost(e.target.value, 'recipe')}
      />
      <input
        type='file'
        accept='image/*'
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <IsBlocked>
        <Button
          colorScheme='teal'
          onClick={createPost}
        >
          Create post
        </Button>
      </IsBlocked>
    </Box>
  );
};
