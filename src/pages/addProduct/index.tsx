import { useFormik } from 'formik';
import { TiDelete } from 'react-icons/ti';
import { addProductSchema } from '../../schemas/AddProductSchema';


const Index = () => {
    // This formik function use for handling form data & validation 
    const formik = useFormik({
        initialValues : {
            category : "",
            name : "",
            description : "",
            price : 0,
            qty : 0,
            img_url : [],
        },
        validationSchema : addProductSchema,
        onSubmit : (values) => {
            console.log(values);    
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

  return (
    <div className="flex items-center justify-center top-0 left-0 right-0 z-50 w-full p-4 md:inset-0 max-h-full bg-gray-100">
        <div className="w-full max-w-lg max-h-full">
            <div className="relative bg-white rounded-lg shadow">
                <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-bold text-gray-900">Add Product</h3>
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">               
                            <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Select category</label>
                                <select id="category" name='category' value={formik.values.category} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                    <option selected>Choose a category</option>
                                    <option value="Dairy & Bakery">Dairy & Bakery</option>
                                    <option value="Foods">Foods</option>
                                    <option value="Vegitable">Vegitable</option>
                                </select>
                                {formik.errors.category && formik.touched.category ? (<span className='text-red-500'>{formik.errors.category}</span>) : null}
                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Product name</label>
                                <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Milk"/>
                                {formik.errors.name && formik.touched.name ? (<span className='text-red-500'>{formik.errors.name}</span>) : null}
                            </div>
                            <div>
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                                <input type="number" name="price" id="price" value={formik.values.price} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="₹100"/>
                                {formik.errors.price && formik.touched.price ? (<span className='text-red-500'>{formik.errors.price}</span>) : null}
                            </div>
                            <div>
                                <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                                <input type="number" name="qty" id="qty" value={formik.values.qty} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="05"/>
                                {formik.errors.qty && formik.touched.qty ? (<span className='text-red-500'>{formik.errors.qty}</span>) : null}
                            </div>                                
                        </div>
                        <div>
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                            <input type="text" name="description" id="description" value={formik.values.description} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Description"/>
                            {formik.errors.description && formik.touched.description ? (<span className='text-red-500'>{formik.errors.description}</span>) : null}
                        </div>
                        <div>
                            <label htmlFor="img_url" className="block mb-2 text-sm font-medium text-gray-900">Choose product images</label>
                            <input type="file" name="img_url" id="img_url" accept='images/*' multiple onChange={handleFileChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"/>
                            {
                                formik.values.img_url.map((item,index)=>{
                                    return (
                                        <div className='inline-flex'> 
                                            <img key={index} src={URL.createObjectURL(item)} alt="product-img" className='h-10 w-10 m-2'/>
                                            <span onClick={() => handleFileDelete(index)} className='flex items-center text-red-500 cursor-pointer'><TiDelete/></span>
                                        </div>
                                    )
                                })
                            }
                            {formik.errors.img_url && formik.touched.img_url ? (<span className='text-red-500'>{formik.errors.img_url}</span>) : null}
                        </div>
                        <button type="submit" className="w-full text-white bg-gray-600 border-2 hover:bg-white hover:text-gray-600 hover:border-2 hover:border-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Category</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Index
