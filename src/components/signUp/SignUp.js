import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

import { auth } from '../../firebase'
import './SignUp.module.css'


const SignUp = () => {
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

      if (user) {
        navigate('/todo');

      }
    });

    return unsubscribe;
  }, []);

  const validate = () => {
    let isvalid = true
    let errors = {}
    if (!values.name) {
      errors.name = 'Name is required'
      isvalid = false
    }
    if (!values.email) {
      errors.email = "Email is required"
      isvalid = false
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email"
      isvalid = false
    }
    if (!values.password) {
      errors.password = "Password is required"
      isvalid = false

    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
      isvalid = false
    }
    setErrors(errors)
    return isvalid
  }
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)
  const handleSubmission = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitButtonDisabled(true)
      createUserWithEmailAndPassword(auth, values.email, values.password).then(async (res) => {
        setSubmitButtonDisabled(false)
        const user = res.user
        await updateProfile(user, {
          displayName: values.name
        })
        navigate('/todo')

      })
        .catch((err) => {
          setSubmitButtonDisabled(false)

        })
    }
  }
  return (
    <div className="h-screen bg-gradient-to-r from-sky-500 to-indigo-500 flex justify-center items-center">
      <div className="min-w-[400px] bg-white px-10 py-5 rounded-[20px]">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Sign Up</h1>
        <div className="flex flex-col  mt-3">
          <label className="text-gray-800 font-bold" >
            Name
          </label>
          <input
            className="w-full py-2 px-3 border border-gray-400 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            type="text"
            placeholder="Enter Name"
            onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
          />
          {errors.name && <p className='text-red-600 text-[15px] font-medium'>{errors.name}</p>}
        </div>
        <div className="flex flex-col  mt-3">
          <label className="text-gray-800 font-bold" >
            Email
          </label>
          <input
            className="w-full py-2 px-3 border border-gray-400 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            type="email"
            placeholder="Enter Email"
            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
          />
          {errors.email && <p className='text-red-600 text-[15px] font-medium'>{errors.email}</p>}
        </div>
        <div className="flex flex-col  mt-3">
          <label className="text-gray-800 font-bold" >
            Password
          </label>
          <input
            className="w-full py-2 px-3 border border-gray-400 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            type="password"
            placeholder="Enter Password"
            onChange={(event) => setValues((prev) => ({ ...prev, password: event.target.value }))}
          />
          {errors.password && <p className='text-red-600 text-[15px] font-medium'>{errors.password}</p>}
        </div>
        <div className="mt-8 flex flex-col">
          <button
            className="hello px-8 py-2 bg-sky-400 text-black hover:text-white rounded-md hover:bg-sky-600 transition-colors duration-300"
            onClick={handleSubmission}
            disabled={submitButtonDisabled}

          >
            Sign Up
          </button>
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <span className="text-blue-500 font-bold hover:text-blue-900">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp

