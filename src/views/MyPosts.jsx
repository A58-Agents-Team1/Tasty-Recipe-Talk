import { Box, Heading } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { getAllPosts } from '../services/posts.service';
import { AppContext } from '../context/AppContext';
import Post from '../components/Post';

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const { userData } = useContext(AppContext);

  useEffect(() => {
    getAllPosts('').then(setPosts);
  }, []);

  return (
    <Box w={'100%'}>
      <Heading textAlign={'center'}>My recipes: </Heading>
      <br />
      {posts.length !== 0 ? (
        <>
          {posts
            .slice() // Create a copy of the posts array to avoid mutating the original array
            .filter((post) => post.author === userData.handle) // Sort the posts by author
            .map((post) => (
              <Post key={post.id} post={post} />
            ))}
        </>
      ) : (
        <Heading>No posts found</Heading>
      )}
    </Box>
  );
}
