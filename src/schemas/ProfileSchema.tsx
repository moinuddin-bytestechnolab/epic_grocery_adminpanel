import * as Yup from 'yup';


export const ProfileSchema = Yup.object({
    profile_img : Yup.mixed().required('Please choose profile image'),
    first_name : Yup.string().min(2).max(20).required("Please enter your first name"),
    last_name : Yup.string().min(2).max(20).required("Please enter your last name"),
    mobile : Yup.string().min(10).max(10).required("Please enter your phone number"),
    email: Yup.string().email().required('Please enter your email'),
})
