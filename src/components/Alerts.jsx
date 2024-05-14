import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  useDisclosure,
  AlertDialogHeader,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { deletePost } from '../services/users.service';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { deleteComment } from '../services/posts.service';

export function AlertDialogExample({
  postId,
  title,
  commentId = undefined,
  setDeleteToggle = undefined,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();

  function handleDelete() {
    if (commentId) {
      deleteComment(postId, commentId).then(() =>
        setDeleteToggle((prev) => !prev)
      );
      onClose();
    } else {
      deletePost(postId);
      navigate('/', { replace: true });
      onClose();
    }
  }

  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>
        <DeleteIcon />
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent backgroundColor={'yellow.100'}>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {title}
            </AlertDialogHeader>

            <AlertDialogBody fontWeight={'600'}>
              Are you sure? You can`t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter gap={2}>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Delete
              </Button>
              <Button ref={cancelRef} colorScheme='green' onClick={onClose}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export const showToast = (title, description, toast) => {
  toast({
    title: title,
    description: description,
    status: 'success',
    duration: 4000,
    isClosable: true,
  });
};

export const showToastError = (title, message, toast) => {
  toast({
    title: title,
    description: message,
    status: 'error',
    duration: 5000,
    isClosable: true,
  });
};

AlertDialogExample.propTypes = {
  postId: PropTypes.string,
  title: PropTypes.string,
  commentId: PropTypes.string || undefined,
  setDeleteToggle: PropTypes.func,
};
