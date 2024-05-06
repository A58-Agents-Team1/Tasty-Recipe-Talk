import { useEffect, useState } from 'react';
import { registerUser } from '../services/auth.service.js';
import { createUserHandle } from '../services/users.service.js';
import { useNavigate } from 'react-router-dom';
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
  Text
} from '@chakra-ui/react';
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validateUserNameAsync,
} from '../common/user.validation.js';
import { showToast, showToastError} from '../components/Alerts.jsx';

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
  }, [user, navigate]);

  const updateForm = (props) => (e) => {
    setForm({
      ...form,
      [props]: e.target.value,
    });
  };

  const validateForm = async () => {
    if (
      form.firstName === '' ||
      form.lastName === '' ||
      form.userName === '' ||
      form.email === '' ||
      form.password === ''
    ) {
      throw new Error('auth/invalid-form');
    }

    validateFirstName(form.firstName);

    validateLastName(form.lastName);

    await validateUserNameAsync(form.userName);

    validateEmail(form.email);

    validatePassword(form.password);
  };

  const register = async () => {
    try {
      await validateForm();
      const credential = await registerUser(form.email, form.password);
      await createUserHandle(
        form.userName,
        credential.user.uid,
        credential.user.email,
        form.firstName,
        form.lastName
      );
      setAppState({ user: credential.user, userData: null });
      showToast("Account created!","We`ve created an account for you!",toast)
      navigate('/');
    } catch (error) {
      if (error.message.includes('child failed: path')) {
        showToastError(`User Name can't contain ".", "#", "$", "[", or "]"!`,toast);
      }
      if (error.message.includes('auth/first-name-too-short')) {
        showToastError('First name must be between 4 and 15 characters long!',toast);
      }
      if (error.message.includes('auth/last-name-too-short')) {
        showToastError('Last name must be between 4 and 15 characters long!',toast);
      }
      if (error.message.includes('auth/username-too-short')) {
        showToastError(
          'User Name name must be between 3 and 15 characters long!',toast
        );
      }

      if (error.message.includes('auth/invalid-email')) {
        showToastError('Invalid email format!',toast);
      }
      if (error.message.includes('auth/email-already-in-use')) {
        showToastError('User with this email has already been registered!',toast);
      }

      if (error.message.includes('auth/weak-password')) {
        showToastError('Password must be between 6 and 15 characters long!',toast);
      }
      if (error.message.includes('auth/invalid-form')) {
        showToastError('Please fill out all fields!',toast);
      }
      if (error.message.includes('auth/operation-not-allowed')) {
        showToastError('Email/password accounts are not enabled!',toast);
      }
      if (error.message.includes('auth/username-already-in-use')) {
        showToastError('User with this username already exists!',toast);
      }
      if (error.message.includes('auth/user-not-found')) {
        showToastError('User with this username does not exist!',toast);
      }
      if (error.message.includes('auth/wrong-password')) {
        showToastError('Invalid password!',toast);
      }
    }
  };

  return (
    <Box width={{ base: '90%', md: '30%' }}>
      <Heading textAlign={'center'}>Register</Heading>
      <Box display='grid' gridTemplateColumns='repeat(1, 1fr)' gap={4} p={4}>
        <FormControl isRequired>
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
        <FormControl isRequired>
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
        </FormControl><br />
      </Box>
      <Flex justify='center' align='center' gap={4}>
      </Flex>

      <Flex direction="column" alignItems="center">
      <Button colorScheme='orange' width="92%"  onClick={register}>Register</Button>
        <Flex alignItems="center" style={{ fontSize: '19px' }}>
          <Text marginRight={2} >Have an account?</Text>
          <NavLink to='/login' style={{ fontWeight: 'bold' }}>Login</NavLink>
        </Flex>
      </Flex>


    </Box>
  );
}
