import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TfiSearch } from 'react-icons/tfi';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import Pagination from '../../components/pagination';
import EditUserModal from './EditUserModal';


const Index = () => {
    // This state is use for handeling open close modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // This function is use for open modal
    const openModal = () => {
        setIsModalOpen(true);
    };
    
    // This function is use for close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    
  return (    
    <div className="relative h-screen overflow-scroll">
        {/* This is a modal which is use for update user data */}
        <EditUserModal isOpen={isModalOpen} onClose={closeModal}/>

        <div className='flex items-center justify-end bg-white p-3'>
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

            {/* Here is a filter */}
            {/* <div className='filter mx-2'>
                <select id="countries" className="bg-gray-50 border border-gray-300   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option selected>Filter by status</option>
                    <option value="active">Active</option>
                    <option value="inactive">In Active</option>
                </select>
            </div>*/}
        </div>

        {/* This is a table showing user's */}
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-white uppercase bg-gray-600">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Profile 
                    </th>
                    <th scope="col" className="px-6 py-3">
                        First Name 
                        <span className='float-right cursor-pointer'>
                            <TiArrowSortedUp/>
                            <TiArrowSortedDown/>
                        </span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Last Name 
                        <span className='float-right cursor-pointer'>
                            <TiArrowSortedUp/>
                            <TiArrowSortedDown/>
                        </span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        E-mail
                        <span className='float-right cursor-pointer'>
                            <TiArrowSortedUp/>
                            <TiArrowSortedDown/>
                        </span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Mobile
                        <span className='float-right cursor-pointer'>
                            <TiArrowSortedUp/>
                            <TiArrowSortedDown/>
                        </span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Created At
                        <span className='float-right cursor-pointer'>
                            <TiArrowSortedUp/>
                            <TiArrowSortedDown/>
                        </span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                        <span className='float-right cursor-pointer'>
                            <TiArrowSortedUp/>
                            <TiArrowSortedDown/>
                        </span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center justify-start">
                            <img className="w-10 h-10 rounded-full" src="/images/avatar.avif" alt="profile"/>
                        </div>
                    </th>
                    <td className="px-6 py-4">
                        Moinuddin
                    </td>
                    <td className="px-6 py-4">
                        Chudiwal
                    </td>
                    <td className="px-6 py-4">
                        moinuddin@gmail.com
                    </td>
                    <td className="px-6 py-4">
                        1234567890
                    </td>
                    <td className="px-6 py-4">
                        16-05-23
                    </td>
                    <td className="px-6 py-4">
                        <span className="bg-green-500 rounded p-1 text-white font-medium">Active</span>
                        {/* <span className="bg-red-500 rounded p-1 text-white font-medium">In Active</span> */}
                    </td>
                    <td className="px-6 py-4">
                        <div className='flex text-xl'>
                            <FiEdit onClick={openModal} className="text-blue-500 cursor-pointer mx-1"/>
                            <RiDeleteBin6Line className="text-red-500 cursor-pointer"/>
                        </div>
                    </td>
                </tr>
                <tr className='bg-white border-b text-center font-bold uppercase'>
                    <td colSpan={8} className='px-6 py-4'>
                        <span>Data not found</span>
                    </td>
                </tr>
            </tbody>
        </table>

        {/* This is a pagination */}
        <div className='flex justify-center'>
            <Pagination/>
        </div>
    </div>
  )
}

export default Index