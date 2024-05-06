import { useContext, useState } from "react";
import { addPost } from "../services/posts.service";
import { AppContext } from "../context/AppContext";
import { useToast, Heading } from "@chakra-ui/react";
import { showToast } from "../components/Alerts";
import { IsBlocked } from "../hoc/Authenticated";

export const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    recipe: "",
  });

  const { userData } = useContext(AppContext);
  const toast = useToast();

  const updatePost = (value, key) => {
    setPost({ ...post, [key]: value });
  };

  const createPost = async () => {
    await addPost(userData.handle, post.title, post.description, post.recipe);
    setPost({
      title: "",
      description: "",
      recipe: "",
    });
    showToast("Post created.","You created a post successfully.",toast)
  };

  return (
    <div>
      <Heading>Create a recipe!</Heading>
      <label htmlFor="input-title">Title:</label>
      <br />
      <input
        type="text"
        value={post.title}
        onChange={(e) => updatePost(e.target.value, "title")}
        name="title"
        id="title"
      />
      <br />
      <label htmlFor="input-description">Short description</label>
      <br />
      <textarea
        name="input-description"
        id="input-description"
        cols="50"
        rows="5"
        value={post.description}
        onChange={(e) => updatePost(e.target.value, "description")}
      ></textarea>
      <br />
      <label htmlFor="input-recipe">Recipe:</label>
      <br />
      <textarea
        name="input-recipe"
        id="input-recipe"
        cols="50"
        rows="7"
        value={post.recipe}
        onChange={(e) => updatePost(e.target.value, "recipe")}
      ></textarea>
      <br />
      <IsBlocked>
      <button onClick={createPost}>Create post</button>
      </IsBlocked>
    </div>
  );
};
