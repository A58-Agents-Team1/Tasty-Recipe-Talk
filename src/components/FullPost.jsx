import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Text,
  Button,
  Stack,
  FormLabel,
  Textarea,
  Input,
  Box,
} from '@chakra-ui/react';
import { AlertDialogExample } from './Alerts';
import { CanDelete } from '../hoc/Authenticated';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { likePost, dislikePost, getComments } from '../services/posts.service';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUploadedPhoto } from '../config/firebase-config';
import { updatePost } from '../services/users.service';
import AddComment from './AddComment';
import Comment from './Comment';

export default function FullPost({ post }) {
  const { userData } = useContext(AppContext);

  const navigate = useNavigate();

  const like = () => likePost(post.id, userData.handle);
  const dislike = () => dislikePost(post.id, userData.handle);

  const [url, setUrl] = useState('');
  const [comments, setComments] = useState([]);
  const [editEnable, setEditEnable] = useState(true);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [editPostState, setEditPostState] = useState(false);
  const [postButtonClicked, setPostButtonClicked] = useState(false);

  const [form, setForm] = useState({
    title: post.title,
    content: post.content,
    recipe: post.recipe,
  });

  const editPost = async () => {
    try {
      await updatePost(post.id, form);
      setEditEnable(!editEnable);
    } catch (e) {
      console.log(e.message);
    }
  };

  const updateForm = (props) => (e) => {
    setForm({
      ...form,
      [props]: e.target.value,
    });
  };

  useEffect(() => {
    const getUrl = async () => {
      const result = await getUploadedPhoto(post.id);
      const comments = await getComments(post.id);
      setUrl(result);
      setComments(comments);
    };
    getUrl();
  }, [post.id, postButtonClicked, deleteToggle, editPostState]);

  return (
    <div>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        mt={3}
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src={url}
          alt='Card image'
        />

        <Stack>
          <CardBody>
            {userData && editEnable === true ? (
              <>
                <Heading size='md'>{`Title: ${post.title}`}</Heading>
                <Text py='2'>{`Description: ${post.content}`}</Text>
                <br />
                <Text>{`Recipe: ${post.recipe}`}</Text>
                <br />
              </>
            ) : (
              <>
                <FormLabel htmlFor='title'>Title: </FormLabel>
                <Input
                  mb={4}
                  value={form.title}
                  onChange={updateForm('title')}
                  type='text'
                  name='title'
                  id='title'
                  bg={'gray.200'}
                  shadow={'md'}
                />
                <FormLabel htmlFor='description'>Description: </FormLabel>
                <Textarea
                  mb={4}
                  value={form.content}
                  onChange={updateForm('content')}
                  type='text'
                  name='content'
                  id='content'
                  bg={'gray.200'}
                  shadow={'md'}
                />
                <FormLabel htmlFor='recipe'>Recipe: </FormLabel>
                <Textarea
                  width='600px'
                  height='160px'
                  mb={4}
                  value={form.recipe}
                  onChange={updateForm('recipe')}
                  type='text'
                  name='recipe'
                  id='recipe'
                  bg={'gray.200'}
                  shadow={'md'}
                />
              </>
            )}
            <br />
            <br />
            <Text>
              {post.likedBy.length === 0
                ? 'No likes yet'
                : `Liked by: ${post.likedBy}`}
            </Text>
            <br />
            <Text>{`Author: ${post.author}`}</Text>
          </CardBody>

          {editEnable ? (
            <>
              <CardFooter>
                {post?.likedBy.includes(userData?.handle) ? (
                  <Button
                    onClick={dislike}
                    style={{ marginRight: '10px' }}
                  >
                    Dislike
                  </Button>
                ) : (
                  <Button
                    onClick={like}
                    style={{ marginRight: '10px' }}
                  >
                    Like
                  </Button>
                )}
                {!userData.isBlocked && (
                  <Button
                    marginRight='10px'
                    onClick={() => {
                      setPostButtonClicked(!postButtonClicked);
                    }}
                  >
                    Add Comment
                  </Button>
                )}
                {userData.handle === post.author && (
                  <Button
                    id='isChecked'
                    _selected={{ bg: 'green.500', color: 'white' }}
                    style={{ marginRight: '10px' }}
                    onClick={() => setEditEnable(!editEnable)}
                  >
                    Edit Post
                  </Button>
                )}
                <Button
                  style={{ marginRight: '10px' }}
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
                <CanDelete postAuthor={post.author}>
                  <AlertDialogExample
                    postId={post.id}
                    title='Delete Recipe Post'
                  />
                </CanDelete>
              </CardFooter>
              <br />
              {postButtonClicked && (
                <Box>
                  <AddComment
                    postId={post.id}
                    setPostButtonClicked={setPostButtonClicked}
                  />
                </Box>
              )}
            </>
          ) : (
            <Button
              colorScheme='green'
              id='isChecked'
              _selected={{ bg: 'green.500', color: 'white' }}
              style={{ margin: '10px' }}
              onClick={() => editPost()}
            >
              Finish Editing
            </Button>
          )}
        </Stack>
      </Card>

      <br />

      <Comment
        comments={comments}
        setComments={setComments}
        setEditPostState={setEditPostState}
        postId={post.id}
        setDeleteToggle={setDeleteToggle}
      />
    </div>
  );
}

FullPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    recipe: PropTypes.string.isRequired,
    createdOn: PropTypes.string,
    likedBy: PropTypes.array,
  }),
};
