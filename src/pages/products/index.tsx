import { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TfiSearch } from 'react-icons/tfi';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import Pagination from '../../components/pagination';
import AddEditProducts from './AddEditProducts';
import { deleteProduct, getProducts } from '../../api';
import { date } from '../../helpers/Date';
import SweetAlert from '../../hooks/SweetAlert';



const Index = () => {
    // This state use for store fetch products data
    const [fetchProductsData, setFetchProductsData] = useState([])
    
    // This state is use for handeling open close modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // This state is use for get product ID
    const [handleUpdateProductID, setHandleUpdateProductId] = useState()

    // This function is use for open modal
    const openModal = () => {
        setIsModalOpen(true);
    };
    
    // This function is use for close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    // fetch Products from PAI
    const fetchProducts = async () => {
        const res = await getProducts();
        const {data : {data}} : any = res;
        setFetchProductsData(data)
    }

    // This function is use for delete product from API
    const handleProductDelete = async (id : any) => {
        SweetAlert.confirm(
            'Are you sure?',
            "You won't be able to revert this!",
            async () => {
                await deleteProduct(id)
                .then((res) => {
                    if(res){
                        setFetchProductsData((prevProducts) =>
                            prevProducts.filter((product : any) => product.id !== id)
                        )
                    }else{
                        return SweetAlert.error("Can't delete the product","Category are associated with it.")
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


    // This function is use for update product from API
    const handleProductUpdate = async (id : any) => {
        openModal()
        setHandleUpdateProductId(id)
    }

    useEffect(() => {
        fetchProducts()
    },[])


  return (    
    <div className="relative h-screen overflow-scroll">
        
        <div className='flex items-center justify-end bg-white p-3'>
            <h1 className='mr-auto font-bold text-gray-600 text-xl uppercase'>Products</h1>    
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

            {/* Add Products AddEdit Modal */}
            <AddEditProducts isOpen={isModalOpen } onClose={closeModal} handleUpdateProductID={handleUpdateProductID} fetchProducts={fetchProducts}/>
            <button type="button" onClick={openModal} className="font-medium rounded-lg text-sm px-5 py-2.5 ml-2 text-center inline-flex items-center text-white bg-gray-600 border-2 hover:bg-white hover:text-gray-600 hover:border-2 hover:border-gray-600">
                Add Products
            </button>

        </div>

        {/* This is a table showing user's */}
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-white uppercase bg-gray-600">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Image 
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Name 
                        <span className='float-right cursor-pointer'>
                            <TiArrowSortedUp/>
                            <TiArrowSortedDown/>
                        </span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Category 
                        <span className='float-right cursor-pointer'>
                            <TiArrowSortedUp/>
                            <TiArrowSortedDown/>
                        </span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price 
                        <span className='float-right cursor-pointer'>
                            <TiArrowSortedUp/>
                            <TiArrowSortedDown/>
                        </span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Qty 
                        <span className='float-right cursor-pointer'>
                            <TiArrowSortedUp/>
                            <TiArrowSortedDown/>
                        </span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Description 
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
                        Updated At
                        <span className='float-right cursor-pointer'>
                            <TiArrowSortedUp/>
                            <TiArrowSortedDown/>
                        </span>
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
                    fetchProductsData[0] ? fetchProductsData.map((item : any, index : any ) => {
                        return (
                            <tr key={index} className="bg-white border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center justify-start">
                                        <img className="w-10 h-10 rounded" src={item.image_url || "/images/avatar.avif"} alt="profile"/>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4">
                                    {item.category.name}
                                </td>
                                <td className="px-6 py-4">
                                    <b>₹</b> {item.price}
                                </td>
                                <td className="px-6 py-4">
                                    {item.qty}
                                </td>
                                <td className="px-6 py-4">
                                    {item.description}
                                </td>
                                <td className="px-6 py-4">
                                    {date(item.created_at)}
                                </td>
                                <td className="px-6 py-4">
                                    {date(item.updated_at)}
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
                                        <FiEdit onClick={() => handleProductUpdate(item.id)} className="text-blue-500 cursor-pointer mx-1"/>
                                        <RiDeleteBin6Line onClick={() => handleProductDelete(item.id)} className="text-red-500 cursor-pointer"/>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                    :
                    <tr className='bg-white border-b text-center font-bold uppercase'>
                        <td colSpan={10} className='px-6 py-4'>
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