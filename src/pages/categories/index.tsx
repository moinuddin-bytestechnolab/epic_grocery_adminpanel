import { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TfiSearch } from 'react-icons/tfi';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import Pagination from '../../components/pagination';
import AddEditCatgory from './AddEditCategory';
import { deleteCategory, getCategories } from '../../api';
import SweetAlert from '../../hooks/SweetAlert';
import {date} from '../../helpers/Date';


const Index = () => {
    // This state is use for handeling open close modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // fetch categories data
    const [fetchCategories, setFetchCategories] = useState([]); 

    // This state is use for get category ID
    const [handleUpdateCategoryID, setHandleUpdateCategoryId] = useState()

    // This state is use for sorting 
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

    // This function is use for open modal
    const openModal = () => {
        setIsModalOpen(true);
    };
    
    // This function is use for close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // This is a sorting function
    const sortBy = (key : any) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
          direction = 'desc';
        }
    
        const sortedData : any = [...fetchCategories].sort((a : any, b : any) => {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        });
    
        if (direction === 'desc') {
          sortedData.reverse();
        }
    
        setFetchCategories(sortedData);
        setSortConfig({ key, direction });
    };

    // This function is use for fetch categories data from API
    const fetchCategoriesData = async () => {
        const res : any = await getCategories()
        setFetchCategories(res.data.data)
    }

    // This function is use for delete categrories from API
    const handleCategoryDelete = async (id : any) => {
        SweetAlert.confirm(
            'Are you sure?',
            "You won't be able to revert this!",
            async () => {
                await deleteCategory(id)
                .then((res) => {
                    if(res){
                        setFetchCategories((prevCategories) =>
                            prevCategories.filter((category : any) => category.id !== id)
                        )
                    }else{
                        return SweetAlert.error("Can't delete the category","Products are associated with it.")
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
            },
            async () => {
                console.log('');
            }
        );
    }

    // This function is use for update category from API
    const handleCategoryUpdate = async (id : any) => {
        openModal()
        setHandleUpdateCategoryId(id)
    }

    useEffect(() => {
        fetchCategoriesData()
    },[])
    

  return (    
    <div className="">
        <div className='flex items-center justify-end bg-white p-3'>
            <h1 className='mr-auto font-bold text-gray-600 text-xl uppercase'>Categories</h1>
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

            {/* Add categories AddEdit Modal */}
            <AddEditCatgory isOpen={isModalOpen} onClose={closeModal} handleCategoryUpdate={handleUpdateCategoryID} fetchCategoriesData={fetchCategoriesData}/>
            <button type="button" onClick={openModal} className="font-medium rounded-lg text-sm px-5 py-2.5 ml-2 text-center inline-flex items-center text-white bg-gray-600 border-2 hover:bg-white hover:text-gray-600 hover:border-2 hover:border-gray-600">
                Add Categories
            </button>

        </div>

        {/* This is a table showing user's */}
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-white uppercase bg-gray-600">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Sr no. 
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Category Image 
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Category Name 
                        <span className='float-right cursor-pointer'>
                            <TiArrowSortedUp onClick={() => sortBy("name")}/>
                            <TiArrowSortedDown onClick={() => sortBy("name")}/>
                        </span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Created At
                        <span className='float-right cursor-pointer'>
                            <TiArrowSortedUp onClick={() => sortBy("created_at")}/>
                            <TiArrowSortedDown onClick={() => sortBy("created_at")}/>
                        </span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Updated At
                        <span className='float-right cursor-pointer'>
                            <TiArrowSortedUp onClick={() => sortBy("updated_at")}/>
                            <TiArrowSortedDown onClick={() => sortBy("updated_at")}/>
                        </span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Category Status
                        <span className='float-right cursor-pointer'>
                            <TiArrowSortedUp onClick={() => sortBy("is_active")}/>
                            <TiArrowSortedDown onClick={() => sortBy("is_active")}/>
                        </span> 
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    fetchCategories[0] ? fetchCategories.map((item : any, index : any) => {
                        return (
                            <tr className="bg-white border-b" key={index}>
                                <td className="px-6 py-4">
                                    {index+1}
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center justify-start">
                                        {
                                            <img className="w-10 h-10 rounded" src={item.image_url} alt="profile"/>
                                        }
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4">
                                    { date(item.created_at) }
                                </td>
                                <td className="px-6 py-4">
                                    { date(item.updated_at) }
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
                                        <FiEdit onClick={() => handleCategoryUpdate(item.id)} className="text-blue-500 cursor-pointer mx-1"/>
                                        <RiDeleteBin6Line onClick={() => handleCategoryDelete(item.id)} className="text-red-500 cursor-pointer"/>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                    : 
                    <tr className='bg-white border-b text-center font-bold uppercase'>
                        <td colSpan={8} className='px-6 py-4'>
                            <span>Categories not found</span>
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