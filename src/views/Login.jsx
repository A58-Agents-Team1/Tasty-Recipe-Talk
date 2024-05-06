import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { loginUser } from '../services/auth.service.js';
import { NavLink } from 'react-router-dom';
import { Button, Heading, FormLabel, Input, Flex, Text, Box } from '@chakra-ui/react';

export default function Login() {
  const { user, setAppState } = useContext(AppContext);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate(location.state?.from.pathname || '/');
    }
  }, [user, location.state?.from.pathname, navigate]);

  const login = async () => {
    const { user } = await loginUser(form.email, form.password);
    setAppState({ user, userData: null });
    navigate(location.state?.from.pathname || '/');
  };

  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  return (
    <Box width={{ base: '90%', md: '30%' }}>
      <Heading textAlign={'center'}>Login</Heading><br />
      <FormLabel htmlFor='email'>Your Email: </FormLabel>
      <Input value={form.email} onChange={updateForm('email')} type='text' name='email' placeholder='Email' id='email'
        _focus={{
          boxShadow: 'md',
          borderRadius: 'md',
          bg: 'gray.300',
          p: 4,
          transition: 'all 0.2s',
        }}
        bg={'gray.200'}
        shadow={'md'}
      /><br />
      <FormLabel htmlFor='password'>Password: </FormLabel>
      <Input value={form.password} onChange={updateForm('password')} type='password' name='password' placeholder='Password' id='password'
        _focus={{
          boxShadow: 'md',
          borderRadius: 'md',
          bg: 'gray.300',
          p: 4,
          transition: 'all 0.2s',
        }}
        bg={'gray.200'}
        shadow={'md'}
      /><br /><br />

      <Flex direction="column" alignItems="center">
        <Button onClick={login} width="100%" colorScheme='green'>Login</Button>
        <Flex alignItems="center" style={{ fontSize: '19px' }}>
          <Text marginRight={2} >Don`t have an account?</Text>
          <NavLink to='/register' style={{ fontWeight: 'bold' }}>Register</NavLink>
        </Flex>
      </Flex>
    </Box>
  );
}
