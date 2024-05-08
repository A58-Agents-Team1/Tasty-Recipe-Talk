import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

/**
 *
 * @param {{children: any }} props
 * @returns
 */
export default function Authenticated({ children }) {
  const { user } = useContext(AppContext);
  const location = useLocation();

  if (!user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return <>{children}</>;
}

export function IsBlocked({ children }) {
  const { userData } = useContext(AppContext);
  if (userData.isBlocked) {
    return <p>Your account is blocked!</p>;
  }
  return <>{children}</>;
}

export function CanDelete({ children, postAuthor }) {
  const { userData } = useContext(AppContext);
  if (userData.userRole === 'admin' || userData.handle === postAuthor) {
    return <>{children}</>;
  }
}

Authenticated.propTypes = {
  children: PropTypes.any.isRequired,
};

IsBlocked.propTypes = {
  children: PropTypes.any.isRequired,
};

CanDelete.propTypes = {
  children: PropTypes.any.isRequired,
  postAuthor: PropTypes.string,
};
