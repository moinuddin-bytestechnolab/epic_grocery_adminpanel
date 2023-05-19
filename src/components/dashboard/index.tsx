import SideBar from "./SideBar"
import TopBar from "./TopBar"
import { Routes, Route } from "react-router-dom"
import Dashboard from '../../pages/dashboard';
import UserList from '../../pages/userList';
import OrderList from '../../pages/orderList';
import Offers from '../../pages/offers';
import AddProduct from '../../pages/addProduct';
import AddCategory from '../../pages/addCategory';
import PaymentHistory from '../../pages/paymentHistory';
import FeaturedProduct from '../../pages/featuredProduct';
import ProductList from "../../pages/addProduct/ProductList";
import ChangePassword from "../../pages/authentication/ChangePassword";


const index = () => {
  return (
    <>
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Dashboard sidebar */}
      <SideBar/>
      <div className="flex-1 grid">
        {/* Dashboard topbar */}
        <TopBar />
        {/* Main dashboard content */}
        <div className="m-3">
          <Routes>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/user-list" element={<UserList/>}/>
              <Route path="/order-list" element={<OrderList/>}/>
              <Route path="/offers" element={<Offers/>}/>
              <Route path="/add-category" element={<AddCategory/>}/>
              <Route path="/add-product" element={<AddProduct/>}/>
              <Route path="/add-product-list" element={<ProductList/>}/>
              <Route path="/payment-history" element={<PaymentHistory/>}/>
              <Route path="/featured-product" element={<FeaturedProduct/>}/>
              <Route path="/change-password" element={<ChangePassword/>}/>
          </Routes>
        </div>
      </div>
    </div>
    </>
  )
}

export default index