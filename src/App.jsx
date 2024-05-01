import { Routes, Route } from "react-router-dom"
import Layout from "./hoc/Layout"
import Home from "./views/Home"
import Login from "./views/Login"
import Register from "./views/Register"
import NotFound from "./views/NotFound"

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
