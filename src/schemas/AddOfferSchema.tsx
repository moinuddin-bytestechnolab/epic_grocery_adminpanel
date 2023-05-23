import * as Yup from 'yup';


export const addOfferSchema  = Yup.object({
    category_name : Yup.string().required('Please select category name'),
    product_name : Yup.string().required('Please select product name'),
    discount : Yup.string().required('Please enter discount'),
    start_date : Yup.date().required('Please select a start date').nullable(),
    end_date : Yup.date().required('Please select an end date').nullable(),
    created_at : Yup.date().required('Please select a created date').nullable(),
    updated_at : Yup.date().required('Please select a updated date').nullable(),
    status : Yup.string().required('Please select offer status'),
})
