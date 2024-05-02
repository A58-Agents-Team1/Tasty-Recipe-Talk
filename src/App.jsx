import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import { AppContext } from "./context/AppContext.jsx"
import { getUserData } from "./services/users.service.js"
import {useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config.js';
import Layout from "./hoc/Layout.jsx"
import Home from "./views/Home.jsx"
import Login from "./views/Login.jsx"
import Register from "./views/Register.jsx"
import NotFound from "./views/NotFound.jsx"
import { CreatePost }  from "./views/CreatePost.jsx";
import  AllPosts  from "./views/AllPosts.jsx";
import About from "./views/About.jsx";
import BlockedAccounts from "./views/BlockedAccounts.jsx";

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

    getUserData(appState.user.uid)
      .then(snapshot => {
        //console.log(snapshot.val()); // { Peter: {...} }
        const userData = Object.values(snapshot.val())[0];
        setAppState({...appState, userData});
      });
  }, [appState.user])

  return (
    <>
      <AppContext.Provider value = {{...appState, setAppState}}>
        <Layout >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/all-posts' element={<AllPosts />} />
            <Route path='/about' element={<About />}/>
            <Route path='/blocked-accounts' element={<BlockedAccounts />}/>
          </Routes>
        </Layout>
      </AppContext.Provider>
    </>
  )
}

export default App
