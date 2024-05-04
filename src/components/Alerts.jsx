import React from "react";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  useDisclosure,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { deletePost } from "../services/users.service";
import { useNavigate } from "react-router-dom";

export function AlertDialogExample({ postId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const cancelRef = React.useRef();

  function handleDelete() {
    deletePost(postId);
    onClose();
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
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Recipe Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
