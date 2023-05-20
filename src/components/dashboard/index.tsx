import SideBar from "./SideBar"
import TopBar from "./TopBar"
import { Routes, Route } from "react-router-dom"
import Dashboard from '../../pages/dashboard';
import UserList from '../../pages/userList';
import OrderList from '../../pages/orderList';
import Offers from '../../pages/offers';
import PaymentHistory from '../../pages/paymentHistory';
import FeaturedProduct from '../../pages/featuredProduct';
import ProductList from "../../pages/addProduct/ProductList";
import ChangePassword from "../../pages/authentication/ChangePassword";
import Categories from "../../pages/addCategory";
import Profile from '../../components/profile';
import Settings from '../../components/settings';


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
              <Route path="/users" element={<UserList/>}/>
              <Route path="/orders" element={<OrderList/>}/>
              <Route path="/offers" element={<Offers/>}/>
              <Route path="/categories" element={<Categories/>}/>
              <Route path="/products" element={<ProductList/>}/>
              <Route path="/payment-history" element={<PaymentHistory/>}/>
              <Route path="/featured-product" element={<FeaturedProduct/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/change-password" element={<ChangePassword/>}/>
              <Route path="/settings" element={<Settings/>}/>
          </Routes>
        </div>
      </div>
    </div>
    </>
  )
}

export default index