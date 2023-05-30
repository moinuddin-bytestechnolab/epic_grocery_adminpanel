import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TfiSearch } from 'react-icons/tfi';
import { IoNotifications } from 'react-icons/io5';
import { SlLogout } from 'react-icons/sl';
import { RiSettings2Line } from 'react-icons/ri';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { BiUser } from 'react-icons/bi';
import { logout } from '../../services/Auth.Service';


const TopBar = () => {
  // This state use for hide & show user profile tool tip
  const [showToolTip, setShowToolTip] = useState(false)
  const [userProfileData, setUserProfileData] = useState<any>({})
  

  // In this function i'm getting an error of every click render function   
  const getUserData = () => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (user && user.accessToken) {
      setUserProfileData(user.data);
    } else {
      console.log('not found');
    }
  };

  useEffect(() => {

    // getUserData();

  },[]);

  return (
    <div className="bg-[#fff] flex items-center h-16 border-2 border-t-0 border-l-0 border-r-0">
      <div className='flex justify-between w-full'>
        {/* Searchbar here */}
        <div className='searchbar'>
          <label className="relative block ml-3">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <TfiSearch className="h-5 w-5 fill-gray-500"/>
            </span>
            <input className="placeholder:italic placeholder:text-gray-500 block bg-gray-100 w-80 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/>
          </label>
        </div>

        {/* Notification here */}
        <div className="flex items-center mx-3">
          <div className='p-2 text-2xl mx-3 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100'>
            <IoNotifications/>
          </div>
          <div>
            <a href="#" onClick={() => setShowToolTip(!showToolTip)}>
              <img className="w-10 h-10 rounded-full" src="/images/avatar.avif" alt="profile"/>
            </a>
          </div>
        </div>

        {/* Tool Tip here */}
        {
          showToolTip 
          ?
            <div role="tooltip" className="absolute right-0 mt-12 z-10 inline-block w-56 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-1">
              <div className="p-3">
                <p className="text-base font-semibold leading-none text-gray-900 dark:text-white"><a href="#">{userProfileData.first_name}</a></p>
                <p className="mb-3 text-sm font-normal"><a href="#" className="hover:underline">{userProfileData.email}</a></p>
              <hr />
                <ul className='mt-3'>
                  <li>
                    <NavLink to="profile" className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100'>
                    <BiUser className="w-4 h-4 tbit-gray-500 transition duration-75 group-hover:text-gray-900 sidebar-icon"/>
                    <span className="ml-3">My Profile</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/change-password" className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100'>
                    <HiOutlineLockClosed className="w-4 h-4 text-gray-500 transition duration-75 group-hover:text-gray-900 sidebar-icon"/>
                    <span className="ml-3">Change-Password</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="settings" className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100'>
                    <RiSettings2Line className="w-4 h-4 text-gray-500 transition duration-75 group-hover:text-gray-900 sidebar-icon"/>
                    <span className="ml-3">Settings</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="login" onClick={logout} className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100'>
                    <SlLogout className="w-4 h-4 text-red-500 transition duration-75 group-hover:text-gray-900"/>
                    <span className="ml-3">Log Out</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          : 
            null
        }
      </div>
    </div>
  )
}

export default TopBar