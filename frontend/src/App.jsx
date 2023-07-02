import { useState } from 'react'
import Auth from './components/Auth'
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Applayout from './components/Applayout'
import Layout from './components/Layout'
import { Codeprovider } from './components/CodeContext'
import Profile from './components/Profile'
import Onlinecompiler from './compiler/onlinecompiler'
import Practice from './compiler/Practice'
import Question from './compiler/Question'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Codeprovider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Applayout />} >
              <Route index element={<Layout />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/practice' element={<Practice />} />
              {/* <Route path='/practice/topic' element={<Practice />} /> */}
              <Route path='/auth' element={<Auth />}>
                <Route index element={<Login />} />
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<Signup />} />
              </Route>
            </Route>
            <Route path='/compiler' element={<Onlinecompiler />} />
            <Route path='/practice/question/:id' element={<Question />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Codeprovider>
  )
}

export default App
