import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { loginUser } from "../services/auth.service.js";
import { NavLink } from "react-router-dom";
import { Heading, Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from '@chakra-ui/react';

export default function Login() {
  const { user, setAppState } = useContext(AppContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate(location.state?.from.pathname || "/");
    }
  }, [user]);

  const login = async () => {
    const { user } = await loginUser(form.email, form.password);
    setAppState({ user, userData: null });
    navigate(location.state?.from.pathname || "/");
  };

  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  return (
    <div>
      <Heading>Login</Heading>
      <label htmlFor="email">Email: </label>
      <input
        value={form.email}
        onChange={updateForm("email")}
        type="text"
        name="email"
        id="email"
      />
      <label htmlFor="password">Password: </label>
      <input
        value={form.password}
        onChange={updateForm("password")}
        type="password"
        name="password"
        id="password"
      />{" "}
      <br /> <br />
      <br />
      <Button onClick={login}>Login</Button>
      <Text>Don`t have an account ?</Text>
      <Button><NavLink to="/register">Register</NavLink></Button>
    </div>
  );
}
