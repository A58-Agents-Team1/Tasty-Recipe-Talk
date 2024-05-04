import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Text,
  Button,
  Stack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { likePost, dislikePost } from "../services/posts.service";
import { AlertDialogExample } from "./Alerts";
import { Link } from 'react-router-dom';

export default function Post({ post }) {
  const { userData } = useContext(AppContext);
  const like = () => likePost(post.id, userData.handle);
  const dislike = () => dislikePost(post.id, userData.handle);

  return (
    <div className="single-post">
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        mt={3}
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src="https://www.eatingwell.com/thmb/LH-H61DAD-1Q3AgeN89BkrWKNEk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Chicken-piccata-casserole-3x2-167-f44730f489cc4b9493547de1c76a3b93.jpg"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Heading size="md">{post.title}</Heading>

            <Text py="2">{post.description}</Text>
          </CardBody>

          <CardFooter>
          <Button><Link to={`/posts/${post.id}`}>View Recipe</Link></Button>
            {post?.likedBy.includes(userData?.handle) ? (
              <Button onClick={dislike}>Dislike</Button>
            ) : (
              <Button onClick={like}>Like</Button>
            )}
            <AlertDialogExample postId={post.id} />
          </CardFooter>
        </Stack>
      </Card>
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
