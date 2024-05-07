import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { likePost, dislikePost } from '../services/posts.service';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUploadedPhoto } from '../config/firebase-config';
import { useState } from 'react';

export default function FullPost({ post }) {
  const { userData } = useContext(AppContext);
  const like = () => likePost(post.id, userData.handle);
  const dislike = () => dislikePost(post.id, userData.handle);
  const [url, setUrl] = useState("");
  const getUrl = async () => {
   const result =  await getUploadedPhoto(post.title).then((data) => setUrl(data));
    return result; 
  }
  getUrl();

  return (
    <div className='single-post'>
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
            <Heading size='md'>{`Title: ${post.title}`}</Heading>
            <Text py='2'>{`Description: ${post.content}`}</Text>
            <br />
            <Text>{`Recipe: ${post.recipe}`}</Text>
            <br />
            <Text>
              {post.likedBy.length === 0
                ? 'No likes yet'
                : `Liked by: ${post.likedBy}`}
            </Text>
            <br />
            <Text>{`Author: ${post.author}`}</Text>
          </CardBody>

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
              <Button style={{ marginRight: '10px' }}>Add Comment</Button>
            )}
            {userData.handle === post.author && (
              <Button style={{ marginRight: '10px' }}>Edit Post</Button>
            )}
            <Button>
              <NavLink to={'/all-posts'}>Back</NavLink>
            </Button>
          </CardFooter>
        </Stack>
      </Card>
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
