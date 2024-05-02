import { useEffect, useState } from 'react';
import Post from '../components/Post';
import { useSearchParams } from 'react-router-dom';
import { onChildChanged, ref } from 'firebase/database';
import { db } from '../config/firebase-config';
import { getAllPosts } from '../services/posts.service';

export default function AllPosts() {

  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

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
  }, []);

  return (
    <div>
      <h1>All recipes</h1>
      <label htmlFor='search'>Search</label><br />
      <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} name='search' id='search'/><br />
      {posts.map((post) => ( <Post key={post.id} post={post} />))}
    </div>
  );
}