import { Outlet, useNavigate } from "react-router-dom"
import SideBar from "./SideBar"
import TopBar from "./TopBar"
import { useState, useEffect, Suspense } from "react";
import Loader from "../../assets/Loader";


const Index = () => {
  const navigate = useNavigate();
  const [checkLogin, setCheckLogin] = useState(""); 
  

  useEffect(() => {
    const login : any = localStorage.getItem("user");
    setCheckLogin(login)
  })

  return (
    <>
      {
        checkLogin 
        ? 
         <div className="flex h-screen overflow-hidden  bg-gray-100">
            {/* Dashboard sidebar */}
                <SideBar/>
            <div className="flex-1 grid">
            {/* Dashboard topbar */}
                <TopBar />
            <div className="m-3 h-screen overflow-scroll">
            {/* Dashboard content here */}
              <Suspense fallback={<Loader/>}>
                <div className="mb-12">
                {<Outlet/>}
                </div>
              </Suspense>
            </div>
            </div>
        </div>
        :
        navigate("/login")
      }
    </>
  )
}

export default Index