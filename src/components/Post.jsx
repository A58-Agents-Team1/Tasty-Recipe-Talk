import PropTypes from "prop-types";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { likePost, dislikePost } from "../services/posts.service";
import { Text } from "@chakra-ui/react";

export default function Post({ post }) {
  const { userData } = useContext(AppContext);
  const like = () => likePost(post.id, userData.handle);
  const dislike = () => dislikePost(post.id, userData.handle);

  return (
    <div>
      <Text>{post.title}</Text>
      <Text>{post.description}</Text>
      <Text>{post.recipe}</Text>
      <Text>
        By: {post.author},{" "}
        {new Date(post.createdOn).toLocaleDateString("bg-BG")}
      </Text>
      <Link to={`/posts/${post.id}`}>View</Link>
      {post?.likedBy.includes(userData?.handle) ? (
        <button onClick={dislike}>Dislike</button>
      ) : (
        <button onClick={like}>Like</button>
      )}
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    recipe: PropTypes.string.isRequired,
    createdOn: PropTypes.string,
    likedBy: PropTypes.array,
  }),
};
