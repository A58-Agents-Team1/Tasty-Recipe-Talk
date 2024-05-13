import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { getAllPosts } from '../services/posts.service';
import { AppContext } from '../context/AppContext';
import Post from '../components/Post';
import { NavLink } from 'react-router-dom';

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const { userData } = useContext(AppContext);

  useEffect(() => {
    getAllPosts('').then(setPosts);
  }, [posts]);

  return (
    <Box w={'100%'}>
      <Heading textAlign={'center'}>My recipes: </Heading>
      <br />
      {posts.filter((post) => post.author === userData?.handle).length !== 0 ? ( // Filter the posts by author
        <>
          {posts
            .filter((post) => post.author === userData?.handle) // Sort the posts by author
            .map((post) => (
              <Post key={post.id} post={post} />
            ))}
        </>
      ) : (
        <Flex
          flexDirection='column'
          alignItems='center'
          p='4'
          border='2px solid'
          borderRadius='md'
          borderColor='gray.800'
          background='yellow.100'
          boxShadow='lg'
          mb='4'
        >
          <Text fontSize={24} mb={2} align={'center'}>
            Looks like your culinary adventure is just getting started,{' '}
            {userData.handle}! Why not share your delicious recipe and kickstart
            a flavorful journey for others to follow?
          </Text>

          <Flex alignItems='center'>
            <Text fontSize={16} marginRight={2}>
              Here you can create your first post:
            </Text>
            <NavLink
              to='/create-post'
              style={{ fontWeight: 'bold', fontSize: 16 }}
            >
              Create Post
            </NavLink>
          </Flex>
        </Flex>
      )}
    </Box>
  );
}
