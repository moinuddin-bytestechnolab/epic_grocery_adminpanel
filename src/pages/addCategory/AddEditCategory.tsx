import { useFormik } from 'formik';
import { addCategorySchema } from '../../schemas/AddCategorySchema';


const AddEditCatgory = () => {
  // This formik function is use for handling form data & validation 
  const formik = useFormik({
    initialValues : {
        name : "",
        img_url : null,
    },
    validationSchema : addCategorySchema,
    onSubmit : (values) => {
        console.log(values);
    }
  })

  return (
    <div className="flex items-center justify-center top-0 left-0 right-0 z-50 w-full p-4 md:inset-0 max-h-full bg-gray-100">
        <div className="w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow">
                <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-bold text-gray-900">Add Category</h3>
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Category name</label>
                            <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Dairy & Bakery"/>
                            {formik.errors.name && formik.touched.name ? (<span className='text-red-500'>{formik.errors.name}</span>) : null}
                        </div>
                        <div>
                            <label htmlFor="img_url" className="block mb-2 text-sm font-medium text-gray-900">Choose category image</label>
                            <input type="file" name="img_url" id="img_url" accept='/*' onChange={(event : any) => { formik.setFieldValue('img_url', event.currentTarget.files[0]); }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                            {formik.errors.img_url && formik.touched.img_url ? (<span className='text-red-500'>{formik.errors.img_url}</span>) : null}
                            {formik.values.img_url && (<img src={URL.createObjectURL(formik.values.img_url)} alt="Preview" className='h-10 w-10 my-3'/>)}
                        </div>
                        <button type="submit" className="w-full text-white bg-gray-600 border-2 hover:bg-white hover:text-gray-600 hover:border-2 hover:border-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Category</button>
                    </form>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default AddEditCatgory