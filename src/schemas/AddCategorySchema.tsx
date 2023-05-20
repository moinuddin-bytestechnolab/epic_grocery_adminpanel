import * as Yup from 'yup';


export const addCategorySchema  = Yup.object({
    name: Yup.string().required('Please enter category name'),
    status : Yup.string().required('Please select category status'),
    created_at : Yup.date().required('Please select a created date').nullable(),
    updated_at : Yup.date().required('Please select a updated date').nullable(),
    img_url: Yup.mixed().required('Please choose category image'),
})
