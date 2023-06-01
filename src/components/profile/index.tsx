import { useState, useEffect } from "react";
import { useFormik } from "formik"
import { ProfileSchema } from '../../schemas/ProfileSchema';


const Index = () => {
  const [userProfileData, setUserProfileData] = useState<any>({})
  const [disabled, setDisabled] = useState(true)

  const getUserData = () => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (user && user.accessToken) {
      setUserProfileData(user.data);
    } else {
      console.log('not found');
    }
  };

  useEffect(() => {

    getUserData();

  },[]);
    

  // This formik function is use for hndleling form & validation
  const formik = useFormik({
    initialValues : {
      profile_img : null,
      first_name : "",
      last_name : "",
      mobile : "",
      email: "",
    },
    // validationSchema : ProfileSchema,
    onSubmit : (values) => {
      setDisabled(false)
      console.log(values);
    }
  })

  const handleEdit = () => {
   formik.setValues({
    "first_name" : userProfileData.first_name,
    "last_name" : userProfileData.last_name,
    "mobile" : userProfileData.phone,
    "email" : userProfileData.email,
    "profile_img" : "" || null
   })
  }

  useEffect(() => {
    handleEdit()
  },[userProfileData])

  return (
    <div className="flex items-center justify-center top-0 left-0 right-0 z-50 w-full p-4 md:inset-0 max-h-full bg-gray-100">
      <div className="w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="px-6 py-6 lg:px-8">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex justify-center mb-1">
                  <label htmlFor="profile_img">
                    {
                      formik.values.profile_img ?
                       (<img src={URL.createObjectURL(formik.values.profile_img)} alt="User profile" className='w-24 h-24 rounded-full cursor-pointer'/>)
                       :
                       (<img src="images/avatar.avif" alt="User profile" className='w-24 h-24 rounded-full cursor-pointer'/>)
                    }
                  </label>
                  <input
                      id="profile_img"
                      name="profile_img"
                      type="file"
                      accept="image/*"
                      className="inset-0 opacity-0 w-0 h-0 cursor-pointer border"
                      onChange={(event : any) => { formik.setFieldValue('profile_img', event.currentTarget.files[0]); }}  
                  />
              </div>
              <div className="mb-5 text-center">
                {formik.errors.profile_img && formik.touched.profile_img ? (<span className='text-red-500'>{formik.errors.profile_img}</span>) : null}
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                      <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                      <input type="text" id="first_name" name="first_name" value={formik.values.first_name} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter first name here" disabled={disabled}/>
                      {formik.errors.first_name && formik.touched.first_name ? (<span className='text-red-500'>{formik.errors.first_name}</span>) : null}
                  </div>
                  <div>
                      <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                      <input type="text" id="last_name" name="last_name" value={formik.values.last_name} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter last name here" disabled={true}/>
                      {formik.errors.last_name && formik.touched.last_name ? (<span className='text-red-500'>{formik.errors.last_name}</span>) : null}
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                      <input type="text" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter your email here" disabled={true}/>
                      {formik.errors.email && formik.touched.email ? (<span className='text-red-500'>{formik.errors.email}</span>) : null}
                  </div>  
                  <div>
                      <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900">Mobile</label>
                      <input type="text" id="mobile" name="mobile" value={formik.values.mobile} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter mobile number here" disabled={true}/>
                      {formik.errors.mobile && formik.touched.mobile ? (<span className='text-red-500'>{formik.errors.mobile}</span>) : null}
                  </div>
              </div>
              <button type="submit" className="w-full text-white bg-gray-600 border-2 hover:bg-white hover:text-gray-600 hover:border-2 hover:border-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Edit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index