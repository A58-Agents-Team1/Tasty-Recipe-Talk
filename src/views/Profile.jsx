import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const Profile = ({ children }) => {
  const { user, userData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    !userData && navigate('/login');
  }, []);

  return (
    <>
      {userData && (
        <>
          {userData.userRole === 'admin' && <>{children}</>}
          {userData.userRole !== 'admin' && (
            <>
              <h1>
                Hello, {userData.handle}, what recipe will you upload today?
              </h1>
              <p>Username: {userData.handle}</p>
              <p>Email: {userData.email}</p>
              <p>First Name: {userData.firstName}</p>
              <p>Last Name: {userData.lastName}</p>
              <br />
            </>
          )}
        </>
      )}
    </>
  );
};
