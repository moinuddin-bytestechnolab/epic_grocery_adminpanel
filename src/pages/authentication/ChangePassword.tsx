import { useFormik } from 'formik';
import { ChangePasswordSchema } from '../../schemas/ChangePasswordSchema';


const ChangePassword = () => {
    // This formik function is use for handling form & validation
    const formik = useFormik({
        initialValues : {
            oldPassword : "",
            newPassword : "",
            confirmNewPassword : "",
        },
        validationSchema : ChangePasswordSchema,
        onSubmit : (values) => {
          console.log(values);
        }
    })

  return (
    <div className="flex items-center justify-center top-0 left-0 right-0 z-50 w-full p-4 md:inset-0 max-h-full bg-gray-100">
        <div className="w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
                <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-bold text-gray-900">Change password</h3>
                    <p className='mb-4 text-base font-normal text-gray-500'>Change your password from here</p>
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-900">Old password</label>
                            <input type="password" name="oldPassword" id="oldPassword" value={formik.values.oldPassword} onChange={formik.handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                            {formik.errors.oldPassword && formik.touched.oldPassword ? (<span className='text-red-500'>{formik.errors.oldPassword}</span>) : null}
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
                        <button type="submit" className="w-full text-white bg-gray-600 border-2 hover:bg-white hover:text-gray-600 hover:border-2 hover:border-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Change password</button>
                    </form>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default ChangePassword