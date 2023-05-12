import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/login/Login'
import SignUp from './components/signUp/SignUp'
import { onAuthStateChanged } from 'firebase/auth'
import firebase from 'firebase/app'
import { db } from './firebase'
import { auth } from './firebase'
const App = () => {
  const [userName, setUserName] = useState("")
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName)

      } else {
        setUserName('')
      }
    })
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

      if (user) {
       
      }
    });

    return unsubscribe;
  }, []);

  return (
    <BrowserRouter>
    
      
      <Routes>
        <Route path='/todo' element={<Home   />  } />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={< SignUp /> } />


      </Routes>

    </BrowserRouter>
  )
}
export default App
