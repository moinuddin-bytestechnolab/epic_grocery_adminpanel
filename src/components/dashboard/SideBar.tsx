import { NavLink } from 'react-router-dom';
import Logo from '../../components/logo';
import { VscPieChart } from 'react-icons/vsc';
import { CgUserList } from 'react-icons/cg';
import { TbListCheck } from 'react-icons/tb';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { BiCartAdd } from 'react-icons/bi';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { RiChatHistoryLine } from 'react-icons/ri';
import { TbDiscountCheck } from 'react-icons/tb';


const SideBar = () => {
  return (
    <aside id="default-sidebar" className="top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#fff]">
            <div className='flex items-center p-2 pb-7'>
                {/* Dashboard logo */}
                <Logo/>
            </div>
            <ul className="space-y-2 font-medium">
                <li>
                    <NavLink to="/" className="flex items-center p-2 text-gray-900 rounded-lg">
                    <VscPieChart className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"/>
                    <span className="ml-3">Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/users" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                    <CgUserList className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"/>
                    <span className="ml-3">Users</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/orders" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                    <TbListCheck className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"/>
                    <span className="ml-3">Orders</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/categories" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                    <HiOutlineViewGridAdd className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"/>
                    <span className="ml-3">Categories</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/products" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                    <BiCartAdd className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"/>
                    <span className="ml-3">Products</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/offers" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                    <MdOutlineLocalOffer className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"/>
                    <span className="ml-3">Offers</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/payment-history" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                    <RiChatHistoryLine className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"/>
                    <span className="ml-3">Payment History</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/featured-product" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                    <TbDiscountCheck className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"/>
                    <span className="ml-3">Featured Product</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    </aside>
  )
}

export default SideBar