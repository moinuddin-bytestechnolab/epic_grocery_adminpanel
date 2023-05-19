import Logo from '../../components/logo';
import { useFormik } from 'formik';
import { ResetSchema } from '../../schemas/ResetSchema';


const ResetPassword = () => {
    // This formik function is use for handeling form & validation
    const formik = useFormik({
        initialValues : {
            email : "",
            newPassword : "",
            confirmNewPassword : "",
        },
        validationSchema : ResetSchema,
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
                    <h3 className="mb-4 text-xl font-bold text-gray-900">Reset your password</h3>
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="name@company.com"/>
                            {formik.errors.email && formik.touched.email ? (<span className='text-red-500'>{formik.errors.email}</span>) : null}
                        </div>
                        <div>
                            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900">New password</label>
                            <input type="password" name="newPassword" id="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                            {formik.errors.newPassword && formik.touched.newPassword ? (<span className='text-red-500'>{formik.errors.newPassword}</span>) : null}
                        </div>
                        <div>
                            <label htmlFor="confirmNewPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm new password</label>
                            <input type="password" name="confirmNewPassword" id="confirmNewPassword" value={formik.values.confirmNewPassword} onChange={formik.handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                            {formik.errors.confirmNewPassword && formik.touched.confirmNewPassword ? (<span className='text-red-500'>{formik.errors.confirmNewPassword}</span>) : null}
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset password</button>
                    </form>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default ResetPassword