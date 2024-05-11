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
  Spacer,
  Spinner,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { EditIcon } from '@chakra-ui/icons';
import { updateComment } from '../services/posts.service';
import { CanDelete } from '../hoc/Authenticated';
import { AlertDialogExample } from './Alerts';
import { formatDate } from '../helper/format-date';

export default function Comment({
  comments,
  setComments,
  setEditPostState,
  postId,
  setDeleteToggle,
}) {
  const { userData } = useContext(AppContext);

  const [newComment, setNewComment] = useState('');
  const [prevComment, setPrevComment] = useState('');
  const [editToggle, setEditToggle] = useState(false);

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

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Comments</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider border={'1px'} />} spacing='4'>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Box key={comment.id}>
                <Heading
                  size='xs'
                  textTransform='uppercase'
                  display='flex'
                  flexDirection={{ base: 'column', md: 'row' }}
                >
                  <Avatar
                    size='sm'
                    name={comment.author ? comment.author : ''}
                    src={comment.authorPicture ? userData.avatar : ''}
                  />
                  <Text as='div' m={2}>
                    {comment.author ? comment.author : <Spinner />}
                  </Text>
                </Heading>

                {editToggle && prevComment === comment.content ? (
                  <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                ) : (
                  <Text
                    pt='2'
                    fontSize='lg'
                    border={'1px solid'}
                    borderRadius={'md'}
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
                          mx={2}
                          onClick={() =>
                            handleEditComment(postId, comment.id, newComment)
                          }
                        >
                          Edit
                        </Button>
                        <Button onClick={() => handleCancelComment()}>
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
            ))
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
};
