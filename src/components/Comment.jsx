import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
  Stack,
  StackDivider,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ChevronDownIcon, EditIcon } from '@chakra-ui/icons';
import {
  dislikeComment,
  likeComment,
  updateComment,
} from '../services/posts.service';
import { CanDelete } from '../hoc/Authenticated';
import { AlertDialogExample } from './Alerts';
import { formatDate } from '../helper/format-date';
import { getProfilePicture } from '../config/firebase-config';

export default function Comment({
  comments,
  setComments,
  setEditPostState,
  postId,
  setDeleteToggle,
  setRefresh,
}) {
  const { userData } = useContext(AppContext);
  const [newComment, setNewComment] = useState('');
  const [prevComment, setPrevComment] = useState('');
  const [editToggle, setEditToggle] = useState(false);
  const [authorPhotos, setAuthorPhotos] = useState({});
  const [sortBy, setSortBy] = useState('createdOn');

  const likeFunc = async (post, commentId, username) => {
    await likeComment(post, commentId, username);
    setRefresh((prev) => !prev);
  };

  const dislikeFunc = async (post, commentId, username) => {
    await dislikeComment(post, commentId, username);
    setRefresh((prev) => !prev);
  };

  const handleEditToggle = (content) => {
    setEditToggle(!editToggle);
    setPrevComment(content);
    setNewComment(content);
  };

  const handleEditComment = async (id, commentId, content) => {
    await updateComment(id, commentId, content);

    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            content: content,
            lastEdited: Date.now(),
          };
        }
        setPrevComment(comment.content);
        return comment;
      })
    );
    setEditPostState((prev) => !prev);
    setEditToggle(false);
  };

  const handleCancelComment = () => {
    setEditToggle(false);
    setPrevComment('');
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      const newAuthorPhotos = {};
      for (const comment of comments) {
        if (!newAuthorPhotos[comment.author])
          newAuthorPhotos[comment.author] = await getProfilePicture(
            comment.author
          );
      }
      setAuthorPhotos(newAuthorPhotos);
    };

    fetchPhotos();
  }, [comments]);

  return (
    <Card
      border='2px'
      borderRadius='md'
      borderColor='gray.800'
      background={'yellow.100'}
    >
      <CardHeader>
        <Flex justify='space-between' align='center'>
          <Heading size='md'>Comments</Heading>
          <Menu>
            <MenuButton
              border={'2px solid'}
              colorScheme='cyan'
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              Filter
            </MenuButton>
            <MenuList backgroundColor={'yellow.200'} border={'2px solid'}>
              <MenuItem
                _hover={{ backgroundColor: 'yellow.100' }}
                backgroundColor={'yellow.200'}
                onClick={() => setSortBy('createdOn')}
              >
                Created On
              </MenuItem>
              <MenuItem
                _hover={{ backgroundColor: 'yellow.100' }}
                backgroundColor={'yellow.200'}
                onClick={() => setSortBy('lastEdited')}
              >
                Last Edit
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider border={'1px'} />} spacing='4'>
          {comments.length > 0 ? (
            comments
              .sort((a, b) => {
                const keyA = new Date(a[sortBy]);
                const keyB = new Date(b[sortBy]);
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
              })
              .map((comment) => {
                return (
                  <Box key={comment.id}>
                    <Box>
                      <Heading
                        size='xs'
                        textTransform='uppercase'
                        display='flex'
                        flexDirection={{ base: 'column', md: 'row' }}
                      >
                        <Avatar
                          size='sm'
                          name={comment.author ? comment.author : ''}
                          src={authorPhotos[comment.author] || ''}
                        />
                        <Text as='div' m={2}>
                          {comment.author ? comment.author : <Spinner />}
                        </Text>
                      </Heading>

                      {comment?.likedBy &&
                      Object.keys(comment?.likedBy).length > 0 ? (
                        <Tooltip
                          label={`Likes: ${Object.keys(comment.likedBy)}`}
                          placement='top'
                        >
                          <Text m={2}>{`Likes: ${
                            Object.keys(comment.likedBy).length
                          }`}</Text>
                        </Tooltip>
                      ) : (
                        <Text m={2}>No likes yet</Text>
                      )}
                      {comment.likedBy &&
                      Object.keys(comment.likedBy)[0] === userData?.handle ? (
                        <Button
                          onClick={() =>
                            dislikeFunc(postId, comment.id, userData?.handle)
                          }
                          style={{ marginRight: '10px' }}
                          colorScheme='red'
                        >
                          Dislike
                        </Button>
                      ) : (
                        <Button
                          onClick={() =>
                            likeFunc(postId, comment.id, userData?.handle)
                          }
                          style={{ marginRight: '10px' }}
                          colorScheme='green'
                        >
                          Like
                        </Button>
                      )}

                      {editToggle && prevComment === comment.content ? (
                        <Input
                          m={3}
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          border={'2px solid'}
                          backgroundColor={'gray.100'}
                        />
                      ) : (
                        <Text
                          pt='2'
                          fontSize='lg'
                          border={'3px dotted'}
                          borderRadius={'md'}
                          backgroundColor={'yellow.200'}
                          p={2}
                          m={3}
                        >
                          {comment.content}
                        </Text>
                      )}

                      {(userData.userRole === 'admin' ||
                        userData.handle === comment.author) && (
                        <Flex flexDirection='row-reverse'>
                          {editToggle && prevComment === comment.content ? (
                            <Box mt={2}>
                              <Button
                                colorScheme='green'
                                mx={2}
                                onClick={() =>
                                  handleEditComment(
                                    postId,
                                    comment.id,
                                    newComment
                                  )
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                colorScheme='red'
                                onClick={() => handleCancelComment()}
                              >
                                Cancel
                              </Button>
                            </Box>
                          ) : (
                            <>
                              <CanDelete postAuthor={comment.author}>
                                <AlertDialogExample
                                  postId={postId}
                                  title='Delete Comment'
                                  commentId={comment.id}
                                  setDeleteToggle={setDeleteToggle}
                                />
                              </CanDelete>
                              {userData.handle === comment.author && (
                                <Icon
                                  mr={4}
                                  aria-label='Edit Icon'
                                  as={EditIcon}
                                  onClick={() => {
                                    handleEditToggle(comment.content);
                                  }}
                                  boxSize={10}
                                  cursor={'pointer'}
                                />
                              )}
                            </>
                          )}
                        </Flex>
                      )}

                      <Flex align='end' justify='center'>
                        {comment.createdOn !== comment.lastEdited && (
                          <Text fontWeight='500' mt='4'>
                            Last Edit: {formatDate(comment.lastEdited)}
                          </Text>
                        )}

                        <Spacer />

                        <Text fontWeight='500' mt='4'>
                          Created: {formatDate(comment.createdOn)}
                        </Text>
                      </Flex>
                    </Box>
                  </Box>
                );
              })
          ) : (
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                No Comments yet
              </Heading>
              <Text pt='2' fontSize='sm'>
                Congratulations you can be the first one who will comment that
                post.
              </Text>
            </Box>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}

Comment.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
  setDeleteToggle: PropTypes.func.isRequired,
  setComments: PropTypes.func.isRequired,
  setEditPostState: PropTypes.func.isRequired,
  setRefresh: PropTypes.func.isRequired,
};
