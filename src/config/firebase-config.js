// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAVV26vH-NMBwL7M96i7Xbhs2RGJVBetgQ',
//   authDomain: 'forum-system-aa47e.firebaseapp.com',
//   projectId: 'forum-system-aa47e',
//   storageBucket: 'forum-system-aa47e.appspot.com',
//   messagingSenderId: '893958072554',
//   appId: '1:893958072554:web:6d39fb2f391b73d85ccf93',
//   databaseURL:
//     'https://forum-system-aa47e-default-rtdb.europe-west1.firebasedatabase.app/',
// };

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBztXyQbucTQES-GYl2a56Rdet2mzw6D7A',
  authDomain: 'tasty-recipe-talk.firebaseapp.com',
  projectId: 'tasty-recipe-talk',
  storageBucket: 'tasty-recipe-talk.appspot.com',
  messagingSenderId: '1080459787152',
  appId: '1:1080459787152:web:65fce27bc0e9a30de1d115',
  databaseURL:
    'https://tasty-recipe-talk-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// the Firebase authentication handler
export const auth = getAuth(app);
// the Realtime Database handler
export const db = getDatabase(app);

export const storage = getStorage(app);

export const uploadPhoto = async (image, pathName) => {
  const imageRef = ref(storage, `images/${pathName}`);
  await uploadBytes(imageRef, image);
};

export const getUploadedPhoto = async (imageName) => {
  try {
    const imageRef = ref(storage, `images/${imageName}`);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (e) {
    if (e.message === 'storage/object-not-found') {
      return null;
    }
  }
};

export const uploadProfilePhoto = async (image, handle) => {
  const imageRef = ref(storage, `profileImages/${handle}`);
  await uploadBytes(imageRef, image);
};

export const getProfilePicture = async (handle) => {
  try {
    const imageRef = ref(storage, `profileImages/${handle}`);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (e) {
    if (e.message === 'storage/object-not-found') {
      throw new Error('storage/object-not-found');
    }
  }
};
