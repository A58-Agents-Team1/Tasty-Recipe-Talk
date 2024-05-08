import { Heading, Text, Box, Grid, GridItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getAllPosts } from '../services/posts.service';
import Post from '../components/Post';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts('').then(setPosts);
  }, []);

  return (
    <Box
      background={'#f9f9f9'}
      padding={'20px'}
      borderRadius={'10px'}
      boxShadow={'2xl'}
    >
      <Heading
        color={'coral'}
        fontSize={'32px'}
        marginBottom={'20px'}
        textAlign={'center'}
      >
        Welcome to Tasty Recipe Talk
      </Heading>
      <Box
        color={'#555'}
        fontSize={'18px'}
        marginBottom={'10px'}
        textAlign={'center'}
      >
        <Text>
          On this Forum, you can find and share your favorite recipes!
        </Text>
        <Text>
          Whether you`re a seasoned chef or just starting out in the kitchen,
          our community is here to inspire and support you on your culinary
          journey.
        </Text>
        <Text>
          Join discussions, ask questions, and discover new recipes from food
          enthusiasts around the world.
        </Text>
        <Text>Here you can see the five latest posts:</Text>
      </Box>
      <Grid gap={'20px'} templateColumns={'repeat(2, 1fr)'}>
        {posts &&
          posts.slice(0, 4).map((post) => (
            <GridItem key={post.id}>
              <Post post={post} />
            </GridItem>
          ))}
      </Grid>
    </Box>
  );
}
