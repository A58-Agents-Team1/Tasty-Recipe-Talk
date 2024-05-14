import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Spacer,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { addComment } from '../services/posts.service';
import PropTypes from 'prop-types';

export default function AddComment({ postId, setPostButtonClicked }) {
  const { userData } = useContext(AppContext);

  const [comment, setComment] = useState('');

  const handleComment = async () => {
    await addComment(postId, userData.handle, comment);
    setPostButtonClicked(false);
  };

  return (
    <Grid
      p={4}
      m={2}
      border='2px solid'
      borderRadius='2xl'
      borderColor='black'
      templateColumns='repeat(1,2fr)'
      backgroundColor={'yellow.200'}
    >
      <FormControl>
        <GridItem>
          <FormLabel htmlFor='comment'>Comment</FormLabel>
          <Input
            type='text'
            name='comment'
            value={comment}
            placeholder='Add a comment'
            onChange={(e) => setComment(e.target.value)}
            border={'2px'}
            borderColor={'black'}
            backgroundColor={'white'}
          />
        </GridItem>
        <GridItem>
          <Flex>
            <Spacer />

            <Button colorScheme={'green'} onClick={handleComment} mt={2} mx={2}>
              Add Comment
            </Button>
            <Button
              colorScheme='red'
              onClick={() => setPostButtonClicked(false)}
              mt={2}
            >
              Cancel
            </Button>
          </Flex>
        </GridItem>
      </FormControl>
    </Grid>
  );
}
AddComment.propTypes = {
  postId: PropTypes.string.isRequired,
  setPostButtonClicked: PropTypes.func.isRequired,
};
