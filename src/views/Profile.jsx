import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Heading, Input, FormLabel, Button, useToast } from '@chakra-ui/react';
import { updateUser } from '../services/users.service';
import { showToastError } from '../components/Alerts';

const Profile = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [editEnable, setEditEnable] = useState(true);
  const [form, setForm] = useState({
    firstName: userData ? userData.firstName : '',
    lastName: userData ? userData.lastName : '',
  });

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
          <Heading textAlign={'center'} size='md'>
            Hello, {userData?.handle}, what recipe will you upload today?
          </Heading>
          <p>Username: {userData?.handle}</p>
          <p>Email: {userData?.email}</p>
          <p>First Name: {userData?.firstName}</p>
          <p>Last Name: {userData?.lastName}</p>
          <h2 style={{ color: 'red', fontWeight: 'bold' }}>
            {userData?.isBlocked && 'Your account is blocked !!!'}
          </h2>
          <br />
        </>
      ) : (
        <>
          <Heading textAlign={'center'} size='md'>
            Hello, {userData?.handle}, here you can edit your profile:
          </Heading>
          <p>Username: {userData?.handle}</p>
          <p>Email: {userData?.email}</p>
          <FormLabel htmlFor='firstName'>First Name: </FormLabel>
          <Input
            value={form.firstName}
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
            value={form.lastName}
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
        </>
      )}

      {editEnable ? (
        <Button
          id='isChecked'
          colorScheme='green'
          _selected={{ bg: 'green.500', color: 'white' }}
          onClick={() => setEditEnable(!editEnable)}
        >
          Edit Profile
        </Button>
      ) : (
        <Button
          id='isChecked'
          colorScheme='green'
          _selected={{ bg: 'green.500', color: 'white' }}
          onClick={() => editProfile()}
        >
          Done
        </Button>
      )}
    </div>
  );
};
export default Profile;
