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
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { likePost, dislikePost } from '../services/posts.service';
import { useNavigate } from 'react-router-dom';
import { getUploadedPhoto } from '../config/firebase-config';

export default function Post({ post }) {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const like = () => likePost(post.id, userData.handle);
  const dislike = () => dislikePost(post.id, userData.handle);
  const [url, setUrl] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getUrl = async () => {
      const result = await getUploadedPhoto(post.id);
      setUrl(result);
    };
    getUrl();
  }, [post.id]);

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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
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
                <Button onClick={() => navigate(`/posts/${post.id}`)}>
                  View Recipe
                </Button>
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
