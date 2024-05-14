import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  blockAccount,
  getFilterUserByHandle,
  getUsersByEmail,
  getUsersByName,
  unblockAccount,
} from '../services/users.service';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Tab,
  TabList,
  Tabs,
  Text,
  useToast,
} from '@chakra-ui/react';
import { showToast, showToastError } from '../components/Alerts';

export default function FindUser() {
  const { userData } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const toast = useToast();
  const navigate = useNavigate();
  const [activeBar, setActiveBar] = useState('username');

  const setSearch = (value) => {
    setSearchParams({ search: value });
  };

  useEffect(() => {
    !userData && navigate('/login');
  }, []);

  const handleTabClick = (tab) => {
    setActiveBar(tab);
    setSearchParams({ search: '' });
  };

  useEffect(() => {
    const fetchAccount = async () => {
      if (!search) return;

      let result = [];
      if (activeBar === 'username') {
        result = await getFilterUserByHandle(search);
      } else if (activeBar === 'email') {
        result = await getUsersByEmail(search);
      } else if (activeBar === 'first name') {
        result = await getUsersByName(search);
      }

      setUsers(result);
    };

    fetchAccount();
  }, [search, activeBar, users]);

  const blockAcc = (inputData) => {
    try {
      blockAccount(inputData);
      showToast('Account block.', 'Account blocked successfully', toast);
    } catch (error) {
      showToastError('Error blocking account', error.message, toast);
    }
  };

  const unblockAcc = (inputData) => {
    try {
      unblockAccount(inputData);
      showToast('Account unblock.', 'Account unblocked successfully', toast);
    } catch (error) {
      showToastError('Error unblocking account', error.message, toast);
    }
  };

  return (
    <Flex
      w={'600px'}
      direction='column'
      p={4}
      align='center'
      justify='center'
      m={4}
      border='2px'
      borderRadius='md'
      borderColor='gray.800'
      background={'yellow.300'}
    >
      <Flex direction='column'>
        <Heading
          fontSize={'lg'}
          p={4}
          mb={2}
          border='2px'
          borderRadius='md'
          borderColor='gray.800'
          background={'yellow.100'}
        >
          Looking for a specific user? Find user accounts here.
        </Heading>
        <Flex
          align='top'
          justify='space-between'
          mb={5}
          w={'100%'}
          direction='column'
          p={4}
          border='2px'
          borderRadius='md'
          borderColor='gray.800'
          background={'yellow.100'}
        >
          <Flex align='top' mb={5}>
            <Avatar
              size='sm'
              backgroundColor='purple'
              name={userData ? userData?.handle : ''}
              src={userData ? userData?.avatar : ''}
            />
            <Box ml='3'>
              <Text fontWeight='bold'>
                {userData?.handle}
                <Badge ml='1' colorScheme='green'>
                  admin
                </Badge>
              </Text>
              <Text fontSize='m'>email : {userData?.email}</Text>
            </Box>
          </Flex>
          <Tabs variant='enclosed' color={'black'} align='center'>
            <TabList borderColor='black'>
              <Tab
                _selected={{
                  textColor: 'black',
                  fontWeight: 'bold',
                  bg: 'yellow.300',
                  borderColor: 'black',
                }}
                onClick={() => handleTabClick('username')}
              >
                Username
              </Tab>
              <Tab
                _selected={{
                  textColor: 'black',
                  fontWeight: 'bold',
                  bg: 'yellow.300',
                  borderColor: 'black',
                }}
                onClick={() => handleTabClick('email')}
              >
                Email
              </Tab>
              <Tab
                _selected={{
                  textColor: 'black',
                  fontWeight: 'bold',
                  bg: 'yellow.300',
                  borderColor: 'black',
                }}
                onClick={() => handleTabClick('first name')}
              >
                First Name
              </Tab>
            </TabList>
          </Tabs>
        </Flex>
        <FormLabel htmlFor='search'>Find User by {activeBar}: </FormLabel>{' '}
        <Input
          mb={2}
          type='text'
          value={search}
          placeholder={`Enter ${activeBar}`}
          backgroundColor={'white'}
          onChange={(e) => setSearch(e.target.value)}
          name='search'
          id='search'
        />
      </Flex>
      <>
        {search &&
          users.length > 0 &&
          users.map((user) => (
            <Flex
              key={user.uid}
              p={4}
              direction='column'
              border='2px'
              borderRadius='md'
              borderColor='gray.800'
              background={'yellow.100'}
              m={2}
            >
              <Heading>Results</Heading>
              <Text>Username : {user?.handle}</Text>
              <Text>First name : {user.firstName}</Text>
              <Text>last name : {user.lastName}</Text>
              <Text>Email : {user.email}</Text>
              <Text>Blocked : {user.isBlocked ? 'Yes' : 'No'}</Text>
              {user.isBlocked ? (
                <Button
                  mt={2}
                  colorScheme='green'
                  onClick={() => unblockAcc(user?.handle)}
                >
                  Unblock user
                </Button>
              ) : (
                <Button
                  mt={2}
                  colorScheme='red'
                  onClick={() => blockAcc(user?.handle)}
                >
                  Block user
                </Button>
              )}
            </Flex>
          ))}
      </>
    </Flex>
  );
}
