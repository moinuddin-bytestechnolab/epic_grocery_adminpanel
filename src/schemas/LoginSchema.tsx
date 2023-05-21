import * as Yup from 'yup';


export const LoginSchema  = Yup.object({
    email: Yup.string().email('Please enter valid email').required('Please enter your email'),
    password: Yup.string().required('Please enter your password'),
})