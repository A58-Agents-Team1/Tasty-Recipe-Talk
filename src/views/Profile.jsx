import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const Profile = ({ children }) => {
  const { userData } = useContext(AppContext);

  if (userData.userRole === 'admin') {
    return <>{children}</>;
  }

  return (
    <div>
      <h1>Hello, {userData.handle}, what recipe will you upload today?</h1>
      <p>Username: {userData.handle}</p>
      <p>Email: {userData.email}</p>
      <p>First Name: {userData.firstName}</p>
      <p>Last Name: {userData.lastName}</p>
      <br />
    </div>
  );
};
