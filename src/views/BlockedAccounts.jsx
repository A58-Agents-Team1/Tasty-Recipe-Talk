import { Heading, Text } from '@chakra-ui/react';
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
    <div>
      <Heading>Blocked People</Heading>
      <Text>Here you can see the people you have blocked.</Text>
      {allBlockedUsers ? (
        <>
          {allBlockedUsers.map((user) => (
            <>
              <div key={user.id}>
                <br />
                <p>First Name: {user.firstName}</p>
                <p>Last Name: {user.lastName}</p>
                <p>Username: {user.handle}</p>
                <p>Email: {user.email}</p>
              </div>
            </>
          ))}
        </>
      ) : (
        <Text>No blocked users</Text>
      )}
    </div>
  );
}
