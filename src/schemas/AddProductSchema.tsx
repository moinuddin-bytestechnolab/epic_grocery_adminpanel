import * as Yup from 'yup';


export const addProductSchema  = Yup.object({
    category : Yup.string().required('Please select category'),
    name : Yup.string().required('Please enter product name'),
    price : Yup.number().positive("Please enter product price").required('Please enter product price'),
    qty : Yup.number().positive('Please enter product quantity').required('Please enter product quantity'),
    description : Yup.string().required('Please enter product description'),
    status : Yup.string().required('Please select product status'),
    img_url : Yup.array().min(1,'Please choose product image').max(5,'Sorry you can not add more than five images'),
})
