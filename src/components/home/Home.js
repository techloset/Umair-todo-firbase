import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { signOut } from 'firebase/auth';
import { db } from '../../firebase';
import { auth } from '../../firebase';

import { useNavigate } from 'react-router-dom';

function Home(props) {
    const [data, setData] = useState([])
    const [naming, setNaming] = useState("")
    const [errMes, setErrMes] = useState("")
    const [update, setUpdate] = useState(false)
    const [newId, setNewId] = useState("")
    const [fetchData, setFetchData] = useState(false)

    const [userName, setUserName] = useState("")
    const navigate = useNavigate()
    console.log(data)
    useEffect(() => {
        try {

            auth.onAuthStateChanged((user) => {
                if (user) {
                    setUserName(user.displayName)
                    // setNaming(user.displayName)
                } else {
                    setUserName('')
                }
                console.log(user.displayName);
                // if (userName = '') {
                //     return
                // } else {
                // onReadHandler()

                // }
            })
        } catch (error) {
            console.log(error, 'error in use effect')
        }
    }, [])


    // useEffect(() => {
    //     if (userName = '') {
    //         return
    //     } else {
    //         onReadHandler()

    //     }
    // },[])
    const alpha = (e) => {
        setNaming(e.target.value)
    }
    const onAddHandler = async () => {
        if (!naming) {
            setErrMes("Please fill out this field");
            return;
        }
        setErrMes("")
        let addStudents = ({
            Name: naming
        })
        setNaming("")
        const docRef = await addDoc(collection(db, `${userName}`), addStudents);
        setData([...data, { ...addStudents, id: docRef.id }])
    }
    const onDeleteHandler = async (id) => {
        await deleteDoc(doc(db, `${userName}`, id));
        let Delete = data.filter((value) => {
            return value.id !== id
        })
        setData(Delete)
    }
    const onReadHandler = async () => {
        const querySnapshot = await getDocs(collection(db, `${userName}`));
        if (!collection || collection.length === 0) {
            return;

        } else {

            setFetchData(true)

            let a = []
            querySnapshot.forEach((doc) => {
                a.push({
                    Name: doc.data().Name,
                    id: doc.id
                })
            });
            setData(a)
        }
    }
    const closeData = () => {
        setFetchData(false)
        setData([])

        // onReadHandler(false)
    }
    const onEditHandler = (Name, id) => {
        setUpdate(true)
        setNaming(Name)
        setNewId(id)
    }
    const onUpdateHandler = async () => {
        setUpdate(false);

        const index = data.findIndex((item) => item.id === newId);
        const updatedItem = { ...data[index], Name: naming };
        const newData = [...data];
        newData[index] = updatedItem;
        const washingtonRef = doc(db, `${userName}`, newId);

        try {

            await updateDoc(washingtonRef, updatedItem);
            setData(newData);
            setNaming("");
            console.log(newData, "new array");
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };
    const logOut = () => {

        signOut(auth)
            .then(() => {
                navigate('/login')
            })
            .catch((error) => {
                console.log(error);
            });
    }




    // const onUpdateHandler = async () => {

    //     setUpdate(false)
    //     let newArray = data.map((item) => {
    //         if (item.id == newId) {

    //             return { Name: naming, id: newId }
    //         }
    //         else {
    //             return item
    //         }
    //     })



    //     setData(newArray)
    //     setNaming("")
    //     console.log(newArray, 'new array');
    // }

    return (
        <div className='h-screen bg-slate-400 flex  flex-col  '>


            <div className='flex flex-row-reverse gap-5 mr-5'>

                <button className='  mt-5 w-fit p-5 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-500' onClick={logOut}>Logout</button>
                <button className=' mt-5 w-fit p-5 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-500' onClick={!fetchData ? onReadHandler : closeData} >{!fetchData ? 'Fetch Data' : 'Close'}</button>
            </div>


            <h1 className='text-4xl font-bold italic text-white mb-8 justify-center items-center flex mt-10'>
                {userName ? `Welcome to ${userName}` : `Please  `}
                {!userName && <Link to='/' className='border-b-2 hover:border-gray-600 ml-2 hover:text-gray-600'>  Sign Up</Link>}


            </h1>




            <div className='flex items-center mb-4 justify-center'>
                <input type="text" value={naming} placeholder='Add Todo' onChange={alpha} className='bg-white rounded-md py-2 px-4 mr-2 w-96' />


                <button onClick={!update ? onAddHandler : onUpdateHandler} className='bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-500'> {update ? 'Update' : 'Add'}  </button>
            </div>

            {errMes && <p className='text-red-500 mb-4 text-center'>{errMes}</p>}

            <table className='w-[70%] mx-auto border-collapse border-2 border-gray-800  rounded-[10px]'>
                <thead>
                    <tr className=''>
                        <th className='bg-gray-800 text-white py-2  border border-gray-800 text-start '>#</th>
                        <th className='bg-gray-800 text-white py-2 border border-gray-800 text-start pl-5 '>Name</th>
                        <th className='bg-gray-800 text-white py-2  border border-gray-800'>Delete</th>
                        <th className='bg-gray-800 text-white py-2 border border-gray-800 '>Edit</th>

                    </tr>
                </thead>
                <tbody className='  ' >
                    {
                        data.map((value, index) => (
                            <tr key={value.id} className='border-2 border-gray-600'>
                                <td className=' border-r-2  border-gray-600'>{index + 1}</td>
                                <td className=' pl-5'>{value.Name}</td>


                                <td >
                                    <div className='  flex  justify-center'>

                                        <button className='bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700' onClick={() => onDeleteHandler(value.id)}>Delete</button>
                                    </div>
                                </td>

                                <td >
                                    <div className=' flex  justify-center'>

                                        <button className='bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700' onClick={() => onEditHandler(value.Name, value.id)}>Edit</button>
                                    </div>
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default Home


