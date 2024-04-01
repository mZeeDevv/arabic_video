import React from 'react'
import { IoHomeSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import Main from '../Pages/Main';
import Profile from '../Pages/Profile';
import Admin from '../Pages/Admin';
import { useNavigate } from 'react-router-dom';
export default function Header() {
 const navi = useNavigate();
  return (
    <>    
    <div className='bg-gray-600 lg:h-[100vh] flex lg:flex-col items-center p-4 lg:space-y-4 justify-center space-x-6 lg:space-x-0 lg:justify-start'>
   <IoHomeSharp  className='text-4xl bg-white rounded-full p-1 cursor-pointer'  onClick={() => navi('/')}/>
  <FaUser className='text-4xl bg-white rounded-full p-1'  onClick={() => navi('/profile')}/>
<IoIosSettings className='text-4xl bg-white rounded-full p-1'  onClick={() => navi('/admin')}/>
    </div>
    </>
  )
}
