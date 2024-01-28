import { useForm } from "react-hook-form"
import "../styles.css"
import { Link ,useNavigate} from "react-router-dom";
import { toast } from 'react-hot-toast';
import { signUp } from "../integration/authentication_apies"

const SignUp = () => {
  const navigate =useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors,isValid},
  } = useForm({
    mode: "onTouched",
  })

  const onSubmit = async (data) => {
    try {
      console.log(data)
      
      const requstBodyData={
          first_name: data.first_name,
          last_name: data.last_name,
          email:data.email,
          password:data.password,
          phone_number: data.phone_number,
          address: data.address||"",
          role:data.dropdown
        

      }
      const response = await signUp(requstBodyData)
      if (response.data.status_code === 201) {
        toast.success(response.data.message);
        navigate("/")

      } else {
        toast.error(response.data.message);
      }      
    } catch (error) {
      //setLoginError('Login failed. Please try again.');
      console.error('Error:', error);
    }
    }

  const validatePassword = (value) => {
    if (!value) {
      return "Password is required"
    }

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/
    const startsWithCapital = /^[A-Z]/

    if (!specialCharRegex.test(value)) {
      return "Password must contain at least one special character"
    }

    if (!startsWithCapital.test(value)) {
      return "Password must start with a capital letter"
    }

    if (value.length < 6) {
      return "Password must be at least 6 characters"
    }

    return true
  }
  // const allValues = watch()

  // const active = Object.values(allValues).every(
  //   (value) => value !== undefined && value !== ""
  // )
  //   ? "active"
  //   : ""

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h1 className="title">Create Account</h1>
        <div className="inputs">
          <div className="input-field">
            <input
              type="text"
              className="input"
              placeholder="First Name*"
              {...register("first_name", { required: true })}
            />
            <span className="input-border"></span>
          </div>
          {errors.first_name && (
            <span className="error-msg">*First Name is required</span>
          )}
          <div className="input-field">
            <input
              type="text"
              className="input"
              placeholder="Last Name*"
              {...register("last_name", { required: true })}
            />
            <span className="input-border"></span>
          </div>
          {errors.last_name && (
            <span className="error-msg">*Last Name is required</span>
          )}
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
              type="password"
              className="input"
              placeholder="*  Password"
              {...register("password", {
                validate: validatePassword,
              })}
            />
            <span className="input-border"></span>
          </div>
          {errors.password && (
            <span className="error-msg">*{errors.password.message}</span>
          )}
          
          <div className="input-field">
            <select {...register("dropdown", { required: true })} className="input" placeholder="role*">
              <option value="weaver">weaver</option>
              <option value="customer">customer</option>
            </select>
            {errors.dropdown && (
              <span className="error-msg">* Please select an option</span>
            )}
          </div>
          <div className="input-field">
            <input
              type="text"
              className="input"
              placeholder="Phone no.*"
              {...register("phone_number", { required: true })}
            />
            <span className="input-border"></span>
          </div>
          {errors.phone_number && (
            <span className="error-msg">*Phone no. is required</span>
          )}
          <div className="input-field">
            <input
              type="text"
              className="input"
              placeholder="Address"
              {...register("address")}
            />
            <span className="input-border"></span>
          </div>
          <button
  type="submit"
  className={`btn ${isValid ? 'active' : ''}`}
  disabled={!isValid} // Disable the button when the form is not valid
>
  Create Account
</button>
          
          <div className="signup-link">
            <span>Already have an account? </span>
            <Link to="/" className="link">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUp