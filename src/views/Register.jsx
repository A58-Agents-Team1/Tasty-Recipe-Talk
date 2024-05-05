import { useEffect, useState } from 'react';
import { registerUser } from '../services/auth.service.js';
import {
  createUserHandle,
  getUserByHandle,
} from '../services/users.service.js';
import { Form, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import { NavLink } from 'react-router-dom';
import {
  useToast,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Box,
} from '@chakra-ui/react';

export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
  });

  const { user, setAppState } = useContext(AppContext);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const updateForm = (props) => (e) => {
    setForm({
      ...form,
      [props]: e.target.value,
    });
  };

  const showToastSuccess = () => {
    toast({
      title: 'Account created.',
      description: "We've created your account for you.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };
  const showToastEmailFailed = () => {
    toast({
      title: 'Error Account Not Created.',
      description: 'User has already been registered!',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  const showToastUserNameFailed = () => {
    toast({
      title: 'Error Account Not Created.',
      description: 'User with this username already exists!',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  const register = async () => {
    try {
      const user = await getUserByHandle(form.userName);
      if (user.exists()) {
        return showToastUserNameFailed();
      }
      const credential = await registerUser(form.email, form.password);
      await createUserHandle(
        form.userName,
        credential.user.uid,
        credential.user.email,
        form.firstName,
        form.lastName
      );
      setAppState({ user: credential.user, userData: null });
      showToastSuccess();
      navigate('/');
    } catch (error) {
      if (error.message.includes('auth/email-already-in-use')) {
        showToastEmailFailed();
      }
    }
  };

  return (
    <Box width={{ base: '90%', md: '100%' }}>
      <Heading>Register</Heading>
      <Box
        display='grid'
        gridTemplateColumns='repeat(1, 1fr)'
        gap={4}
        p={4}
      >
        <FormControl>
          <FormLabel htmlFor='firstName'>First Name:</FormLabel>
          <Input
            value={form.firstName}
            onChange={updateForm('firstName')}
            type='text'
            name='firstName'
            placeholder='First Name'
            id='firstName'
            _focus={{
              boxShadow: 'md',
              borderRadius: 'md',
              bg: 'gray.300',
              p: 4,
              transition: 'all 0.2s',
            }}
            bg={'gray.200'}
            shadow={'md'}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='lastName'>Last Name:</FormLabel>
          <Input
            value={form.lastName}
            onChange={updateForm('lastName')}
            type='text'
            name='lastName'
            placeholder='Last Name'
            id='lastName'
            _focus={{
              boxShadow: 'md',
              borderRadius: 'md',
              bg: 'gray.300',
              p: 4,
              transition: 'all 0.2s',
            }}
            bg={'gray.200'}
            shadow={'md'}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='userName'>User Name:</FormLabel>
          <Input
            value={form.userName}
            onChange={updateForm('userName')}
            type='text'
            name='userName'
            placeholder='Username'
            id='userName'
            _focus={{
              boxShadow: 'md',
              borderRadius: 'md',
              bg: 'gray.300',
              p: 4,
              transition: 'all 0.2s',
            }}
            bg={'gray.200'}
            shadow={'md'}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='email'>Email:</FormLabel>
          <Input
            value={form.email}
            onChange={updateForm('email')}
            type='text'
            name='email'
            placeholder='Email'
            id='email'
            _focus={{
              boxShadow: 'md',
              borderRadius: 'md',
              bg: 'gray.300',
              p: 4,
              transition: 'all 0.2s',
            }}
            bg={'gray.200'}
            shadow={'md'}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='password'>Password:</FormLabel>
          <Input
            value={form.password}
            onChange={updateForm('password')}
            type='password'
            name='password'
            placeholder='Password'
            id='password'
            _focus={{
              boxShadow: 'md',
              borderRadius: 'md',
              bg: 'gray.300',
              p: 4,
              transition: 'all 0.2s',
            }}
            bg={'gray.200'}
            shadow={'md'}
          />
        </FormControl>
      </Box>
      <Flex
        justify='center'
        align='center'
        gap={4}
      >
        <Button
          colorScheme='blue'
          onClick={register}
        >
          Create
        </Button>
        <Button colorScheme='green'>
          <NavLink to='/login'>Login</NavLink>
        </Button>
      </Flex>
    </Box>
  );
}
