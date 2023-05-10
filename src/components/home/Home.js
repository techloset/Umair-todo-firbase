import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import styles from './Home.module.css'
import { updateDoc } from "firebase/firestore";
import { db } from '../../firebase';
function Home(props) {
    const [data, setData] = useState([])
    const [naming, setNaming] = useState("")
    const [errMes, setErrMes] = useState("")
    const [update, setUpdate] = useState(false)
    const [newId, setNewId] = useState("")
    console.log(data)
    useEffect(() => {
        onReadHandler()
    }, [])
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
        const docRef = await addDoc(collection(db, `${props.name}`), addStudents);
        setData([...data, { ...addStudents, id: docRef.id }])
    }
    const onDeleteHandler = async (id) => {
        await deleteDoc(doc(db, `${props.name}`, id));
        let Delete = data.filter((value) => {
            return value.id !== id
        })
        setData(Delete)
    }
    const onReadHandler = async () => {
        const querySnapshot = await getDocs(collection(db, `${props.name}`));
        let a = []
        querySnapshot.forEach((doc) => {
            a.push({
                Name: doc.data().Name,
                id: doc.id
            })
        });
        setData([...a])
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
        const washingtonRef = doc(db, `${props.name}`, newId);

        try {

            await updateDoc(washingtonRef, updatedItem);
            setData(newData);
            setNaming("");
            console.log(newData, "new array");
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };



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

            <h1 className='text-4xl font-bold italic text-white mb-8 justify-center items-center flex'>
                {props.name ? `Welcome to ${props.name}` : <Link to={'/signup'} className='text-white hover:text-gray-300'>Please Sign Up</Link>}
            </h1>

            <div className='flex items-center mb-4 justify-center'>
                <input type="text" value={naming} placeholder='Add Todo' onChange={alpha} className='bg-white rounded-md py-2 px-4 mr-2 w-96' />


                <button onClick={!update ? onAddHandler : onUpdateHandler} className='bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700'> {update ? 'Update' : 'Add'}  </button>
            </div>

            {errMes && <p className='text-red-500 mb-4'>{errMes}</p>}

            <table className='w-[80%] mx-auto border-collapse border-2 border-gray-800 justify-evenly rounded-[10px]'>
                <thead>
                    <tr className=' justify-between'>
                        <th className='bg-gray-800 text-white py-2  border border-gray-800 '>#</th>
                        <th className='bg-gray-800 text-white py-2 border border-gray-800 '>Name</th>
                        <th className='bg-gray-800 text-white py-2  border border-gray-800'>Delete</th>
                        <th className='bg-gray-800 text-white py-2 border border-gray-800 '>Edit</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        data.map((value, index) => (
                            <tr key={value.id}>
                                <td className=' '>{index + 1}</td>
                                <td className=' '>{value.Name}</td>
                                <td className=' '>
                                    <button className='bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700' onClick={() => onDeleteHandler(value.id)}>Delete</button>
                                </td>
                                <td className=' '>
                                    <button className='bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700' onClick={() => onEditHandler(value.Name, value.id)}>Edit</button>
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


