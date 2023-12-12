import { useForm } from "react-hook-form"
import "../styles.css"
import { Link } from "react-router-dom"

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  })

  const onSubmit = (data) => {
    alert(JSON.stringify(data))
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

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h1 className="title">Create Account</h1>
        <div className="inputs">
          <div className="input-field">
            <input
              type="text"
              className="input"
              placeholder="* First Name"
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
              placeholder="* Last Name"
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
              placeholder="* Email"
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
            <input
              type="text"
              className="input"
              placeholder="* Phone no."
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

          <button type="submit" className="btn">
            Create
          </button>

          <div className="signup-link">
            <span>Already have an account? </span>
            <Link to="/login" className="link">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Signup