import { useFormik } from 'formik';
import { addOfferSchema } from '../../schemas/AddOfferSchema';
import { addOffers, findProductByCategoryId, getCategories } from '../../api';
import { useState, useEffect } from 'react';


const AddEditOffer = ({ isOpen, onClose } : any) => {
    // fetch categories data
    const [fetchCategories, setFetchCategories] = useState([]); 

    // fetch products data
    const [fetchProducts, setFetchProducts] = useState([]); 

    // 
    const [temp, setTemp] = useState(false)

    // This formik function is use for handling form data & validation 
    const formik = useFormik({
        initialValues : {
            category_name : 0,
            product_name : 0,
            discount : "",
            start_date : "",
            end_date : "",
            status : 1,
        },
        validationSchema : addOfferSchema,
        onSubmit : (values,actions) => {
            const formData = {
                "category" : values.category_name,
                "product" : values.product_name,
                "discount_percentage" : Number(values.discount),
                "start_date" : values.start_date,
                "end_date" : values.end_date,
                "is_active" : values.status,
            }
            
            addOffers(formData)
            .then((res) => {
                if(res){
                    console.log('offers added successfukt= >', res);
                    actions.resetForm()
                    onClose(false)
                }
            })
        }
    })

    // This function is use for fetch categories data from API
    const fetchCategoriesData = async () => {
        const res : any = await getCategories()
        setFetchCategories(res.data.data)
    }


    if(formik.values.category_name){
        // This function is use for fetch products by category id from API
        const fetchProductsData = async () => {
            const categoryID = formik.values.category_name;
            const res : any = await findProductByCategoryId(categoryID)
            console.log('res => ', res);
            setFetchProducts(res.data.data)
        }
        // fetchProductsData()
    }
    useEffect(() => {
        fetchCategoriesData()
    },[])
    
    console.log('fetchProducts => ', fetchProducts);
        
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
                    <h3 className="mb-4 text-xl font-bold text-gray-900">Add Offer</h3>
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="category_name" className="block mb-2 text-sm font-medium text-gray-900">Category Name</label>
                                <select id="category_name" name='category_name' value={formik.values.category_name} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                    <option value="">Choose category</option>
                                    {
                                        fetchCategories[0] ? 
                                        fetchCategories.map((item : any,  index : any) => {
                                            return (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            )
                                        })
                                        :
                                        <option value="">category not found</option>
                                    }
                                </select>
                                {formik.errors.category_name && formik.touched.category_name ? (<span className='text-red-500'>{formik.errors.category_name}</span>) : null}
                            </div>
                            <div>
                                <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                                <select id="product_name" name='product_name' value={formik.values.product_name} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                    <option value="">Choose product</option>
                                    {
                                        <option value="Milk">Milk</option>
                                    }
                                </select>
                                {formik.errors.product_name && formik.touched.product_name ? (<span className='text-red-500'>{formik.errors.product_name}</span>) : null}
                            </div>
                            <div>
                                <label htmlFor="start_date" className="block mb-2 text-sm font-medium text-gray-900">Start Date</label>
                                <input type="date" name="start_date" id="start_date" value={formik.values.start_date} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                {formik.errors.start_date && formik.touched.start_date ? (<span className='text-red-500'>{formik.errors.start_date}</span>) : null}
                            </div>
                            <div>
                                <label htmlFor="end_date" className="block mb-2 text-sm font-medium text-gray-900">End Date</label>
                                <input type="date" name="end_date" id="end_date" value={formik.values.end_date} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                                {formik.errors.end_date && formik.touched.end_date ? (<span className='text-red-500'>{formik.errors.end_date}</span>) : null}
                            </div>
                            <div>
                                <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900">Discount %</label>
                                <input type="text" name="discount" id="discount" value={formik.values.discount} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder='Enter discount here'/>
                                {formik.errors.discount && formik.touched.discount ? (<span className='text-red-500'>{formik.errors.discount}</span>) : null}
                            </div>
                            <div>
                                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                                <select id="status" name='status' value={formik.values.status} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                    <option value={1}>Active</option>
                                    <option value={0}>In Active</option>
                                </select>
                                {formik.errors.status && formik.touched.status ? (<span className='text-red-500'>{formik.errors.status}</span>) : null}
                            </div>
                        </div>
                        <button type="submit" className="w-full text-white bg-gray-600 border-2 hover:bg-white hover:text-gray-600 hover:border-2 hover:border-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Offer</button>
                    </form>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default AddEditOffer