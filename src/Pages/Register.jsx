import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {db} from '../firebase'
import { serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { toast } from "react-toastify";
import OAuth from '../Components/OAuth';
export default function Register() {

  const navi = useNavigate();
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: ""
  });
  const { name, email, password } = formData
  function onChange(e) {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
      }))
  };
   async function onSubmit(e){
     e.preventDefault();
     try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
      )
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
          displayName: name
      })
      const formDatacopy = {...formData};
      delete formDatacopy.password;
      formDatacopy.time = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDatacopy)
      navi("/")

     } catch (error) {
      console.log(error)
      toast.error("Could not login")
     }
  }
  return (
  <div className='w-full'>
     <h1 className='text-center my-2 text-gray-700 text-2xl font'>بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
     <div className='max-w-2xl mx-auto flex items-center justify-center lg:my-20 shadow-xl rounded-md bg-white'>
     <div className='items-center flex justify-center w-full flex-col p-2'>
     <form className='flex flex-col space-y-5 md:w-[80%] w-full' onSubmit={onSubmit}>
                            <input
                                id='name'
                                type='text'
                                placeholder='Name'
                                value={name}
                                onChange={onChange}
                                className='p-2 rounded-md outline-none border-2 border-gray-300' />

                            <input
                                id='email'
                                value={email}
                                type='email'
                                placeholder='Email'
                                onChange={onChange}
                                className='p-2 rounded-md outline-none border-2 border-gray-300' />

                            <input
                                id='password'
                                type='password'
                                value={password}
                                placeholder='Password'
                                onChange={onChange}

                                className='p-2 rounded-md border-2 border-gray-300' />

                            <div className='flex justify-between font text-gray-700 font-sm'>
                                <p className='flex md:space-x-3'>Already have an account?<p className='ml-1 cursor-pointer text-blue-500'><Link to='/login'>SignIn</Link></p></p>

                            </div>
                            <button type='button' className='bg-[#008DDA] text-white p-2 rounded-md uppercase font-semibold' onClick={onSubmit}>Register</button>
                        </form>
                        <div className="flex items-center my-4 before:border-t before:flex-1
                    before:border-gray-600 after:border-t after:border-gray-600 after:flex-1">
                            <p className="text-center mx-4">OR</p>
                        </div>
                        <OAuth/>
                        </div>
     </div>
  </div>
  )
}
