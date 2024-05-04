import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { logoutUser } from '../services/auth.service.js';
import logo from '/logo.png';
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
  Spinner,
  Text,
} from '@chakra-ui/react';

export default function NavBar() {
  const { user, userData, setAppState } = useContext(AppContext);

  const logout = async () => {
    await logoutUser();
    setAppState({ user: null, userData: null });
  };

  return (
    <Flex
      as='nav'
      alignItems='center'
      borderBottom='1px solid'
      borderColor={'gray.600'}
      p='1rem'
      mb='1rem'
      width='100%'
      bg='gray.500'
      color={'white'}
      justifyContent={'space-between'}
    >
      <Heading>
        <NavLink to='/'>
          <Avatar
            size='lg'
            name='Tasty Recipe Talk'
            src={logo}
            ignoreFallback={true}
          ></Avatar>
        </NavLink>
      </Heading>
      {user ? (
        <>
          <HStack spacing='20px'>
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink
                  as={NavLink}
                  to='/create-post'
                >
                  Create post
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink
                  as={NavLink}
                  to='/all-posts'
                >
                  All recipes
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink
                  as={NavLink}
                  to='blocked-accounts'
                >
                  Blocked Account
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink
                  as={NavLink}
                  to='/about'
                >
                  About
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink
                  as={NavLink}
                  to='/my-profile'
                >
                  My Profile
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </HStack>
          <HStack spacing='20px'>
            <Text as='div'>{userData ? userData.handle : <Spinner />}</Text>
            <Avatar
              size='sm'
              name={userData ? userData.handle : ''}
            />
            <Button
              colorScheme='green'
              onClick={logout}
            >
              Logout
            </Button>
          </HStack>
        </>
      ) : (
        <HStack spacing='20px'>
          <ButtonGroup>
            <Button colorScheme='green'>
              <NavLink to='/login'>Login</NavLink>
            </Button>
            <Button colorScheme='orange'>
              <NavLink to='/register'>Register</NavLink>
            </Button>
          </ButtonGroup>
        </HStack>
      )}
    </Flex>
  );
}
