import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {db} from '../firebase'
import { doc, getDoc, serverTimestamp, setDoc} from 'firebase/firestore';
import { toast } from "react-toastify";

export default function OAuth() {
    const navi = useNavigate()
async function createuser(){
    try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const results = await signInWithPopup(
            auth, 
            provider);
    const user = results.user;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if(!docSnap.exists()) {
        await setDoc(docRef, (
            {
                name: user.displayName,
                email: user.email,
                time: serverTimestamp()
            }
        ))
      navi("/")
      toast.success("User created successfully")
    } 
    else {
      navi("/")
      toast.success("User created successfully")
    }
    console.log(user)
    } catch (error) {
        console.log(error);
        toast.error("Could not login")
    }
}

  return (
    <>
    <button type='button' className='bg-red-800 md:w-[80%] w-[100%] uppercase text-white p-2 rounded-md flex justify-center items-center py-3
    
    ' onClick={createuser}>
     <FcGoogle className='bg-white rounded-full text-2xl mr-2 font-semibold'/> Continue with Google</button>
    </>
  )
}