import { useState, useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TfiSearch } from 'react-icons/tfi';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import Pagination from '../../components/pagination';
import EditUserModal from './EditUserModal';
import { getUsers } from '../../api';
import { date } from '../../helpers/Date';


const Index = () => {
    // This state is use for handeling open close modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // This state use for store get user's data
    const [usersData, setUsersData] = useState([]);

    // This function is use for open modal
    const openModal = () => {
        setIsModalOpen(true);
    };
    
    // This function is use for close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    const fetchUsersData = async () => {
        const res = await getUsers();
        setUsersData(res?.data.data)
    }

    useEffect(() => {
        fetchUsersData()
    },[])    

  return (    
    <div className="relative h-screen overflow-scroll">
        {/* This is a modal which is use for update user data */}
        <EditUserModal isOpen={isModalOpen} onClose={closeModal}/>

        <div className='flex items-center justify-end bg-white p-3'>
            <h1 className='mr-auto font-bold text-gray-600 text-xl uppercase'>Users</h1>
            {/* Here is searchbar */}
            <div className='searchbar'>
                <label className="relative block">
                    <span className="sr-only">Search</span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <TfiSearch className="h-5 w-5 fill-gray-500"/>
                    </span>
                    <input className="placeholder:italic placeholder:text-gray-500 block bg-gray-100 w-80 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search by user name..." type="text" name="search"/>
                </label>
            </div>
        </div>

        {/* This is a table showing user's */}
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-white uppercase bg-gray-600">
                <tr>
                    <th scope="col" className="px-6 py-4">
                        Profile 
                    </th>
                    <th scope="col" className="px-6 py-3">
                        First Name 
                        <span className='float-right cursor-pointer'>
                            {/* <TiArrowSortedUp/>
                            <TiArrowSortedDown/> */}
                        </span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Last Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        E-mail
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Mobile
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Created At
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Updated At
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    usersData[0] ?
                    usersData.map((item : any, index : any) => {
                        return (
                            <tr key={index} className="bg-white border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center justify-start">
                                        <img className="w-10 h-10 rounded-full" src="/images/avatar.avif" alt="profile"/>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {item.first_name}
                                </td>
                                <td className="px-6 py-4">
                                    {item.last_name}
                                </td>
                                <td className="px-6 py-4">
                                    {item.email}
                                </td>
                                <td className="px-6 py-4">
                                    {item.phone}
                                </td>
                                <td className="px-6 py-4">
                                    { date(item.created_at) }
                                </td>
                                <td className="px-6 py-4">
                                    { date(item.updated_at) }
                                </td>
                                <td className="px-6 py-4">
                                    { 
                                        item.role === "admin"
                                        ?
                                        <span className='bg-blue-200 text-blue-900 rounded p-1 font-medium'>{item.role}</span>
                                        : 
                                        <span className='bg-yellow-200 text-yellow-900 rounded p-1 px-2 font-medium'>{item.role}</span>
                                    }
                                </td>
                                <td className="px-6 py-4">
                                    {
                                        item.is_active === true 
                                        ?
                                        <span className="bg-green-500 rounded p-1 text-white font-medium">Active</span>
                                        :
                                        <span className="bg-red-500 rounded p-1 text-white font-medium">In Active</span>
                                    }
                                </td>
                                <td className="px-6 py-4">
                                    <div className='flex text-xl'>
                                        <FiEdit onClick={openModal} className="text-blue-500 cursor-pointer mx-1"/>
                                        <RiDeleteBin6Line className="text-red-500 cursor-pointer"/>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                    :
                    <tr className='bg-white border-b text-center font-bold uppercase'>
                        <td colSpan={8} className='px-6 py-4'>
                            <span>Data not found</span>
                        </td>
                    </tr>
                }
            </tbody>
        </table>

        {/* This is a pagination */}
        <div className='flex justify-center'>
            {/* <Pagination/> */}
        </div>
    </div>
  )
}

export default Index