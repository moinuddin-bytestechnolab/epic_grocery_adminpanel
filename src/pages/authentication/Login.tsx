import Logo from '../../components/logo';
import { useFormik } from 'formik';
import { LoginSchema } from '../../schemas/LoginSchema';


const Login = () => {
    // This formik function is use for handeling form & validation
    const formik = useFormik({
        initialValues : {
            email : "",
            password : "",
        },
        validationSchema : LoginSchema,
        onSubmit : (values) => {
            console.log(values);
        }
    })

  return (
    <div className="flex h-screen items-center justify-center top-0 left-0 right-0 z-50 w-full p-4 md:inset-0 max-h-full bg-gray-50">
        <div className="w-full max-w-md max-h-full">
            <div className='flex justify-center m-10'>
                <Logo/>
            </div>
            <div className="relative bg-white rounded-lg shadow">
                <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-bold text-gray-900">Sign in to admin panel</h3>
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="name@company.com"/>
                            {formik.errors.email && formik.touched.email ? (<span className='text-red-500'>{formik.errors.email}</span>) : null}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                            <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                            {formik.errors.password && formik.touched.password ? (<span className='text-red-500'>{formik.errors.password}</span>) : null}
                        </div>
                        <div className="flex justify-between">
                            <a href="#" className="text-sm text-blue-700 hover:underline">Lost Password?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login to your account</button>
                    </form>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default Login