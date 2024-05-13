import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppContext } from './context/AppContext.jsx';
import { getUserData } from './services/users.service.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config.js';
import { CreatePost } from './views/CreatePost.jsx';
import Layout from './hoc/Layout.jsx';
import Home from './views/Home.jsx';
import Login from './views/Login.jsx';
import Register from './views/Register.jsx';
import NotFound from './views/NotFound.jsx';
import AllPosts from './views/AllPosts.jsx';
import About from './views/About.jsx';
import BlockedAccounts from './views/BlockedAccounts.jsx';
import FullViewRecipe from './views/FullViewRecipe.jsx';
import FindUser from './views/FindUser.jsx';
import Profile from './views/Profile.jsx';
import Giphy from './views/Giphy.jsx';
import MyPosts from './views/MyPosts.jsx';
import Authenticated from './hoc/Authenticated.jsx';

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

  const [user] = useAuthState(auth);

  if (appState.user !== user) {
    setAppState({ ...appState, user });
  }

  useEffect(() => {
    if (!appState.user) return;

    getUserData(appState.user.uid).then((snapshot) => {
      const userData = Object.values(snapshot.val())[0];
      setAppState({ ...appState, userData });
    });
  }, [appState.user]);

  return (
    <>
      <AppContext.Provider value={{ ...appState, setAppState }}>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/giphy-kitchen' element={<Giphy />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<NotFound />} />
            <Route
              path='/create-post'
              element={
                <Authenticated user={user}>
                  <CreatePost />
                </Authenticated>
              }
            />
            <Route
              path='/all-posts'
              element={
                <Authenticated user={user}>
                  <AllPosts />
                </Authenticated>
              }
            />
            <Route
              path='/posts/:id'
              element={
                <Authenticated user={user}>
                  <FullViewRecipe />
                </Authenticated>
              }
            />
            <Route
              path='/blocked-accounts'
              element={
                <Authenticated user={user}>
                  <BlockedAccounts />
                </Authenticated>
              }
            />
            <Route
              path='/my-profile'
              element={
                <Authenticated user={user}>
                  <Profile />
                </Authenticated>
              }
            />
            <Route
              path='/find-user'
              element={
                <Authenticated user={user}>
                  <FindUser />
                </Authenticated>
              }
            />
            <Route
              path='/my-posts'
              element={
                <Authenticated user={user}>
                  <MyPosts />
                </Authenticated>
              }
            />
          </Routes>
        </Layout>
      </AppContext.Provider>
    </>
  );
}

export default App;
