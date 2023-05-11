import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
function Login() {
    const navigate = useNavigate()
    const [values, setValues] = useState({

        email: "",
        password: ""
    })
    const [errMes, setErrMes] = useState("")
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)
    const handleSubmission = () => {
        if (!values.email || !values.password) {
            setErrMes('Fill all input Field');
            return;
        }
        setErrMes("");
        setSubmitButtonDisabled(true)
        signInWithEmailAndPassword(auth, values.email, values.password).then(async (res) => {
            setSubmitButtonDisabled(false)
            navigate('/signup')
        })
            .catch((err) => {
                setSubmitButtonDisabled(false)
                setErrMes(err.message)
                console.log('err', err.message);
            })
    }
    return (
        <div className="h-screen bg-gradient-to-r from-sky-500 to-indigo-500 flex   justify-center items-center">
            <div className="min-w-[400px] bg-white px-10 py-5 rounded-[20px]">
                <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Login</h1>
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
                </div>
                <div className="mt-8 flex flex-col justify-center">
                    <b className="text-red-500">{errMes}</b>
                    <button
                        className="px-8 py-2 bg-sky-400 text-black hover:text-white rounded-md hover:bg-sky-600 transition-colors duration-600 "
                        onClick={handleSubmission}
                        disabled={submitButtonDisabled}
                    >
                        Login
                    </button>
                    <p className="mt-4 text-center">
                        Are you new user ?{' '}
                        <span className="text-blue-500 font-bold hover:text-blue-900">
                            <Link to="/" >Sign Up</Link>
                        </span>
                    </p>
                </div>
            </div>

        </div>
    )
}
export default Login;