import axios from 'axios';

const API_URL = 'http://192.168.10.170:3000/';

// Login 
export const login = (email : any, password : any) => {
    return axios
    .post(`${API_URL}auth/login`,{
        email,password
    })
    .then((response)=>{
        if(response.data.accessToken){
            localStorage.setItem("user",JSON.stringify(response.data))
        }
        return response.data;
    })
    .catch((err) => {
        console.log(err);
    })
}


// Logout 
export const logout = () => {
    localStorage.removeItem("user")
}


// Register 
export const register = (username : any, email : any, password : any) => {
    return axios
    .post(API_URL + 'users/register',{
        username,email,password
    });
}


// Get current user
export const currentUser = () => {
    const userString = localStorage.getItem("user");
    if(userString){
        return JSON.parse(userString)
    }

    return null
}