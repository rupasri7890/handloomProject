import { useForm } from "react-hook-form";
//import {useState} from "react"
import "../styles.css";
import { Link ,useNavigate} from "react-router-dom";
import { toast } from 'react-hot-toast';




import axios from 'axios';


const Login = ( ) => {
  const navigate =useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  })

  // const [error, setError] = useState();



  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/authentication/login', {
        email: data.email,
        password: data.password,
      });
      if (response.data.status_code === 200) {
        toast.success(response.data.message);
        navigate("/home"); 

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      //setLoginError('Login failed. Please try again.');
      console.error('Error:', error);
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      return "Password is required"
    }

   
    if (value.length < 6) {
      return "Password must be at least 6 characters"
    }

    return true
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h1 className="title">Login</h1>
        <div className="inputs">
          <div className="input-field">
            <input
              type="email"
              className="input"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            <span className="input-border"></span>
          </div>
          {errors.email && (
            <span className="error-msg">*Email is required</span>
          )}
          <div className="input-field">
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("password", {
                validate: validatePassword,
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

          <button type="submit" className="btn">
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