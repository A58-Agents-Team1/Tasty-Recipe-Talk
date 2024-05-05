import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';

export default function ProfileInfo() {
  const { userData } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate('/');
    }
  }, [navigate, userData]);
  return (
    <Box>
      <Text fontSize='2xl'>Profile Information</Text>
      <Text>Edit</Text>
      <Text>Profile Picture: {userData?.profilePicture}</Text>
      <Text>First Name: {userData?.firstName}</Text>
      <Text>Last Name: {userData?.lastName}</Text>
      <Text>Username: {userData?.handle}</Text>
      <Text>Email: {userData?.email}</Text>
    </Box>
  );
}
