import { getUserByHandle } from "../services/users.service";
import { MAX_FIRST_NAME_LENGTH, MAX_LAST_NAME_LENGTH, MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH, MIN_FIRST_NAME_LENGTH, MIN_LAST_NAME_LENGTH, MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from "./constants";

export const validateFirstName = (firstName) => {
  if (firstName.length < MIN_FIRST_NAME_LENGTH || firstName.length > MAX_FIRST_NAME_LENGTH) {
    throw new Error('auth/first-name-too-short');
  }
};

export const validateLastName = (lastName) => {
  if (lastName.length < MIN_LAST_NAME_LENGTH || lastName.length > MAX_LAST_NAME_LENGTH) {
    throw new Error('auth/last-name-too-short');
  }
};

export const validateUserNameAsync = async (userName) => {
  const _userName = await getUserByHandle(userName);

  if (_userName.exists()) {
    throw new Error('auth/username-already-in-use');
  }
  if (userName.length < MIN_USERNAME_LENGTH || userName.length > MAX_USERNAME_LENGTH) {
    throw new Error('auth/username-too-short');
  }
};

export const validateEmail = (email) => {
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  if (!validateEmail(email)) {
    throw new Error('auth/invalid-email');
  }
};

export const validatePassword = (password) => {
  if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
    throw new Error('auth/weak-password');
  }
};
