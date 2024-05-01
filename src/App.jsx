import { Routes, Route } from "react-router-dom"
import Layout from "./hoc/Layout"
import Home from "./views/Home"
import Login from "./views/Login"
import Register from "./views/Register"
import NotFound from "./views/NotFound"
import { useState } from "react"
import { AppContext } from "./context/AppContext"

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

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
