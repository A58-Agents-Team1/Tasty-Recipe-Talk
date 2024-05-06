import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../config/firebase-config';
import FullPost from '../components/FullPost';
import { Heading } from '@chakra-ui/react';
import { AppContext } from '../context/AppContext';

export default function FullViewRecipe() {
  const [post, setPost] = useState(null);
  const { userData } = useContext(AppContext);
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
    <div>
      <Heading align='center'>Full Post Review</Heading>
      {post && <FullPost post={post} />}
      {userData && userData.isBlocked && (
        <Heading
          align='center'
          color='red.500'
        >
          You are not able to leave comments because you are Blocked!
        </Heading>
      )}
    </div>
  );
}
