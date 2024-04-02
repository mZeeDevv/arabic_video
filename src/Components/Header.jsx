import React from 'react'
import { IoHomeSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
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
    <div className='bg-gray-600 lg:h-[100vh] flex lg:flex-col items-center p-4 lg:space-y-6 justify-center space-x-6 lg:space-x-0 lg:justify-start'>
      <div className='rounded-full p-1 w-10 h-10 flex justify-center items-center cursor-pointer bg-green-600'  onClick={() => navi('/')}>
        <i className="fa-solid fa-house-heart text-xl text-white"></i>
      </div>
      <div className='rounded-full p-1 w-10 h-10 flex justify-center items-center cursor-pointer bg-green-600'  onClick={() => navi('/profile')}>
        <i className="fa-solid fa-user text-xl text-white"></i>
      </div>
      <div className='rounded-full p-1 w-10 h-10 flex justify-center items-center cursor-pointer bg-green-600'  onClick={() => navi('/report')}>
        <i className="fa-solid fa-file-chart-column text-xl text-white"></i>
      </div>
      <div className='rounded-full p-1 w-10 h-10 flex justify-center items-center cursor-pointer bg-green-600'  onClick={() => navi('/admin')}>
        <i className="fa-solid fa-gear text-xl text-white"></i>
      </div>
      {/* <IoHomeSharp  className='text-4xl bg-white rounded-full p-1 cursor-pointer'  onClick={() => navi('/')}/> */}
      {/* <FaUser className='text-4xl bg-white rounded-full p-1'  onClick={() => navi('/profile')}/> */}
      {/* <FaShoppingCart className='text-4xl bg-white rounded-full p-1'  onClick={() => navi('/report')}/> */}
      {/* <IoIosSettings className='text-4xl bg-white rounded-full p-1'  onClick={() => navi('/admin')}/> */}
    </div>
    </>
  )
}
