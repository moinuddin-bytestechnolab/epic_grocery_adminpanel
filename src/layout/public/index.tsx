import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"


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
        navigate("/")
        :
        <Outlet/>
      }
    </>
  )
}

export default Index