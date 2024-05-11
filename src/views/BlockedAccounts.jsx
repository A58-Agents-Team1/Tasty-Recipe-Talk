import { Box, Divider, Heading, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react'; // Add the missing import statement for useState
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { getAllUsersByIsBlocked } from '../services/users.service';

export default function BlockedAccounts() {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [allBlockedUsers, setAllBlockedUsers] = useState([]);

  useEffect(() => {
    getAllUsersByIsBlocked(true).then(setAllBlockedUsers).catch(console.error);
    !userData && navigate('/login');
  }, []);

  return (
    <Box
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
      gap={2}
      p={5}
      borderRadius={'10px'}
      boxShadow={'2xl'}
      bg={'gray.300'}
    >
      <Heading
        align={'center'}
        mb={2}
      >
        Blocked People
      </Heading>

      {allBlockedUsers ? (
        <>
          {allBlockedUsers.map((user) => (
            <>
              <Box
                key={user.id}
                fontWeight={'bold'}
                fontSize={'lg'}
              >
                <Divider
                  border={'1px solid'}
                  m={2}
                />
                <Text>First Name: {user.firstName}</Text>
                <Text>Last Name: {user.lastName}</Text>
                <Text>Username: {user.handle}</Text>
                <Text>Email: {user.email}</Text>
              </Box>
            </>
          ))}
        </>
      ) : (
        <Text>No blocked users</Text>
      )}
    </Box>
  );
}
