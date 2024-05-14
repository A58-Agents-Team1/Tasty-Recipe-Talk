import {
  Heading,
  Text,
  Box,
  Grid,
  GridItem,
  Image,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getAllPosts } from '../services/posts.service';
import Post from '../components/Post';
import logo from '/logo.png';

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
      backgroundColor={'yellow.300'}
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
        border={'2px solid black'}
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
        color={'black'}
        fontSize={'32px'}
        marginBottom={'20px'}
        textAlign={'center'}
      >
        Welcome to Tasty Recipe Talk
      </Heading>
      <Box
        p={4}
        color={'black'}
        fontSize={'18px'}
        textAlign={'center'}
        border='2px'
        borderRadius='md'
        borderColor='gray.800'
        background={'yellow.100'}
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
        <Text>Here you can see the four most liked and four latest posts!</Text>
      </Box>

      <Divider
        border={'2px solid'}
        borderRadius={'10px'}
        m={'20px'}
      />
      <Heading>The most liked recipes</Heading>
      <Grid
        templateColumns={'repeat(2, 1fr)'}
        gap={'2'}
      >
        {posts &&
          posts
            .toSorted((a, b) => b.likedBy.length - a.likedBy.length)
            .slice(0, 4)
            .map((post) => (
              <GridItem key={post.id}>
                <Post post={post} />
              </GridItem>
            ))}
      </Grid>
      <Divider
        border={'2px solid'}
        borderRadius={'10px'}
        m={'20px'}
      />
      <Heading>Latest recipes</Heading>
      <Grid
        templateColumns={'repeat(2, 1fr)'}
        gap={'2'}
      >
        {posts
          ? posts
              .sort((a, b) => {
                const keyA = new Date(a['createdOn']);
                const keyB = new Date(b['createdOn']);
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
              })
              .slice(0, 4)
              .map((post) => (
                <GridItem key={post.id}>
                  <Post post={post} />
                </GridItem>
              ))
          : null}
      </Grid>
    </Flex>
  );
}
