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
    <Flex direction='column'>
      <Flex direction='column'>
        <Flex
          align='top'
          justify='space-between'
          mb={5}
          w={'100%'}
          direction='column'
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
          <Tabs variant='enclosed' color={'white'}>
            <TabList>
              <Tab
                _selected={{
                  color: 'white',
                  textColor: 'black',
                  bg: 'yellow.100',
                }}
                onClick={() => handleTabClick('username')}
              >
                Username
              </Tab>
              <Tab
                _selected={{
                  color: 'white',
                  textColor: 'black',
                  bg: 'yellow.100',
                }}
                onClick={() => handleTabClick('email')}
              >
                Email
              </Tab>
              <Tab
                _selected={{
                  color: 'white',
                  textColor: 'black',
                  bg: 'yellow.100',
                }}
                onClick={() => handleTabClick('first name')}
              >
                First Name
              </Tab>
            </TabList>
          </Tabs>
        </Flex>
        <FormLabel htmlFor='search'>Find User by {activeBar}: </FormLabel>{' '}
        <br />
        <Input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          name='search'
          id='search'
        />
      </Flex>
      <>
        <br />
        <br />
        {search &&
          users.length > 0 &&
          users.map((user) => (
            <>
              <div key={user.id}>
                <h1>Results</h1>
                <p>Username : {user?.handle}</p>
                <p>First name : {user.firstName}</p>
                <p>last name : {user.lastName}</p>
                <p>Email : {user.email}</p>
                <p>Blocked : {user.isBlocked ? 'Yes' : 'No'}</p>
                {user.isBlocked ? (
                  <Button onClick={() => unblockAcc(user?.handle)}>
                    Unblock user
                  </Button>
                ) : (
                  <Button onClick={() => blockAcc(user?.handle)}>
                    Block user
                  </Button>
                )}
              </div>
            </>
          ))}
      </>
    </Flex>
  );
}
