import * as Yup from 'yup';


export const addCategorySchema  = Yup.object({
    name: Yup.string().required('Please enter category name'),
    img_url: Yup.mixed().required('Please choose category image'),
})
