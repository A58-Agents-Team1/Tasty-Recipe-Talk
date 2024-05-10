import { useEffect, useState } from 'react';
import Post from '../components/Post';
import { Form, useSearchParams } from 'react-router-dom';
import { onChildChanged, ref } from 'firebase/database';
import { db } from '../config/firebase-config';
import { getAllPosts } from '../services/posts.service';
import {
  Box,
  Flex,
  FormLabel,
  Heading,
  Input,
  Tab,
  TabList,
  Tabs,
} from '@chakra-ui/react';

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const [sortBy, setSortBy] = useState('createdOn');

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
    <Box w={'100%'}>
      <Flex mt={5} align={'center'} justify={'center'}>
        <FormLabel fontWeight={800} fontSize={30} htmlFor='search'>
          Search:{' '}
        </FormLabel>
        <Input
          title='Search for a recipe'
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          name='search'
          id='search'
          backgroundColor='white'
          w={'30%'}
        />
      </Flex>
      <br />
      {posts.length !== 0 ? (
        <>
          <Tabs variant='enclosed' color={'white'}>
            <TabList>
              <Tab
                _selected={{ color: 'white', bg: 'blue.500' }}
                onClick={() => setSortBy('comments')}
              >
                by comments
              </Tab>
              <Tab
                _selected={{ color: 'white', bg: 'red.500' }}
                onClick={() => setSortBy('likedBy')}
              >
                by likes
              </Tab>
              <Tab
                _selected={{ color: 'white', bg: 'orange.500' }}
                onClick={() => setSortBy('createdOn')}
              >
                created on
              </Tab>
            </TabList>
          </Tabs>
          {posts
            .filter((post) => post[sortBy] !== undefined)
            .sort((a, b) => {
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
      ) : (
        <Heading>No posts found</Heading>
      )}
    </Box>
  );
}
