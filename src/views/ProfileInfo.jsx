import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function ProfileInfo() {
  const { userData } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate('/');
    }
  }, [navigate, userData]);
  return (
    <div>
      <p>First Name: {userData?.firstName}</p>
      <p>Last Name: {userData?.lastName}</p>
      <p>Username: {userData?.handle}</p>
      <p>Email: {userData?.email}</p>
    </div>
  );
}
