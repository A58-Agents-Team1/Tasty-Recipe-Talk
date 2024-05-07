import { useContext, useState } from 'react';
import { addPost, } from '../services/posts.service';
import { AppContext } from '../context/AppContext';
import { useToast, Heading } from '@chakra-ui/react';
import { showToast } from '../components/Alerts';
import { IsBlocked } from '../hoc/Authenticated';
import { uploadPhoto } from '../config/firebase-config';



export const CreatePost = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    recipe: '',
  });

  const { userData } = useContext(AppContext);
  const toast = useToast();
  const [imageUpload, setImageUpload] = useState(null);

  const updatePost = (value, key) => {
    setPost({ ...post, [key]: value });
  };

  const createPost = async () => {
    await addPost(userData.handle, post.title, post.content, post.recipe);
    setPost({
      title: '',
      content: '',
      recipe: '',
    });
    showToast('Post created.', 'You created a post successfully.', toast);
  };

  const uploadImage = () => {
   if (imageUpload == null) {
     return;
    }
    uploadPhoto(imageUpload,post.title);
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
      <IsBlocked>
        <button onClick={createPost}>Create post</button>
      </IsBlocked>
      <input
        type='file'
        onChange={(event) => { setImageUpload(event.target.files[0]); }}
      />
      <button onClick={uploadImage}>Upload</button>
    </div>
  );
};
