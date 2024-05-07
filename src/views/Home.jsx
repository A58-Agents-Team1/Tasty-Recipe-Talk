import { Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllPosts } from "../services/posts.service";
import Post from "../components/Post";


export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts('').then(setPosts);
  }, []);

  return (
    <div>
      <Heading>Welcome to Tasty Recipe Talk</Heading>
      <Text>Here you can find and share your favorite recipes!</Text>
      {posts && (
        posts.slice(0, 5).map((post) => (
          <Post key={post.id} post={post} />
        ))
      )}
    </div>
  );
}
