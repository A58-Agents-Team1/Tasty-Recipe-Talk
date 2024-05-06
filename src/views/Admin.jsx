import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useSearchParams } from 'react-router-dom';
import {
  blockAccount,
  getUserByHandle,
  getUsersByEmail,
  getUsersByName,
  unblockAccount,
} from '../services/users.service';
import { Button, useToast } from '@chakra-ui/react';
import { showToast } from '../components/Alerts';

export default function Admin() {
  const { userData } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const toast = useToast();

  const setSearch = (value) => {
    setSearchParams({ search: value });
  };

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const resultWithHandle = await getUserByHandle(search);
        const resultWithEmail = await getUsersByEmail(search);
        const resultWithName = await getUsersByName(search);

        if (resultWithHandle.exists()) {
          const userHandle = resultWithHandle.val();
          setUsers([userHandle]);
        } else if (resultWithEmail.length > 0) {
          setUsers(resultWithEmail);
        } else if (resultWithName.length > 0) {
          setUsers(resultWithName);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchAccount();
  }, [search, users]);

  const blockAcc = (inputData) => {
    try {
      blockAccount(inputData);
      console.log('yes');
      showToast('Account block.', 'Account blocked successfully', toast);
    } catch (error) {
      console.log(error.message);
    }
  };

  const unblockAcc = (inputData) => {
    try {
      unblockAccount(inputData);
      console.log('yes');
      showToast('Account unblock.', 'Account unblocked successfully', toast);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        name='search'
        id='search'
      />
      <p>Username: {userData.handle}</p>
      <p>Email: {userData.email}</p>
      <p>First Name: {userData.firstName}</p>
      <p>Last Name: {userData.lastName}</p>
      <br />
      {search &&
        users.map((user) => (
          <div key={user.uid}>
            <h1>Results :</h1>
            <p>Username : {user.handle}</p>
            <p>First name : {user.firstName}</p>
            <p>last name : {user.lastName}</p>
            <p>Email : {user.email}</p>
            <p>Blocked : {user.isBlocked ? 'Yes' : 'No'}</p>
            {user.isBlocked ? (
              <Button onClick={() => unblockAcc(user.handle)}>
                Unblock user
              </Button>
            ) : (
              <Button onClick={() => blockAcc(user.handle)}>Block user</Button>
            )}
          </div>
        ))}
    </div>
  );
}
