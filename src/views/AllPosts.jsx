import { useEffect, useState } from 'react';
import Post from '../components/Post';
import { useSearchParams } from 'react-router-dom';
import { onChildChanged, ref } from 'firebase/database';
import { db } from '../config/firebase-config';
import { getAllPosts } from '../services/posts.service';
import {
  Box,
  Flex,
  FormLabel,
  Heading,
  Input,
  Spacer,
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
      <Flex
        my={5}
        align={'center'}
        justify={'center'}
      >
        <Tabs
          variant='enclosed'
          color={'gray.100'}
          align='center'
        >
          <TabList align='center'>
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
                bg: 'yellow.100',
              }}
              onClick={() => setSortBy('comments')}
            >
              Comments
            </Tab>
            <Tab
              _selected={{
                color: 'gray.100',
                textColor: 'black',
                bg: 'yellow.100',
              }}
              onClick={() => setSortBy('likedBy')}
            >
              Likes
            </Tab>
            <Tab
              _selected={{
                color: 'gray.100',
                textColor: 'black',
                bg: 'yellow.100',
              }}
              onClick={() => setSortBy('createdOn')}
            >
              Created
            </Tab>
          </TabList>
        </Tabs>
        <Spacer />
        <FormLabel
          fontWeight={800}
          fontSize={30}
          color={'gray.100'}
          htmlFor='search'
        >
          Search:{' '}
        </FormLabel>
        <Input
          title='Search for a recipe'
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          name='search'
          id='search'
          placeholder='Search for a recipe'
          backgroundColor='gray.100'
          fontWeight={800}
          fontSize={24}
          w={'40%'}
        />
      </Flex>
      {posts.length !== 0 ? (
        <>
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
              <Post
                key={post.id}
                post={post}
              />
            ))}
        </>
      ) : (
        <Heading>No posts found</Heading>
      )}
    </Box>
  );
}
