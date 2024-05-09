import {
  Heading,
  Text,
  Box,
  Grid,
  GridItem,
  Image,
  Flex,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getAllPosts } from '../services/posts.service';
import Post from '../components/Post';
import logo from '/logo.png';
import background from '../../public/background.jpg';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      const allPosts = await getAllPosts('');
      setPosts(allPosts);
    };
    getPost();
  }, [posts]);

  return (
    <Flex
      direction={'column'}
      align={'center'}
      w={'100%'}
      padding={'20px'}
      borderRadius={'10px'}
      boxShadow={'2xl'}
      backgroundImage={`url(${background})`}
      backgroundSize={'cover'}
      backgroundPosition={'center'}
      backgroundRepeat={'no-repeat'}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        marginBottom={'20px'}
        borderRadius={'10px'}
        bgGradient={'linear(to-r,green.400, green.700, green.500)'}
        w='100%'
        shadow={'2xl'}
        p={'1rem '}
      >
        <Image
          border='2px solid'
          borderRadius='full'
          src={logo}
          boxSize='sm'
          alt='Tasty Recipe Talk'
        />
      </Box>

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
      <Grid
        gap={'20px'}
        templateColumns={'repeat(2, 1fr)'}
      >
        {posts &&
          posts
            .slice() // Create a copy of the posts array to avoid mutating the original array
            .sort((a, b) => b.likedBy.length - a.likedBy.length) // Sort the posts by likedBy.length in descending order
            .slice(0, 4) // Take the first 4 sorted posts
            .map((post) => (
              <GridItem key={post.id}>
                <Post post={post} />
              </GridItem>
            ))}
      </Grid>
    </Flex>
  );
}
