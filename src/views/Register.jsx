import { useEffect, useState } from "react";
import { registerUser } from "../services/auth.service.js";
import {
  createUserHandle,
  getUserByHandle,
} from "../services/users.service.js";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { NavLink } from "react-router-dom";
import { useToast, Button, Heading } from "@chakra-ui/react";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const { user, setAppState } = useContext(AppContext);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const updateForm = (props) => (e) => {
    setForm({
      ...form,
      [props]: e.target.value,
    });
  };

  const register = async () => {
    // TODO: validate form data
    try {
      const user = await getUserByHandle(form.userName);
      if (user.exists()) {
        return console.log("User with this username already exists!");
      }
      const credential = await registerUser(form.email, form.password);
      console.log(credential.user);
      await createUserHandle(
        form.userName,
        credential.user.uid,
        credential.user.email,
        form.firstName,
        form.lastName
      );
      setAppState({ user: credential.user, userData: null });
      navigate("/");
      showToast(); // Call function to show toast
    } catch (error) {
      if (error.message.includes("auth/email-already-in-use")) {
        console.log("User has already been registered!");
      }
    }
  };

  const showToast = () => {
    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <div>
      <Heading>Register</Heading>
      <label htmlFor="firstName">First Name:</label>
      <input
        value={form.firstName}
        onChange={updateForm("firstName")}
        type="text"
        name="firstName"
        id="firstName"
      />
      <br />
      <br />
      <label htmlFor="lastName">Last Name:</label>
      <input
        value={form.lastName}
        onChange={updateForm("lastName")}
        type="text"
        name="lastName"
        id="lastName"
      />
      <br />
      <br />
      <label htmlFor="userName">User Name:</label>
      <input
        value={form.userName}
        onChange={updateForm("userName")}
        type="text"
        name="userName"
        id="userName"
      />
      <br />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        value={form.email}
        onChange={updateForm("email")}
        type="text"
        name="email"
        id="email"
      />
      <br />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        value={form.password}
        onChange={updateForm("password")}
        type="password"
        name="password"
        id="password"
      />
      <br />
      <br />
      <Button onClick={register}>Register</Button>
      <Button><NavLink to="/login">Have an account</NavLink></Button>
    </div>
  );
}
