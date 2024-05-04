import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { logoutUser } from "../services/auth.service.js";
import logo from "../../public/logo.png";
import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";

export default function NavBar() {
  const { user, userData, setAppState } = useContext(AppContext);

  const logout = async () => {
    await logoutUser();
    setAppState({ user: null, userData: null });
  };

  return (
    <Flex as="nav" p="10px" alignItems="center">
      <Heading>
        <NavLink to="/">
          <Avatar size="lg" name="Tasty Recipe Talk" src={logo}></Avatar>
        </NavLink>
      </Heading>
      <Spacer />
      {user ? (
        <>
          <HStack spacing="20px">
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink as={NavLink} to="/create-post">
                  Create post
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink as={NavLink} to="/all-posts">
                  All recipes
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink as={NavLink} to="blocked-accounts">
                  Blocked Account
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink as={NavLink} to="/about">
                  About
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </HStack>
          <Spacer />
          <HStack spacing="20px">
            <Text>{userData ? userData.handle : "Loading"}</Text>
            <Avatar size="sm" name={userData ? userData.handle : "Loading"} />
            <Button colorScheme="green" onClick={logout}>
              LogOut
            </Button>
          </HStack>
        </>
      ) : (
        <HStack spacing="20px">
          <ButtonGroup>
            <Button colorScheme="green">
              <NavLink to="/login">Login</NavLink>
            </Button>
            <Button colorScheme="orange">
              <NavLink to="/register">Register</NavLink>
            </Button>
          </ButtonGroup>
        </HStack>
      )}
    </Flex>
  );
}
