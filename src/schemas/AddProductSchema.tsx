import * as Yup from 'yup';


export const addProductSchema  = Yup.object({
    category : Yup.string().required('Please select category'),
    name : Yup.string().required('Please enter product name'),
    price : Yup.number().required('Please enter product price'),
    qty : Yup.number().required('Please enter product quantity'),
    description : Yup.string().required('Please enter product description'),
    status : Yup.string().required('Please select product status'),
    created_at : Yup.date().required('Please select a created date').nullable(),
    updated_at : Yup.date().required('Please select a updated date').nullable(),
    img_url : Yup.array().min(1,'Please choose product image').max(5,'Sorry you can not add more than five images'),
})
