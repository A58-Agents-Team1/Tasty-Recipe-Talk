import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../config/firebase-config';
import FullPost from '../components/FullPost';
import { Flex, Heading } from '@chakra-ui/react';

export default function FullViewRecipe() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    return onValue(ref(db, `posts/${id}`), (snapshot) => {
      setPost({
        ...snapshot.val(),
        id,
        likedBy: snapshot.val().likedBy
          ? Object.keys(snapshot.val().likedBy)
          : [],
        createdOn: new Date(snapshot.val().createdOn).toString(),
      });
    });
  }, [id]);

  return (
    <Flex
      p={4}
      direction='column'
      border='2px'
      borderRadius='md'
      borderColor='gray.800'
      background={'yellow.300'}
    >
      <Heading
        p={2}
        align='center'
        border='2px'
        borderRadius='md'
        borderColor='gray.800'
        background={'yellow.100'}
      >
        Full Post Review
      </Heading>
      {post && <FullPost post={post} />}
    </Flex>
  );
}
