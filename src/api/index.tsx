import { API_PORT } from "../config/config";
import axios from "axios";
import { AuthHeader } from "../services/Auth-Header";


// =========================================
// ---------- Change password API ----------
// =========================================
export const changePassword = async (password : any , new_password : any) => {
    try {
        const res = await axios.post(`${API_PORT}users/change-password`,{password,new_password},{headers : AuthHeader()});
        return  res;    
    } catch (error) {
        console.log(`Password not change ${error}`);
    }
}

// ================================
// ---------- User's API ----------
// ================================
export const getUsers = async () => {
    try {
        const res = await axios.get(`${API_PORT}users/findAll`,{headers : AuthHeader()});
        return res;
    } catch (error) {
        console.log(`Users not fetch ${error}`);
    }
}



// ====================================
// ---------- Categories API ----------
// ====================================

export const addCategories = async (addCategory : any) => {
    try {
        const res = await axios.post(`${API_PORT}categories/create`,addCategory,{headers : AuthHeader()});
        return res;
    } catch (error) {
        console.log(`Category not added ${error}`);
    }
}

export const getCategories = async () => {
    try {
        const data = await axios.get(`${API_PORT}categories`,{headers : AuthHeader()});
        return data;        
    } catch (error) {
        console.log(`Data is not fetch ${error}`);
    }
}

export const deleteCategory = async (id: any) => {
    try {
        const res = await axios.delete(`${API_PORT}categories/${id}`,{headers : AuthHeader()})
        return res;    
    } catch (error) {
        console.log(`Category not deleted ${error}`);
    }
}

export const categoryFindById = async ( id : any) => {
    try {
        const res = await axios.get(`${API_PORT}categories/${id}`,{headers : AuthHeader()});
        return res;
    } catch (error) {
        console.log(`category not found ${error}`);
    }
}

export const updateCategory = async (id : any, updateCategory : any) => {
    try {
        const res = await axios.put(`${API_PORT}categories/${id}`,updateCategory,{headers : AuthHeader()});
        return res;
    } catch (error) {
        console.log(`Category not updated ${error}`);
    }
}

// ====================================
// ---------- Products API ----------
// ====================================
export const addProduct = async (addProduct : any) => {
    try {
        const res = await axios.post(`${API_PORT}products/create`,addProduct,{headers : AuthHeader()});
        return res;
    } catch (error) {
        console.log(`Product not added ${error}`);
    }
}

export const getProducts = async () => {
    try {
        const data = await axios.get(`${API_PORT}products`,{headers : AuthHeader()});
        return data;        
    } catch (error) {
        console.log(`Data is not fetch ${error}`);
    }
}

export const deleteProduct = async (id: any) => {
    try {
        const res = await axios.delete(`${API_PORT}products/${id}`,{headers : AuthHeader()})
        return res;    
    } catch (error) {
        console.log(`Product not deleted ${error}`);
    }
}

export const productFindById = async ( id : any) => {
    try {
        const res = await axios.get(`${API_PORT}products/${id}`,{headers : AuthHeader()});
        return res;
    } catch (error) {
        console.log(`Product not found ${error}`);
    }
}

export const updateProduct = async (id : any, updateProducts : any) => {
    try {
        const res = await axios.put(`${API_PORT}products/${id}`,updateProducts,{headers : AuthHeader()});
        return res;
    } catch (error) {
        console.log(`Product not updated ${error}`);
    }
}

// =====================================
// ------------ Offer's API ------------
// =====================================

export const getOffers = async () => {
    try {
        const res = await axios.get(`${API_PORT}offers`,{headers : AuthHeader()})
        return res;
    } catch (error) {
        console.log(`Offer's not fetch ${error}`)
    }
}

export const addOffers = async (offersData : any) => {
    try {
        const res = await axios.post(`${API_PORT}offers/create`,offersData,{headers : AuthHeader()})
        return res;
    } catch (error) {
        console.log(`Offers not added ${error}`);
    }
}

export const findProductByCategoryId = async (categoryId : any) => {
    try {
        const res = await axios.get(`${API_PORT}products/findproducts/${categoryId}`,{headers : AuthHeader()})
        return res;
    } catch (error) {
        console.log(`Product not found ${error}`);
    }
}

