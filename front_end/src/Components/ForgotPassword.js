import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
// import { useRef, useState } from "react"
import axios from 'axios';
import { toast } from 'react-hot-toast';



const ForgotPassword = () => {
  const routing =useNavigate()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  })
  //const [otp, setOtp] = useState(null)
  //const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

  const onSubmit = async (data) => {
    console.log("hello")
     const result=await axios.put("http://127.0.0.1:8000/authentication/forgotPassword/" +data.email)
     if(result.data.status_code===201)
     {
      toast.success(result.data.message);
      routing("/reset-password")

     }else{
      console.log(result.data.message)
      toast.error(result.data.message);
     }
  }

  /* const handleInputChange = (index, e) => {
    const input = e.target
    const value = input.value

    if (value === "") {
      if (index > 0) {
        inputRefs[index - 1].current.focus()
      }
    } else if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus()
    }
  }

  const generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000)
    setTimeout(() => {
      toast.success("OTP: " + otp)
    }, 2500)
    setOtp(otp)
  }

  const validateOtp = () => {
    const userOtp = inputRefs.reduce(
      (otp, input) => (otp += input.current.value),
      ""
    )

    console.log(userOtp, otp)
    if (parseInt(userOtp) === otp) {
      alert("OTP is correct")
    } else {
      alert("OTP is incorrect")
    }
  } */

  const email = watch("email")
  const active = email !== "" ? "active" : ""
  console.log(active, email)

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="title">Forgot Password</h1>
        <p className="description">
          Enter the email address associated with your accont and we will send
          you a link to chnage your password.
        </p>
        <div className="inputs">
          <div className="input-field">
            <input
              type="email"
              className="input"
              placeholder="Email *"
              {...register("email", { required: true })}
            />
            <span className="input-border"></span>
          </div>
          {errors.email && (
            <span className="error-msg">*This field is required</span>
          )}

          {/*    <div className="otp-fields">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={inputRefs[index]}
                onChange={(e) => handleInputChange(index, e)}
              />
            ))}
          </div> */}

          <button type="submit" className="btn">
            sent Email
          </button>

          <Link
            to="/login"
            style={{
              textAlign: "center",
              color: "blue",
            }}
          >
            <span>Return to Login</span>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword