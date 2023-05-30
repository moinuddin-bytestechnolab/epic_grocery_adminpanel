import { useFormik } from 'formik';
import { addCategorySchema } from '../../schemas/AddCategorySchema';
import { addCategories, getCategories } from '../../api';


const AddEditCatgory = ({ isOpen, onClose} : any) => {
    

    // This formik function is use for handling form data & validation 
    const formik = useFormik({
        initialValues : {
            name : "",
            status : "1",
            img_url : null,
        },
        validationSchema : addCategorySchema,
        onSubmit : (values,actions) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("status", values.status);
            formData.append("image_url", values.img_url || '');
            
            addCategories(formData)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
            actions.resetForm()
            onClose(false)
        }
    })

    // This condition is use for handeling open close modal
    if (!isOpen) {
        return null;
    }

  return (
    <div className="fixed flex justify-center items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full" style={{background: 'radial-gradient(#9E9E9E, transparent)'}}>
        <div className="w-full max-w-xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
                <button type="button" onClick={onClose} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-bold text-gray-900">Add Category</h3>
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Category name</label>
                                <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Dairy & Bakery"/>
                                {formik.errors.name && formik.touched.name ? (<span className='text-red-500'>{formik.errors.name}</span>) : null}
                            </div>
                            <div>
                                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Category status</label>
                                <select id="status" name='status' value={formik.values.status} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                    <option value="1">Active</option>
                                    <option value="0">In Active</option>
                                </select>
                                {formik.errors.status && formik.touched.status ? (<span className='text-red-500'>{formik.errors.status}</span>) : null}
                            </div>
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