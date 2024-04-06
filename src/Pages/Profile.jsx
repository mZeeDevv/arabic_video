import React, {useState} from 'react'
import { getAuth, signOut, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'
import { collection, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Report from './Report';
export default function Profile() {
    const auth = getAuth();
    const navi = useNavigate();
  const [formData, setFormData] = useState({
    email: auth.currentUser.email,
    name: auth.currentUser.displayName
  })
  const [disbaled, setdisabled] = useState(true)
   const {email, name } = formData;
 function logout()
 {
    auth.signOut();
    navi("/login")
 }
 function onchange(e) {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
    }))
    console.log(e.target.value)
 }

 async function onSubmit() { 
    try {
        await updateProfile(auth.currentUser,{
            displayName: name,
        })
       const docRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(docRef, {
            name
        })
        toast.success('Profile Updated Successfully')
    } catch (error) {
        console.log(error)
        toast.error('Profile not updated')
    }
 }

  return (
    <>
  
    <section className='max-w-5xl lg:w-[40%] mx-auto h-[80vh] flex flex-col'>
    <h1 className='text-center my-2 text-gray-700 text-2xl font'>مرحباً بك مرة أخرى</h1>
  <h1 className='text-center my-2 text-gray-700 text-2xl font'>My Profile</h1>
    <div className='flex flex-col shadow-xl  justify-center w-full p-3 bg-white'>
    <div className='flex flex-col space-y-3 '>
       <input
       id='name'
        value={name}
        onChange={onchange}
        type="text" 
        className='p-2 rounded-md border-2  text-gray-600 outline-none' 
        disabled={disbaled}
        />
        <input
        id='email'
         type="text" 
         value={email}
         disabled
         className='p-2 rounded-md border-2  text-gray-600 outline-none' />
       </div>
       <div className='font flex justify-between mt-2'>
        <p className=''>Do you want to change your name?
         <span className='text-red-600 cursor-pointer md:ml-1'
         onClick={() => {
            !disbaled && onSubmit()
           setdisabled(prevState => !prevState)
         }}
         >
            {disbaled ? 'Edit' : 'Apply'}
            </span></p>

        <p className='text-blue-700 cursor-pointer' onClick={logout}>Sign Out</p>
    </div>
    <button className='bg-[#008DDA] text-white p-2 rounded-md font uppercase my-5 font-semibold' onClick={() => navi("/report")}>Generate my weekly report</button>
    </div>
    <Report/>
    </section>
    </>
  )
}