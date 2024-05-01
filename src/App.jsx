import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import { AppContext } from "./context/AppContext"
import { getUserData } from "./services/users.service"
import {useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config.js';
import Layout from "./hoc/Layout"
import Home from "./views/Home"
import Login from "./views/Login"
import Register from "./views/Register"
import NotFound from "./views/NotFound"

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
          </Routes>
        </Layout>
      </AppContext.Provider>
    </>
  )
}

export default App
