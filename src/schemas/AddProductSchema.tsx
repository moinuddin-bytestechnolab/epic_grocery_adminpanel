import * as Yup from 'yup';


export const addProductSchema  = Yup.object({
    category : Yup.string().required('Please select category'),
    name : Yup.string().required('Please enter product name'),
    price : Yup.number().required('Please enter product price'),
    qty : Yup.number().required('Please enter product quantity'),
    description : Yup.string().required('Please enter product description'),
    img_url : Yup.array().min(1,'Please choose category image').max(5,'Sorry you can not add more than five images'),
})
