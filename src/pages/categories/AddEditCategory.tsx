import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { addCategorySchema } from '../../schemas/AddCategorySchema';
import { addCategories, categoryFindById, updateCategory } from '../../api';
import Toaster from '../../hooks/Toaster';


const AddEditCatgory = ({ isOpen, onClose, handleCategoryUpdate, fetchCategoriesData} : any) => {
    // This formik function is use for handling form data & validation 
    const formik = useFormik({
        initialValues : {
            name : "",
            status : 1,
            img_url : null,
        },
        validationSchema : addCategorySchema,
        onSubmit : async (values,actions) => {            
            const cloudImage = new FormData()
            cloudImage.append("file",values.img_url || '');
            cloudImage.append("folder","epicGrocery");
            cloudImage.append("upload_preset","epicgrocery");
            cloudImage.append("cloud_name","dqiq9hctx");
            
            await fetch("https://api.cloudinary.com/v1_1/dqiq9hctx/image/upload",{
                method :"post",
                body : cloudImage
            })
            .then( (res)=>res.json())
            .then((data) =>{
                const formData = {
                    "name" : values.name,
                    "is_active" : values.status,
                    "image_url" : data.url
                }

                if(handleCategoryUpdate){
                    updateCategory(handleCategoryUpdate,formData)
                    .then((res) => {
                        if(res){
                            Toaster.success("Category update successfuly")
                            actions.resetForm()
                            onClose(false)
                            fetchCategoriesData()
                        }else{
                            Toaster.error("Category is not updated")
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })

                }else{
                    addCategories(formData)
                    .then((res) => {
                        if(res){
                            Toaster.success("Category add successfuly")
                            actions.resetForm()
                            onClose(false)
                            fetchCategoriesData()
                        }else{
                            Toaster.error("Category already exist")
                            console.log('already exist => ',res);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    })
    
    
    // This function is use for update category from API
    const handleUpdateCategory = async () => {
        const res = await categoryFindById(handleCategoryUpdate)
        const { data } : any = res?.data || {};
        formik.setValues({
            "name" : data?.name || '',
            "status" : data?.is_active ? 1 : 0,
            "img_url" : data?.image_url || null
        })    
 
    }   

    useEffect(()=>{
        if(handleCategoryUpdate){
            handleUpdateCategory()
        }
    },[handleCategoryUpdate])
    
    // This condition is use for handeling open close modal
    if (!isOpen) {
        return null;
    }

    const handleModalClose = () => {
        onClose()
        formik.resetForm()
    }

  return (
    <div className="fixed flex justify-center items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full" style={{background: 'radial-gradient(#9E9E9E, transparent)'}}>
        <div className="w-full max-w-xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
                <button type="button" onClick={handleModalClose} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal">
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
                                    <option value={1} >Active</option>
                                    <option value={0} >In Active</option>
                                </select>
                                {formik.errors.status && formik.touched.status ? (<span className='text-red-500'>{formik.errors.status}</span>) : null}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="img_url" className="block mb-2 text-sm font-medium text-gray-900">Choose category image</label>
                            <input type="file" name="img_url" id="img_url" accept='/*' 
                            onChange={(event : any) => { formik.setFieldValue('img_url', event.currentTarget.files[0])}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                            {formik.errors.img_url && formik.touched.img_url ? (<span className='text-red-500'>{formik.errors.img_url}</span>) : null}
                            {/* Here getting error pending resolve :Problem => when i clicked on edit i get white screen */}
                            {/* {formik.values.img_url && (<img src={URL.createObjectURL(formik.values.img_url)} alt="Preview" className='h-10 w-10 my-3'/>)} */}
                        </div>
                        <button type="submit" className="w-full text-white bg-gray-600 border-2 hover:bg-white hover:text-gray-600 hover:border-2 hover:border-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{handleCategoryUpdate ? "Update Category" : "Add Category" }</button>
                    </form>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default AddEditCatgory