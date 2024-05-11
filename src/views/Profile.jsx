import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../services/users.service';
import { showToastError } from '../components/Alerts';
import {
  Heading,
  Input,
  FormLabel,
  Button,
  useToast,
  Flex,
  Box,
  Text,
  Avatar,
} from '@chakra-ui/react';

const Profile = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [editEnable, setEditEnable] = useState(true);
  const [form, setForm] = useState({
    firstName: userData ? userData.firstName : '',
    lastName: userData ? userData.lastName : '',
  });

  const [urlProfilPhoto, setUrlProfilPhoto] = useState('');

  const updateForm = (props) => (e) => {
    setForm({
      ...form,
      [props]: e.target.value,
    });
  };

  useEffect(() => {
    !userData && navigate('/login');
  }, []);

  const editProfile = async () => {
    try {
      await updateUser(userData.handle, form);
      setEditEnable(!editEnable);
    } catch (e) {
      showToastError('Error updating profile', e.message, toast);
    }
  };

  return (
    <div>
      <FormLabel htmlFor='isChecked'> </FormLabel>
      {userData && editEnable === true ? (
        <>
          <Flex align='center' justify='center' direction='column'>
            <Heading
              p={4}
              textAlign={'center'}
              size='md'
              border='2px'
              borderRadius='md'
              borderColor='gray.800'
              background={'yellow.100'}
            >
              Hello {userData?.handle}, here you can find all information about
              your account.
            </Heading>{' '}
            <br />
            <Flex align='center'>
              <Box borderRadius='full' p='1' backgroundColor={'black'}>
                {urlProfilPhoto ? (
                  <Avatar
                    title='Profile Photo'
                    boxSize='200px'
                    borderRadius='full'
                    src={urlProfilPhoto}
                  />
                ) : (
                  <Box
                    title='Profile Photo'
                    boxSize='200px'
                    borderRadius='full'
                    bg='black'
                    color='white'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                  >
                    <span>Missing Profile Photo</span>
                  </Box>
                )}
              </Box>
              <Flex
                direction='column'
                ml='4'
                p='4'
                border='2px'
                borderRadius='md'
                borderColor='gray.800'
                background={'yellow.100'}
              >
                <Text>Username: {userData?.handle}</Text>
                <Text>Email: {userData?.email}</Text>
                <Text>First Name: {userData?.firstName}</Text>
                <Text>Last Name: {userData?.lastName}</Text>
                {userData?.isBlocked && (
                  <Text color='red' fontWeight='bold'>
                    Your account is blocked !!!
                  </Text>
                )}
                <Flex align={'center'} spacing={4}>
                  {' '}
                  <Button
                    mt={2}
                    mr={2}
                    colorScheme='green'
                    onClick={() => setEditEnable(!editEnable)}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    mt={2}
                    colorScheme='green'
                    onClick={() => {
                      console.log('TODO');
                    }}
                  >
                    Change Profile Photo
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <br />
        </>
      ) : (
        <>
          <Flex align='center' justify='center' direction='column'>
            <Heading
              p={4}
              textAlign={'center'}
              size='md'
              border='2px'
              borderRadius='md'
              borderColor='gray.800'
              background={'yellow.100'}
            >
              Hello {userData?.handle}, here you can edit information about your
              account.
            </Heading>
            <br />
            <Flex align='center'>
              <Box borderRadius='full' p='1' backgroundColor={'black'}>
                {urlProfilPhoto ? (
                  <Avatar
                    title='Profile Photo'
                    boxSize='200px'
                    borderRadius='full'
                    src={urlProfilPhoto}
                  />
                ) : (
                  <Box
                    title='Profile Photo'
                    boxSize='250px'
                    borderRadius='full'
                    bg='black'
                    color='white'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                  >
                    <span>Missing Profile Photo</span>
                  </Box>
                )}
              </Box>
              <Flex
                direction='column'
                ml='4'
                p='4'
                border='2px'
                borderRadius='md'
                borderColor='gray.800'
                background={'yellow.100'}
              >
                <Text>Username: {userData?.handle}</Text>
                <Text>Email: {userData?.email}</Text>
                <FormLabel htmlFor='firstName'>First Name: </FormLabel>
                <Input
                  value={form?.firstName}
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
                <FormLabel htmlFor='lastName'>Last Name: </FormLabel>
                <Input
                  value={form?.lastName}
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
                <br />
                <br />
                <Button colorScheme='green' onClick={() => editProfile()}>
                  Done
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
    </div>
  );
};
export default Profile;
