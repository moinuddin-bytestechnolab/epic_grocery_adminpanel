import * as Yup from 'yup';


export const LoginSchema  = Yup.object({
    email: Yup.string().email('Please enter valid email').required('Please enter your email'),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character").required('Please enter your password'),
})