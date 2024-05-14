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
  Grid,
  GridItem,
  Spacer,
  Divider,
  Flex,
  Tooltip,
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
import { formatDate } from '../helper/format-date';

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
      try {
        const result = await getUploadedPhoto(post.id);
        const comments = await getComments(post.id);
        setUrl(result);
        setComments(comments);
      } catch (e) {
        console.log(e.message);
      }
    };
    getUrl();
  }, [post.id, postButtonClicked, deleteToggle, editPostState]);

  return (
    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        mt={3}
        border={'1px solid'}
        borderColor={'gray.400'}
        shadow={{ base: 'md', sm: 'xl' }}
        w={'100%'}
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src={url}
          alt='Card image'
        />

        <Stack>
          <CardBody>
            {userData && userData.isBlocked && (
              <Heading align='center' color='red.500'>
                You are not able to leave comments because you are Blocked!
              </Heading>
            )}
            {userData && editEnable === true ? (
              <Box
                border={'5px dotted'}
                borderColor={'gray.400'}
                borderRadius={'md'}
                p={2}
                mb={4}
                w={'100%'}
              >
                <Heading size='md'>{`${post.title}`}</Heading>
                <Text py='2'>{`${post.content}`}</Text>
                <Text>{`Recipe: ${post.recipe}`}</Text>
                <br />
              </Box>
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
            <Grid
              w={'100%'}
              templateColumns='max-content 1fr max-content'
              gap={6}
            >
              <GridItem>
                <Text>{`Created: ${formatDate(post.createdOn)}`}</Text>
              </GridItem>
              <Spacer />
              <GridItem justifySelf={'end'}>
                <Text>{`Author: ${post.author}`}</Text>
              </GridItem>
            </Grid>
          </CardBody>

          {editEnable ? (
            <>
              <CardFooter flexDirection={'row'} justify={'end'}>
                {post.likedBy.length > 0 ? (
                  <Tooltip label={`Likes: ${post.likedBy}`} placement='right'>
                    <Text m={2}>{`Likes: ${post.likedBy.length}`}</Text>
                  </Tooltip>
                ) : (
                  <Text m={2}>No likes yet</Text>
                )}
                <Spacer />
                {post?.likedBy.includes(userData?.handle) ? (
                  <Button onClick={dislike} style={{ marginRight: '10px' }}>
                    Dislike
                  </Button>
                ) : (
                  <Button onClick={like} style={{ marginRight: '10px' }}>
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
            <Flex justify={'end'}>
              <Button
                colorScheme='green'
                id='isChecked'
                _selected={{ bg: 'green.500', color: 'white' }}
                style={{ margin: '10px' }}
                onClick={() => editPost()}
              >
                Finish Editing
              </Button>
              <Button
                colorScheme='green'
                id='isChecked'
                _selected={{ bg: 'green.500', color: 'white' }}
                style={{ margin: '10px' }}
                onClick={() => setEditEnable(!editEnable)}
              >
                Cancel
              </Button>
            </Flex>
          )}
        </Stack>
      </Card>

      <Divider m={2} />

      <Comment
        comments={comments}
        setComments={setComments}
        setEditPostState={setEditPostState}
        postId={post.id}
        setDeleteToggle={setDeleteToggle}
      />
    </>
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
