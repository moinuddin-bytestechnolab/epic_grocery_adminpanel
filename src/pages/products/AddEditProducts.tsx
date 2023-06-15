import { useEffect,  useState } from 'react';
import { useFormik } from 'formik';
import { TiDelete } from 'react-icons/ti';
import { addProductSchema } from '../../schemas/AddProductSchema';
import { addProduct, getCategories, productFindById, updateProduct } from '../../api';
import Toaster from '../../hooks/Toaster';


const AddEditProducts = ({ isOpen, onClose, handleUpdateProductID, fetchProducts } : any) => {
    // This state use for store fetch categories data
    const [fetchCategoriesData, setFetchCategoriesData] = useState([])
    
  // This formik function use for handling form data & validation 
  const formik = useFormik({
    initialValues : {
        category : "" ,
        name : "",
        description : "",
        price : "",
        qty : "",
        status : 1,
        img_url : null || '' || [],
    },
    validationSchema : addProductSchema,
    onSubmit : async (values, actions) => {
        console.log('values => ',values.img_url);
        const images:any[] = [];
        const cloudImage = new FormData()
            values.img_url.map((file : any, index : any) => {
                console.log('values => ',file);  
                cloudImage.append("file",file)
                cloudImage.append("folder","epicGrocery");
                cloudImage.append("upload_preset","epicgrocery");
                cloudImage.append("cloud_name","dqiq9hctx");
                
                console.log('cloudImage =>', cloudImage);
                
                fetch("https://api.cloudinary.com/v1_1/dqiq9hctx/image/upload",{
                    method :"post",
                    body : cloudImage
                })
                .then( (res)=>{
                    return res.json()
                }).then((data) =>{
                    console.log(data)
                    images.push(data.url)
                })
            })
            console.log(images)
            // if(images.length === values.img_url.length ){

            // }
            // .then((data) =>{
            //     const formData = {
            //         "category_id" : values.category ,
            //         "name" : values.name,
            //         "description" : values.description,
            //         "price" : values.price,
            //         "qty" : values.qty,
            //         "is_active" : values.status,
            //         "image_url" : data.url,
            //     }
                
            //     if(handleUpdateProductID){
            //         updateProduct(handleUpdateProductID,formData)
            //         .then((res) => {
            //             if(res){
            //                 Toaster.success("Product update successfuly")
            //                 actions.resetForm()
            //                 onClose(false)
            //                 fetchProducts()
            //             }else{
            //                 Toaster.error("Product is not updated")
            //             }
            //         })
            //         .catch((error) => {
            //             console.log(error);
            //         })

            //     }else{
            //         addProduct(formData)
            //         .then((res) => {
            //             if(res){
            //                 Toaster.success("Product add successfuly")
            //                 actions.resetForm()
            //                 onClose(false)
            //                 fetchProducts()
            //             }else{
            //                 Toaster.error("Product already exist")
            //             }
            //         })
            //         .catch((error) => {
            //             console.log(error);
            //         })
            //     }
            // })
            // .catch((error) => {
            //     console.log(error);
            // })    
    }
})  

// This handleFileChange function is use for getting multiple input files
const handleFileChange = (event : any) => { 
    const files : any = Array.from(event.currentTarget.files);
    formik.setFieldValue('img_url', formik.values.img_url.concat(files))
  };

// This handleFileDelete function is use for deleting multiple input files
const handleFileDelete = (index : any) => {
    const newImages = [...formik.values.img_url];
    newImages.splice(index, 1);
    formik.setFieldValue('img_url', newImages);
}

// fetch categories from API
const fetchCategories = async () => {
    const res = await getCategories();
    const {data : {data}} : any = res;
    setFetchCategoriesData(data)
}

// This function is use for update product from API
const handleUpdateProduct = async () => {
    const res = await productFindById(handleUpdateProductID)
    const { data } : any = res?.data || {};
    console.log('data => ', data);
    
    formik.setValues({
        "category" : data?.category.name || '' ,
        "name" : data?.name,
        "description" : data?.description,
        "price" : data?.price,
        "qty" : data?.qty,
        "status" : data?.is_active ? 1 : 0,
        "img_url" : data?.image_url || null,
    })    

}   


useEffect(() => {
    if(handleUpdateProductID){
        handleUpdateProduct()
    }

    fetchCategories()
},[handleUpdateProductID])


// This condition is use for handeling open close modal
if (!isOpen) {
  return null;
}

  return (
    <div className="fixed flex justify-center items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full" style={{background: 'radial-gradient(#9E9E9E, transparent)'}}>
        <div className="w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
                <button type="button" onClick={onClose} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-bold text-gray-900">Add Product</h3>
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <div className="grid gap-6 mb-6 md:grid-cols-3">               
                            <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Select category</label>
                                <select id="category" name='category' value={formik.values.category} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                <option value="">choose category</option>
                                    {
                                        fetchCategoriesData[0] ? fetchCategoriesData.map((item : any, index : any) => {
                                            return (
                                                <>
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                </>
                                            )
                                        })
                                        :
                                        <option>category not found</option>
                                    }
                                </select>
                                {formik.errors.category && formik.touched.category ? (<span className='text-red-500'>{formik.errors.category}</span>) : null}
                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Product name</label>
                                <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Milk"/>
                                {formik.errors.name && formik.touched.name ? (<span className='text-red-500'>{formik.errors.name}</span>) : null}
                            </div>
                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <input type="text" name="description" id="description" value={formik.values.description} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Description"/>
                                {formik.errors.description && formik.touched.description ? (<span className='text-red-500'>{formik.errors.description}</span>) : null}
                            </div>
                            <div>
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                                <input type="text" name="price" id="price" value={formik.values.price} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="₹100"/>
                                {formik.errors.price && formik.touched.price ? (<span className='text-red-500'>{formik.errors.price}</span>) : null}
                            </div>
                            <div>
                                <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                                <input type="text" name="qty" id="qty" value={formik.values.qty} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="05"/>
                                {formik.errors.qty && formik.touched.qty ? (<span className='text-red-500'>{formik.errors.qty}</span>) : null}
                            </div>                                
                            <div>
                                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Product status</label>
                                <select id="status" name='status' value={formik.values.status} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                    <option value={1}>Active</option>
                                    <option value={0}>In Active</option>
                                </select>
                                {formik.errors.status && formik.touched.status ? (<span className='text-red-500'>{formik.errors.status}</span>) : null}
                            </div>                          
                        </div>
                        <div>
                            <label htmlFor="img_url" className="block mb-2 text-sm font-medium text-gray-900">Choose product images</label>
                            <input type="file" name="img_url" id="img_url" accept='images/*' multiple onChange={handleFileChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                            {/* {
                                formik.values.img_url.map((item,index)=>{
                                    return (
                                        <div className='inline-flex'> 
                                            <img key={index} src={URL.createObjectURL(item)} alt="product-img" className='h-10 w-10 m-2'/>
                                            <span onClick={() => handleFileDelete(index)} className='flex items-center text-red-500 cursor-pointer'><TiDelete/></span>
                                        </div>
                                    )
                                })
                            } */}
                            {/* {formik.errors.img_url && formik.touched.img_url ? (<span className='text-red-500'>{formik.errors.img_url}</span>) : null} */}
                        </div>
                        <button type="submit" className="w-full text-white bg-gray-600 border-2 hover:bg-white hover:text-gray-600 hover:border-2 hover:border-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{handleUpdateProductID ? "Update Product" : "Add Product" }</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddEditProducts