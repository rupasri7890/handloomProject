import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-hot-toast';
import { resetPassword,forgotPassword } from "../integration/authentication_apies";

const ResetPassword = () => {
  const navigate = useNavigate()
  

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors,isValid },
  } = useForm({
    mode: "onTouched",
  })
  
   const resendActivationCode=async(email)=>{
    const result=await forgotPassword(email)
     if(result.data.status_code===201)
     {
      toast.success(result.data.message);

     }else{
      console.log(result.data.message)
      toast.error(result.data.message);
     }
            
   }
  const onSubmit = async (data) => {
    console.log(data)
    
    const requestBody={
      email:data.email,
      password: data.confirm_password,
      code: data.activation_code
    }
    
    const result= await resetPassword(requestBody)
    if(result.data.status_code===200)
    {
      toast.success(result.data.message)
      navigate("/")
    }
    else{
      toast.error(result.data.message)
    }
  }
  
  const password = watch("create_password")
  


  

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="title">Create Password</h1>
        <div className="inputs">
          <div className="input-field">
          <input
  type="email"
  className="input"
  placeholder="Email*"
  {...register("email", {
    required: "Email is required",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "Please enter a valid email address",
    },
  })}
/>
            <span className="input-border"></span>
          </div>
          {errors.email && (
  <span className="error-msg">{errors.email.message}</span>
)}
          <div className="input-field">
            <input
              type="number"
              className="input"
              placeholder="Activation code*"
              {...register("activation_code", { required: true })}
            />
            <span className="input-border"></span>
          </div>
          {errors.activation_code && (
            <span className="error-msg">*This field is required</span>
          )}
          <span style={{ alignSelf: "flex-end" }}>
          <Link className="link" onClick={() => resendActivationCode(watch("email"))}>
            Resend Activation Code
          </Link>         
           </span>
           <div className="input-field">
          <input
            type="password"
            className="input"
            placeholder="Create New Password*"
            {...register("create_password", {
              required: true,
              validate: {
                length: (value) =>
                  value.length >= 6 || "Password must be at least 6 characters",
                specialChar: (value) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                  "Password must contain at least one special character",
                capitalLetter: (value) =>
                /[A-Z]/.test(value) || "Password must contain a capital letter",              },
            })}
          />
          <span className="input-border"></span>
        </div>
        {errors.create_password && (
          <span className="error-msg">{errors.create_password.type === "required"
          ? "*Password is required"
          : errors.create_password.message}</span>
        )}

        <div className="input-field">
          <input
            type="password"
            className="input"
            placeholder="Confirm New Password*"
            {...register("confirm_password", {
              required: true,
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          <span className="input-border"></span>
        </div>
        {errors.confirm_password && (
          <span className="error-msg">
            {errors.confirm_password.message}
          </span>
        )}

<button
  type="submit"
  className={`btn ${isValid ? 'active' : ''}`}
  disabled={!isValid} // Disable the button when the form is not valid
>
  Create Password
</button>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword