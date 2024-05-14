import { Box, Button, Heading, Text, useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import {
  getAllUsersByIsBlocked,
  unblockAccount,
} from '../services/users.service';
import { showToast, showToastError } from '../components/Alerts';

export default function BlockedAccounts() {
  const { userData } = useContext(AppContext);
  const toast = useToast();
  const navigate = useNavigate();
  const [allBlockedUsers, setAllBlockedUsers] = useState([]);

  const unblockAcc = (inputData) => {
    try {
      unblockAccount(inputData);
      showToast('Account unblock.', 'Account unblocked successfully', toast);
    } catch (error) {
      showToastError('Error unblocking account', error.message, toast);
    }
  };

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      const res = await getAllUsersByIsBlocked(true);
      setAllBlockedUsers(res);
    };
    !userData && navigate('/login');
    fetchBlockedUsers();
  }, [allBlockedUsers]);

  return (
    <Box
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
      gap={2}
      p={5}
      boxShadow={'2xl'}
      border='2px'
      borderRadius='md'
      borderColor='gray.800'
      background={'yellow.300'}
    >
      <Heading
        p={4}
        mb={2}
        color={'black'}
        textAlign={'center'}
        size='md'
        border='2px'
        borderRadius='md'
        borderColor='gray.800'
        background={'yellow.100'}
      >
        Keep your community safe by managing blocked Accounts.
      </Heading>
      <>
        {allBlockedUsers ? (
          allBlockedUsers.map((user) => (
            <Box
              key={user.uid}
              fontWeight={'bold'}
              fontSize={'lg'}
            >
              <Box
                p={4}
                m={3}
                color={'black'}
                border='2px'
                borderRadius='md'
                borderColor='gray.800'
                background={'yellow.100'}
              >
                <Text>First Name: {user.firstName}</Text>
                <Text>Last Name: {user.lastName}</Text>
                <Text>Username: {user.handle}</Text>
                <Text>Email: {user.email}</Text>
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
              </Box>
            </Box>
          ))
        ) : (
          <Text>No blocked users</Text>
        )}
      </>
    </Box>
  );
}
