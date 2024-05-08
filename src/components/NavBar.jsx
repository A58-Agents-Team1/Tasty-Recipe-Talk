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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { logoutUser } from '../services/auth.service.js';
import { SettingsIcon } from '@chakra-ui/icons';
import logo from '/logo.png';

export default function NavBar() {
  const { user, userData, setAppState } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = async () => {
    await logoutUser();
    setAppState({ user: null, userData: null });
    navigate('/');
  };

  return (
    <Flex
      as='nav'
      justify='space-between'
      alignItems='center'
      borderBottom='1px solid'
      borderColor='green.600'
      borderRadius='lg'
      p='1rem'
      my='1rem'
      mx='2rem'
      shadow='2xl'
      bg='green.700'
      color={'white'}
    >
      <Heading>
        <NavLink to='/giphy-kitchen'>
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
          <HStack>
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink
                  as={NavLink}
                  to='/'
                  _active={{ color: 'red' }}
                  _activeLink={{ color: 'gold' }}
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              {!userData?.isBlocked && (
                <BreadcrumbItem>
                  <BreadcrumbLink
                    as={NavLink}
                    to='/create-post'
                    _active={{ color: 'red' }}
                    _activeLink={{ color: 'gold' }}
                  >
                    Create post
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
              <BreadcrumbItem>
                <BreadcrumbLink
                  as={NavLink}
                  to='/all-posts'
                  _active={{ color: 'red' }}
                  _activeLink={{ color: 'gold' }}
                >
                  All recipes
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink
                  as={NavLink}
                  to='/about'
                  _active={{ color: 'red' }}
                  _activeLink={{ color: 'gold' }}
                >
                  About
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </HStack>

          <HStack spacing='20px'>
            <Menu>
              <>
                <Text as='div'>{userData ? userData.handle : <Spinner />}</Text>
                <Avatar
                  size='sm'
                  name={userData ? userData.handle : ''}
                  src={userData ? userData.avatar : ''}
                />
                <MenuButton title='Profile Settings'>
                  <SettingsIcon />
                </MenuButton>
                <MenuList
                  color='white'
                  bg='green.600'
                >
                  <MenuItem
                    bg='green.600'
                    as={NavLink}
                    to='/my-profile'
                    _active={{ color: 'red' }}
                    _activeLink={{ color: 'gold' }}
                  >
                    My Profile
                  </MenuItem>
                  {userData?.userRole === 'admin' && (
                    <MenuItem
                      bg='green.600'
                      as={NavLink}
                      to='/find-user'
                      _active={{ color: 'red' }}
                      _activeLink={{ color: 'gold' }}
                    >
                      Find User
                    </MenuItem>
                  )}
                  {userData?.userRole === 'admin' && (
                    <MenuItem
                      bg='green.600'
                      as={NavLink}
                      to='/blocked-accounts'
                      _active={{ color: 'red' }}
                      _activeLink={{ color: 'gold' }}
                    >
                      Blocked Account
                    </MenuItem>
                  )}
                  <MenuItem
                    bg='green.600'
                    color={'red'}
                    onClick={logout}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </>
            </Menu>
          </HStack>
        </>
      ) : (
        <>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink
                as={NavLink}
                to='/'
                _active={{ color: 'red' }}
                _activeLink={{ color: 'gold' }}
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink
                as={NavLink}
                to='/about'
                _active={{ color: 'red' }}
                _activeLink={{ color: 'gold' }}
              >
                About
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <HStack spacing='20px'>
            <ButtonGroup>
              <NavLink to='/login'>
                <Button colorScheme='green'> Login</Button>
              </NavLink>
              <NavLink to='/register'>
                <Button colorScheme='orange'>Register</Button>
              </NavLink>
            </ButtonGroup>
          </HStack>
        </>
      )}
    </Flex>
  );
}
