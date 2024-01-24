import { useForm } from "react-hook-form"
import { convertToBase64 } from "./utils"
import { addingWeaverProduct } from "../integration/authentication_apies"
import "../styles.css"
import toast from "react-hot-toast"

const AddDevice = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const file = data.image[0]; 
    const base64String = await convertToBase64(file); 
    data.image=base64String
    const response= await addingWeaverProduct(data)
    if (response.data.status_code === 201) {
      toast.success(response.data.message);
     }
     else if(response.data.status_code===409)
     {
      toast.error(response.data.message)
     }
     else{

     }
    }

  return (
    <form className="add-device-form" onSubmit={handleSubmit(onSubmit)}>
      <h1>Add Items</h1>
      <div className="add-device-input-container">
        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          id="name"
          className="add-device-input"
          {...register("name", { required: true })}
        />
        {errors.name && <span className="error">*This field is required</span>}
      </div>
      <div className="add-device-input-container">
        <label htmlFor="image">Upload Image:</label>
        <input
          type="file"
          id="image"
          className="add-device-input"
          {...register("image", { required: true })}
        />
        {errors.image && <span className="error">*This field is required</span>}
      </div>
      <div className="add-device-input-container">
        <label htmlFor="color">Color:</label>
        <input
          type="text"
          id="color"
          className="add-device-input"
          {...register("color", { required: true })}
        />
        {errors.color && <span className="error">*This field is required</span>}
      </div>
      <div className="add-device-input-container">
        <label htmlFor="color">Price:</label>
        <input
          type="text"
          id="price"
          className="add-device-input"
          {...register("price", { required: true })}
        />
        {errors.price && <span className="error">*This field is required</span>}
      </div>
      <div className="add-device-input-container">
        <label htmlFor="color">Description:</label>
        <input
          type="text"
          id="desc"
          className="add-device-input"
          {...register("desc", { required: true })}
        />
        {errors.price && <span className="error">*This field is required</span>}
      </div>
      <button type="submit" className="add-device-btn">
        Add Item
      </button>
    </form>
  )
}

export default AddDevice
