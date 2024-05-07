import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { loginUser } from '../services/auth.service.js';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Heading,
  FormLabel,
  Input,
  Flex,
  Text,
  Box,
  useToast,
  Switch,
} from '@chakra-ui/react';
import { showToastErrorLogin } from '../components/Alerts.jsx';
import {
  validateEmail,
  validatePassword,
  validateUserNameAsync,
} from '../common/user.validation.js';
import { getUserByHandle } from '../services/users.service.js';
import {
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from '../common/constants.js';

export default function Login() {
  const { user, setAppState } = useContext(AppContext);
  const [userNameOrEmail, setUserNameOrEmail] = useState(false);
  const [form, setForm] = useState({
    email: '',
    userName: '',
    password: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (user) {
      navigate(location.state?.from.pathname || '/');
    }
  }, [user, location.state?.from.pathname, navigate]);

  const validateForm = async () => {
    if (form.email === '' || form.password === '') {
      throw new Error('auth/invalid-form');
    }

    validateEmail(form.email);

    validatePassword(form.password);
  };
  const validateFormUser = async () => {
    if (form.userName === '' || form.password === '') {
      throw new Error('auth/invalid-form');
    }

    if (
      userName.length < MIN_USERNAME_LENGTH ||
      userName.length > MAX_USERNAME_LENGTH
    ) {
      throw new Error('auth/username-too-short');
    }

    validatePassword(form.password);
  };

  const login = async () => {
    try {
      await validateForm();
      const { user } = await loginUser(form.email, form.password);
      setAppState({ user, userData: null });
      navigate(location.state?.from.pathname || '/');
    } catch (error) {
      if (error.message.includes('auth/invalid-email')) {
        showToastErrorLogin('Invalid email format!', toast);
      }
      if (error.message.includes('auth/weak-password')) {
        showToastErrorLogin(
          'Password must be between 6 and 15 characters long!',
          toast
        );
      }
      if (error.message.includes('auth/invalid-form')) {
        showToastErrorLogin('Please fill out all fields!', toast);
      }
      if (error.message.includes('auth/operation-not-allowed')) {
        showToastErrorLogin('Email/password accounts are not enabled!', toast);
      }
      if (error.message.includes('auth/wrong-password')) {
        showToastErrorLogin('Invalid password!', toast);
      }
      if (error.message.includes('auth/invalid-credential')) {
        showToastErrorLogin('Wrong password!', toast);
      }
    }
  };

  const loginUserName = async () => {
    try {
      const emails = await (await getUserByHandle(form.userName)).val().email;
      await validateFormUser();
      const { user } = await loginUser(emails, form.password);
      setAppState({ user, userData: null });
      navigate(location.state?.from.pathname || '/');
    } catch (error) {
      if (error.message.includes('auth/invalid-email')) {
        showToastErrorLogin('Invalid email format!', toast);
      }
      if (error.message.includes('auth/weak-password')) {
        showToastErrorLogin(
          'Password must be between 6 and 15 characters long!',
          toast
        );
      }
      if (error.message.includes('auth/invalid-form')) {
        showToastErrorLogin('Please fill out all fields!', toast);
      }
      if (error.message.includes('auth/operation-not-allowed')) {
        showToastErrorLogin('Email/password accounts are not enabled!', toast);
      }
      if (error.message.includes('auth/wrong-password')) {
        showToastErrorLogin('Invalid password!', toast);
      }
      if (error.message.includes('auth/invalid-credential')) {
        showToastErrorLogin('Wrong password!', toast);
      }
    }
  };

  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  return (
    <Box width={{ base: '90%', md: '30%' }}>
      <Heading textAlign={'center'}>Login</Heading>
      <FormLabel htmlFor='isChecked'>
        {userNameOrEmail ? 'Login with Email' : 'Login with Username'}
        <Switch
          id='isChecked'
          colorScheme='green'
          _selected={{ bg: 'green.500', color: 'white' }}
          value={userNameOrEmail}
          onChange={() => setUserNameOrEmail(!userNameOrEmail)}
        />
      </FormLabel>
      <br />
      {userNameOrEmail ? (
        <>
          <FormLabel htmlFor='email'>Your Email: </FormLabel>
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
          <br />
        </>
      ) : (
        <>
          <FormLabel htmlFor='userName'>Your Username: </FormLabel>
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
          <br />
        </>
      )}
      <FormLabel htmlFor='password'>Password: </FormLabel>
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
      <br />
      <br />

      <Flex
        direction='column'
        alignItems='center'
      >
        {userNameOrEmail ? (
          <Button
            onClick={login}
            width='100%'
            colorScheme='green'
          >
            Login Email
          </Button>
        ) : (
          <Button
            onClick={loginUserName}
            width='100%'
            colorScheme='green'
          >
            Login User
          </Button>
        )}
        <Flex
          alignItems='center'
          style={{ fontSize: '19px' }}
        >
          <Text marginRight={2}>Don`t have an account?</Text>
          <NavLink
            to='/register'
            style={{ fontWeight: 'bold' }}
          >
            Register
          </NavLink>
        </Flex>
      </Flex>
    </Box>
  );
}
