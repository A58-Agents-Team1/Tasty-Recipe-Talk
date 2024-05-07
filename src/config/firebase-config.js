// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAVV26vH-NMBwL7M96i7Xbhs2RGJVBetgQ',
  authDomain: 'forum-system-aa47e.firebaseapp.com',
  projectId: 'forum-system-aa47e',
  storageBucket: 'forum-system-aa47e.appspot.com',
  messagingSenderId: '893958072554',
  appId: '1:893958072554:web:6d39fb2f391b73d85ccf93',
  databaseURL:
    'https://forum-system-aa47e-default-rtdb.europe-west1.firebasedatabase.app/',
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
  await uploadBytes(imageRef, image).then(() => console.log('yes'));
};

export const getUploadedPhoto = async (imageName) => {
  const imageRef = ref(storage, `images/${imageName}`);
  const url = await getDownloadURL(imageRef);
  return url;
};
