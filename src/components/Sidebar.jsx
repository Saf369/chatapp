import React from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from "react-router-dom";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();

  return (
    <div className={`bg-[#38185B2]/10 h-full flex flex-col p-5 rounded-r-xl text-white
      ${selectedUser ? "max-md:hidden" : ''}`}>

      {/* Top: Logo + Menu */}
      <div className='flex justify-between items-center mb-4'>
        <img src={assets.logo} alt="logo" className='w-40 rounded-3xl' />
        <div className="relative group">
          <img src={assets.menu_icon} alt="menu" className='h-5 cursor-pointer' />
          <div className='absolute top-full right-0 z-20 w-32 p-3 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
            <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm'>Edit Profile</p>
            <hr className='my-2 border-t border-gray-500' />
            <p className='cursor-pointer text-sm'>Logout</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className='bg-[#282142] rounded-full flex items-center gap-2 py-2 px-4 mb-4'>
        <img src={assets.search_icon} alt="Search" className='w-3' />
        <input
          type="text"
          placeholder='Search user...'
          className='w-full bg-transparent border-none outline-none text-amber-50 text-xs placeholder-[#d7cece]'
        />
      </div>

      {/* User List: scrollable */}
      <div className='flex-1 overflow-y-auto'>
        {userDummyData.map((user, index) => (
          <div
            key={index}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center gap-2 p-2 pl-4 rounded cursor-pointer
              ${selectedUser?._id === user._id ? 'bg-[#282142]/50' : ''}`}
          >
            <img src={user?.profilePic || assets.avatar_icon} alt=""
              className='w-9 h-9 rounded-full' />
            <div className='flex flex-col leading-5'>
              <p>{user.fullName}</p>
              <span className={`${index < 3 ? 'text-green-400' : 'text-gray-400'} text-xs font-semibold`}>
                {index < 3 ? 'online' : 'offline'}
              </span>
            </div>
            {index < 2 && (
              <p className=' top-2 left-14 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>
                {index}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar;
