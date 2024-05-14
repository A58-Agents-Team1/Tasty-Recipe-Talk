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
  InputGroup,
  InputRightElement,
  Icon,
} from '@chakra-ui/react';
import { showToastError } from '../components/Alerts.jsx';
import { validateEmail, validatePassword } from '../common/user.validation.js';
import { getUserByHandle } from '../services/users.service.js';
import {
  ERR_TOAST_EMAIL_LOGIN,
  ERR_TOAST_USERNAME_LOGIN,
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from '../common/constants.js';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function Login() {
  const { user, setAppState } = useContext(AppContext);
  const [userNameOrEmail, setUserNameOrEmail] = useState(false);

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [form, setForm] = useState({
    email: '',
    userName: '',
    password: '',
  });

  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const validateEmailLoginForm = () => {
    if (form.email === '' || form.password === '') {
      throw new Error('auth/invalid-form');
    }

    validateEmail(form.email);

    validatePassword(form.password);
  };

  const validateUserNameLoginForm = () => {
    if (form.userName === '' || form.password === '') {
      throw new Error('auth/invalid-form');
    }

    if (
      form.userName.length < MIN_USERNAME_LENGTH ||
      form.userName.length > MAX_USERNAME_LENGTH
    ) {
      throw new Error('auth/username-too-short');
    }

    validatePassword(form.password);
  };

  const loginWithEmail = async () => {
    try {
      validateEmailLoginForm();
      const { user } = await loginUser(form.email, form.password);
      setAppState({ user, userData: null });
      navigate(location.state.from.pathname || '/');
    } catch (error) {
      if (error.message.includes('auth/invalid-email')) {
        showToastError(ERR_TOAST_EMAIL_LOGIN, 'Invalid email format!', toast);
      }
      if (error.message.includes('auth/invalid-form')) {
        showToastError(
          ERR_TOAST_EMAIL_LOGIN,
          'Please fill out all fields!',
          toast
        );
      }

      if (error.message.includes('auth/weak-password')) {
        showToastError(
          ERR_TOAST_EMAIL_LOGIN,
          'Password must be between 6 and 15 characters long!',
          toast
        );
      }
      if (error.message.includes('auth/invalid-credential')) {
        showToastError(
          ERR_TOAST_EMAIL_LOGIN,
          'Wrong Email or Password!',
          toast
        );
      }
      if (error.message.includes('auth/too-many-requests')) {
        showToastError(
          ERR_TOAST_EMAIL_LOGIN,
          'Access to this account has been temporarily disabled due to many failed login attempts.',
          toast
        );
      }
    }
  };

  const loginWithUserName = async () => {
    try {
      const res = await getUserByHandle(form.userName);
      const emails = res?.email;

      validateUserNameLoginForm();

      if (emails === null || emails === undefined) {
        throw new Error('auth/invalid-username');
      }

      const { user } = await loginUser(emails, form.password);

      setAppState({ user, userData: null });
      navigate(location.state.from.pathname || '/');
    } catch (error) {
      if (error.message.includes('auth/invalid-form')) {
        showToastError(
          ERR_TOAST_USERNAME_LOGIN,
          'Please fill out all fields!',
          toast
        );
      }
      if (error.message.includes('auth/invalid-username')) {
        showToastError(
          ERR_TOAST_USERNAME_LOGIN,
          'Account with this username don`t exist!',
          toast
        );
      }
      if (error.message.includes('auth/weak-password')) {
        showToastError(
          ERR_TOAST_USERNAME_LOGIN,
          'Password must be between 6 and 15 characters long!',
          toast
        );
      }
      if (error.message.includes('auth/invalid-credential')) {
        showToastError(ERR_TOAST_USERNAME_LOGIN, 'Wrong password!', toast);
      }
      if (error.message.includes('auth/too-many-requests')) {
        showToastError(
          ERR_TOAST_USERNAME_LOGIN,
          'Access to this account has been temporarily disabled due to many failed login attempts.',
          toast
        );
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
    <Box
      width={{ base: '90%', md: '30%' }}
      textAlign={'center'}
      p={4}
      border='2px'
      borderRadius='md'
      borderColor='gray.800'
      background={'yellow.300'}
    >
      <Heading
        textAlign={'center'}
        p={2}
        border='2px'
        borderRadius='md'
        borderColor='gray.800'
        background={'yellow.100'}
      >
        Login
      </Heading>
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
      <InputGroup>
        <Input
          value={form.password}
          onChange={updateForm('password')}
          type={show ? 'text' : 'password'}
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
        <InputRightElement>
          {show ? (
            <Box
              borderLeft='2px solid'
              w='2rem'
              p='2'
              justifyItems='end'
              alignItems={'center'}
              borderLeftColor='gray.300'
              _hover={{ cursor: 'pointer' }}
              onClick={handleClick}
            >
              <Icon as={ViewOffIcon} />
            </Box>
          ) : (
            <Box
              borderLeft='2px solid'
              w='2rem'
              p='2'
              justifyItems='end'
              alignItems={'center'}
              borderLeftColor='gray.300'
              _hover={{ cursor: 'pointer' }}
              onClick={handleClick}
            >
              <Icon as={ViewIcon} />
            </Box>
          )}
        </InputRightElement>
      </InputGroup>
      <br />
      <br />
      <FormLabel htmlFor='isChecked' textAlign={'center'}>
        {userNameOrEmail ? 'Login with Email' : 'Login with Username'}
        <Switch
          id='isChecked'
          colorScheme='green'
          _selected={{ bg: 'green.500', color: 'white' }}
          value={userNameOrEmail}
          onChange={() => setUserNameOrEmail(!userNameOrEmail)}
        />
      </FormLabel>
      <Flex direction='column' alignItems='center'>
        {userNameOrEmail ? (
          <Button
            mb={2}
            onClick={loginWithEmail}
            width='100%'
            colorScheme='green'
          >
            Login Email
          </Button>
        ) : (
          <Button
            mb={2}
            onClick={loginWithUserName}
            width='100%'
            colorScheme='green'
          >
            Login User
          </Button>
        )}
        <Flex alignItems='center' style={{ fontSize: '19px' }}>
          <Text marginRight={2}>Don`t have an account?</Text>
          <NavLink to='/register' style={{ fontWeight: 'bold' }}>
            Register
          </NavLink>
        </Flex>
      </Flex>
    </Box>
  );
}
