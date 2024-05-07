import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Text,
  Button,
  Stack,
  ButtonGroup,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { likePost, dislikePost } from '../services/posts.service';
import { AlertDialogExample } from './Alerts';
import { Link } from 'react-router-dom';
import { CanDelete } from '../hoc/Authenticated';
import { getUploadedPhoto } from '../config/firebase-config';

export default function Post({ post }) {
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
        shadow={{ base: 'md', sm: 'xl' }}
        
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src={url}
          alt='Card image'
        />

        <Stack
          width='100%'
          p={2}
        >
          <CardBody>
            <Heading size='lg'>{post.title}</Heading>
            <Text py='2'>{post.content}</Text>
          </CardBody>
          <CardFooter
            width='100%'
            justify='space-between'
            fontWeight={600}
          >
            <Text align='center'>Created By: {post.author}</Text>
            {userData && (
            <ButtonGroup
              spacing={2}
              alignItems='center'
            >
              <Text>
                {post.likedBy.length === 0
                  ? 'No likes yet'
                  : post.likedBy.length === 1
                  ? 'Liked by 1 person'
                  : `Liked by ${post.likedBy.length} people`}
              </Text>

              {post?.likedBy.includes(userData?.handle) ? (
                <Button onClick={dislike}>Dislike</Button>
              ) : (
                <Button onClick={like}>Like</Button>
              )}
              <Button>
                <Link to={`/posts/${post.id}`}>View Recipe</Link>
              </Button>
              <CanDelete>
                <AlertDialogExample postId={post.id} />
              </CanDelete>
            </ButtonGroup>
          )}
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
}

Post.propTypes = {
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
