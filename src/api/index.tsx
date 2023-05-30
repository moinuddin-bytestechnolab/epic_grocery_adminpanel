import axios from "axios";
import { AuthHeader } from "../services/Auth-Header";


const SERVER = "http://192.168.10.170:3000/"

// =========================================
// ---------- Change password API ----------
// =========================================
export const changePassword = async (password : any , new_password : any) => {
    try {
        const res = await axios.post(`${SERVER}users/change-password`,{password,new_password},{headers : AuthHeader()});
        return  res;    
    } catch (error) {
        console.log(`Password not change ${error}`);
    }
}


// ====================================
// ---------- Categories API ----------
// ====================================
export const addCategories = async (addCategory : any) => {
    try {
        const res = await axios.post(`${SERVER}categories/create`,addCategory,{headers : AuthHeader()});
        return res;
    } catch (error) {
        console.log(`Category not added ${error}`);
    }
}

export const getCategories = async () => {
    try {
        const data = await axios.get(`${SERVER}categories`,{headers : AuthHeader()});
        return data;        
    } catch (error) {
        console.log(`Data is not fetch ${error}`);
    }
}

export const deleteCategory = async (id: any) => {
    try {
        const res = await axios.delete(`${SERVER}categories/${id}`,{headers : AuthHeader()})
        return res;    
    } catch (error) {
        console.log(`Category not deleted ${error}`);
    }
}

export const categoryFindById = async ( id : any) => {
    try {
        const res = await axios.post(`${SERVER}categories/${id}`,{Headers : AuthHeader});
        return res;
    } catch (error) {
        console.log(`category not find ${error}`);
    }
}