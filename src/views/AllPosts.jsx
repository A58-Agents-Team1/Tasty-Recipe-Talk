import { useContext, useEffect, useState } from 'react';
import Post from '../components/Post';
import { NavLink, useSearchParams } from 'react-router-dom';
import { onChildChanged, ref } from 'firebase/database';
import { db } from '../config/firebase-config';
import { getAllPosts } from '../services/posts.service';
import {
  Box,
  Flex,
  FormLabel,
  Input,
  Tab,
  TabList,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { AppContext } from '../context/AppContext';

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const [sortBy, setSortBy] = useState('createdOn');
  const { userData } = useContext(AppContext);

  const setSearch = (value) => {
    setSearchParams({ search: value });
  };

  useEffect(() => {
    getAllPosts(search).then(setPosts);
  }, [search]);

  useEffect(() => {
    return onChildChanged(ref(db, 'posts'), (snapshot) => {
      const value = snapshot.val();
      setPosts((posts) =>
        posts.map((post) => {
          if (post.author === value.author && post.title === value.title) {
            if (value.likedBy) {
              post.likedBy = Object.keys(value.likedBy);
            } else {
              post.likedBy = [];
            }
            return post;
          } else {
            return post;
          }
        })
      );
    });
  }, [sortBy]);

  return (
    <Box
      w={'100%'}
      p={4}
      border='2px'
      borderRadius='md'
      borderColor='gray.800'
      background={'yellow.300'}
    >
      <Flex my={5} align={'center'} justify={'center'}>
        <Flex
          p={4}
          border='2px'
          borderRadius='md'
          borderColor='gray.800'
          background={'yellow.100'}
          justifyContent='space-between'
        >
          <Tabs variant='enclosed' color={'black'} align='center'>
            <TabList align='center' borderColor={'black'}>
              <Box
                as='label'
                alignSelf={'center'}
                fontWeight={800}
                fontSize={30}
                mx='3'
              >
                Sort by:
              </Box>
              <Tab
                _selected={{
                  color: 'gray.100',
                  textColor: 'black',
                  bg: 'yellow.300',
                  borderColor: 'gray.800',
                }}
                onClick={() => setSortBy('createdOn')}
              >
                Created
              </Tab>
              <Tab
                _selected={{
                  color: 'gray.100',
                  textColor: 'black',
                  bg: 'yellow.300',
                  borderColor: 'gray.800',
                }}
                onClick={() => setSortBy('likedBy')}
              >
                Likes
              </Tab>
              <Tab
                _selected={{
                  color: 'gray.100',
                  textColor: 'black',
                  bg: 'yellow.300',
                  borderColor: 'gray.800',
                }}
                onClick={() => setSortBy('comments')}
              >
                Comments
              </Tab>
            </TabList>
          </Tabs>
          <FormLabel
            fontWeight={800}
            fontSize={30}
            color={'black'}
            htmlFor='search'
          >
            Search:{' '}
          </FormLabel>
          <Input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name='search'
            id='search'
            placeholder='Search for a recipe by title'
            backgroundColor='gray.200'
            fontWeight={800}
            fontSize={24}
            w={'40%'}
            border='2px'
            borderRadius='md'
            borderColor='gray.800'
          />
        </Flex>
      </Flex>
      {posts.length !== 0 ? (
        <>
          {posts
            .filter((post) => post[sortBy] !== undefined)
            .sort((a, b) => {
              if (sortBy === 'createdOn') {
                const keyA = new Date(a[sortBy]);
                const keyB = new Date(b[sortBy]);
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
              }
              const keyA = Object.values(a[sortBy]).length;
              const keyB = Object.values(b[sortBy]).length;
              if (keyA < keyB) return 1;
              if (keyA > keyB) return -1;
              return 0;
            })
            .map((post) => (
              <Post key={post.id} post={post} />
            ))}
        </>
      ) : searchParams === '' ? (
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
            <strong>{userData?.handle}</strong>! Why not share your delicious
            recipe and kickstart a flavorful journey for others to follow?
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
      ) : (
        <Text
          fontSize={24}
          textAlign='center'
          p='4'
          border='2px solid'
          borderRadius='md'
          borderColor='gray.800'
          background='yellow.100'
        >
          It seems there are no results matching your search criteria.
        </Text>
      )}
    </Box>
  );
}
