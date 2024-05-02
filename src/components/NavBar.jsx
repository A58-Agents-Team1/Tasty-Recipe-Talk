import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { logoutUser } from '../services/auth.service.js';

export default function NavBar() {
  const { user, userData, setAppState } = useContext(AppContext);

  const logout = async () => {
    await logoutUser();
    setAppState({ user: null, userData: null });
  };

  return (
    <nav>
      <NavLink to='/'>Home |</NavLink>
      {user ? (
        <>
          <NavLink to='/create-post'>Create post |</NavLink>
          <NavLink to='/all-posts'>All recipes |</NavLink>
          <NavLink to='blocked-accounts'>Blocked Account |</NavLink>
          <NavLink to='/about'>About |</NavLink>
          <button onClick={logout}>LogOut</button><br />
          {`Welcome, ${userData ? userData.handle : 'Loading'}`}
        </>
      ) : (
        <>
          <NavLink to='/login'>Login |</NavLink>
          <NavLink to='/register'>Register</NavLink>
        </>
      )}
    </nav>
  );
}
