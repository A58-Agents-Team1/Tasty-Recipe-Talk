import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { getUserByHandle, updateUser } from '../services/users.service';
import { showToast, showToastError } from '../components/Alerts';
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
  Skeleton,
  Image,
} from '@chakra-ui/react';
import {
  getProfilePicture,
  uploadProfilePhoto,
} from '../config/firebase-config';

const Profile = () => {
  const { avatar, userData, setAppState } = useContext(AppContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [editEnable, setEditEnable] = useState(true);
  const [formPictureToggle, setFormPictureToggle] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [form, setForm] = useState({
    firstName: userData ? userData.firstName : '',
    lastName: userData ? userData.lastName : '',
  });

  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');

  const updateForm = (props) => (e) => {
    setForm({
      ...form,
      [props]: e.target.value,
    });
  };

  const editProfile = async () => {
    try {
      await updateUser(userData.handle, form);
      setEditEnable(!editEnable);
    } catch (e) {
      showToastError('Error updating profile', e.message, toast);
    }
  };

  const addProfilePhoto = async () => {
    if (!imageUpload) {
      setImageUpload(null);
      return showToastError('Error', 'Please select an image', toast);
    }
    await uploadProfilePhoto(imageUpload, userData?.handle);
    const res = await getProfilePicture(userData?.handle);
    setAppState((prev) => {
      return { ...prev, avatar: res };
    });

    setImageUpload(null);

    showToast(
      'Profile Photo Uploaded',
      'Profile Photo Uploaded Successfully',
      toast
    );
    setFormPictureToggle(false);
  };

  useEffect(() => {
    if (!userData) {
      navigate('/login');
    } else {
      getProfilePicture(userData.handle).then((res) => {
        setAppState((prevState) => {
          return { ...prevState, avatar: res };
        });
        setProfilePhotoUrl(res);
      });
      getUserByHandle(userData.handle).then((res) => {
        setAppState((prev) => {
          return { ...prev, userData: res };
        });
      });
    }
  }, [userData?.handle, navigate]);

  return (
    <div>
      {userData && editEnable === true ? (
        <>
          <Flex
            align='center'
            justify='center'
            direction='column'
            m={4}
          >
            <Heading
              p={4}
              textAlign={'center'}
              size='md'
              border='2px'
              borderRadius='md'
              borderColor='gray.800'
              background={'yellow.100'}
              mb={4}
            >
              Hello {userData?.handle}, here you can find all information about
              your account.
            </Heading>

            <Flex align='center'>
              <Box
                borderRadius='full'
                p='1'
                backgroundColor={'black'}
              >
                {profilePhotoUrl ? (
                  <Avatar
                    title='Profile Photo'
                    boxSize='200px'
                    borderRadius='full'
                    alt={`${userData?.handle} profile photo`}
                    src={avatar ? avatar : profilePhotoUrl}
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
                direction='row'
                ml='4'
                p='4'
                border='2px'
                borderRadius='md'
                borderColor='gray.800'
                background={'yellow.100'}
              >
                <Flex flexDirection={'column'}>
                  <Text>Username: {userData?.handle}</Text>
                  <Text>Email: {userData?.email}</Text>
                  <Text>First Name: {userData?.firstName}</Text>
                  <Text>Last Name: {userData?.lastName}</Text>
                  {userData?.isBlocked && (
                    <Text
                      color='red'
                      fontWeight='bold'
                    >
                      Your account is blocked !!!
                    </Text>
                  )}
                  <Flex
                    align={'center'}
                    spacing={4}
                  >
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
                        setFormPictureToggle((prev) => !prev);
                      }}
                    >
                      {formPictureToggle ? <>Cancel</> : <>Add Profile Photo</>}
                    </Button>
                  </Flex>
                  {formPictureToggle && (
                    <Flex
                      flexDirection={'column'}
                      align='center'
                      justify='center'
                      border={'2px solid'}
                    >
                      <Flex flexDirection={'column'}>
                        <FormLabel htmlFor='profilePhoto'>
                          Profile Photo:{' '}
                        </FormLabel>
                        {imageUpload !== null ? (
                          <Image
                            width='300px'
                            src={URL.createObjectURL(imageUpload)}
                            alt='Preview'
                            boxShadow={'2xl'}
                            borderRadius={'lg'}
                          />
                        ) : (
                          <Skeleton
                            height='250px'
                            width='auto'
                          />
                        )}
                        {!imageUpload && (
                          <Input
                            type='file'
                            accept='image/*'
                            name='profilePhoto'
                            id='profilePhoto'
                            onChange={(e) => setImageUpload(e.target.files[0])}
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
                        )}
                      </Flex>
                      <Box>
                        <Button
                          mt={2}
                          colorScheme='green'
                          onClick={() => addProfilePhoto()}
                        >
                          Upload
                        </Button>
                        <Button
                          mt={2}
                          colorScheme='red'
                          onClick={() => {
                            setImageUpload(null);
                            setFormPictureToggle((prev) => !prev);
                          }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </>
      ) : (
        <>
          <Flex
            align='center'
            justify='center'
            direction='column'
          >
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
            <Flex align='center'>
              <Box
                borderRadius='full'
                p='1'
                backgroundColor={'black'}
              >
                {profilePhotoUrl ? (
                  <Avatar
                    title='Profile Photo'
                    boxSize='200px'
                    borderRadius='full'
                    src={avatar ? avatar : ''}
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
                <Flex
                  align={'center'}
                  spacing={4}
                  justify={'end'}
                  gap={2}
                  mt={4}
                >
                  <Button
                    colorScheme='green'
                    onClick={() => editProfile()}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme='red'
                    onClick={() => setEditEnable((prev) => !prev)}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
    </div>
  );
};
export default Profile;
