import { Route, Routes } from "react-router-dom"
import Private from './private';
import Public from './public';
import Profile from "../components/profile"
import Settings from "../components/settings"
import ChangePassword from "../pages/authentication/ChangePassword"
import Categories from "../pages/categories"
import Dashboard from "../pages/dashboard"
import FeaturedProduct from "../pages/featuredProduct"
import Offers from "../pages/offers"
import OrderList from "../pages/orderList"
import PaymentHistory from "../pages/paymentHistory"
import Products from "../pages/products"
import Users from "../pages/users"
import Login from '../pages/authentication/Login';
import ForgotPassword from "../pages/authentication/ForgotPassword";
import ResetPassword from "../pages/authentication/ResetPassword";


const Index = () => {

    return (
      <>
        <Routes>
            <Route path="/" element={<Private/>}>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/orders" element={<OrderList/>}/>
                <Route path="/offers" element={<Offers/>}/>
                <Route path="/categories" element={<Categories/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/payment-history" element={<PaymentHistory/>}/>
                <Route path="/featured-product" element={<FeaturedProduct/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/change-password" element={<ChangePassword/>}/>
                <Route path="/settings" element={<Settings/>}/>
            </Route>
            <Route path="/" element={<Public/>}>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
            </Route>
        </Routes>
      </>
    )
  }
  
  export default Index