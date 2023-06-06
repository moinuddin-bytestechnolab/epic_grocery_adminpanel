import React from 'react';
import { Route, Routes } from "react-router-dom";
const Private = React.lazy(() => import('./private'));
const Public = React.lazy(() => import('./public'));
const Profile = React.lazy(() => import('../components/profile'));
const Settings = React.lazy(() => import('../components/settings'));
const ChangePassword = React.lazy(() => import('../pages/authentication/ChangePassword'));
const Categories = React.lazy(() => import('../pages/categories'));
const Dashboard = React.lazy(() => import('../pages/dashboard'));
const FeaturedProduct = React.lazy(() => import('../pages/featuredProduct'));
const Offers = React.lazy(() => import('../pages/offers'));
const OrderList = React.lazy(() => import('../pages/orderList'));
const PaymentHistory = React.lazy(() => import('../pages/paymentHistory'));
const Products = React.lazy(() => import('../pages/products'));
const Users = React.lazy(() => import('../pages/users'));
const Login = React.lazy(() => import('../pages/authentication/Login'));
const ForgotPassword = React.lazy(() => import('../pages/authentication/ForgotPassword'));
const ResetPassword = React.lazy(() => import('../pages/authentication/ResetPassword'));
const NotFoundPage = React.lazy(() => import('../pages/404'));
const Loader  = React.lazy(() => import ('../assets/Loader'));

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
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </>
    )
  }
  
  export default Index