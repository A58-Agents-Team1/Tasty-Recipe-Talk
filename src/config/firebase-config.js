// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyAFmI0hQM1N804T8V8vlOZocyLKsaiSc8s',
  authDomain: 'tasty-recipe-talk-e24f0.firebaseapp.com',
  projectId: 'tasty-recipe-talk-e24f0',
  storageBucket: 'tasty-recipe-talk-e24f0.appspot.com',
  messagingSenderId: '34892173186',
  appId: '1:34892173186:web:8e249f8dbffa892995899b',
  databaseURL:
    'https://tasty-recipe-talk-e24f0-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// the Firebase authentication handler
export const auth = getAuth(app);
// the Realtime Database handler
export const db = getDatabase(app);

export const storage = getStorage(app);

export const uploadPhoto = async (image, pathName) => {
  try {
    const imageRef = ref(storage, `images/${pathName}`);
    await uploadBytes(imageRef, image);
  } catch (e) {
    console.log(e.message);
  }
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
    if (!url) {
      return '';
    }
    return url;
  } catch (e) {
    if (e.message === 'storage/object-not-found') {
      throw new Error('storage/object-not-found');
    }
  }
};
