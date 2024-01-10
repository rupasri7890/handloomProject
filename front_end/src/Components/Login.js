import { useForm } from "react-hook-form";
//import {useState} from "react"
import "../styles.css";
import { Link ,useNavigate} from "react-router-dom";
import { toast } from 'react-hot-toast';




import { login } from "../integration/authentication_apies";


const Login = ( ) => {
  const navigate =useNavigate();

  const {
    register,
    handleSubmit,
      formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
  })

  // const [error, setError] = useState();



  const onSubmit = async (data) => {
    try {
      const response = await login(data)
      if (response.data.status_code === 200) {
        toast.success(response.data.message);
        localStorage.setItem("email",data.email)
        if(response.data.role==="weaver"){
          navigate("/weaverHome")
        }
        else{
          navigate("/customerHome")
        }

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      //setLoginError('Login failed. Please try again.');
      console.error('Error:', error);
    }
  };

  

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h1 className="title">Login</h1>
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
            type="password"
            className="input"
            placeholder="Password*"
            {...register("password", {
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
          {errors.password && (
            <span className="error-msg">*{errors.password.message}</span>
          )}
          <div className="forgot-password">
            <Link to="/forgot-password" className="link">
              <span>Forgot Password?</span>
            </Link>
          </div>
          <button
  type="submit"
  className={`btn ${isValid ? 'active' : ''}`}
  disabled={!isValid} // Disable the button when the form is not valid
>
  Login
</button>

          <div className="signup-link">
            <span>Don't have an account? </span>
            <Link to="/signup" className="link">
              Signup
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login