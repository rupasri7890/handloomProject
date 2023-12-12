import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const ResetPassword = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  const password = watch("create_password")
  const confirm_password = watch("confirm_password")
  const activation_code = watch("activation_code")
  const active =
    password !== "" && confirm_password !== "" && activation_code !== ""
      ? "active"
      : ""
  console.log(active, password)

  const navigate = useNavigate()
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="title">Create Password</h1>
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
          <div className="input-field">
            <input
              type="text"
              className="input"
              placeholder="Activation code *"
              {...register("activation_code", { required: true })}
            />
            <span className="input-border"></span>
          </div>
          {errors.activation_code && (
            <span className="error-msg">*This field is required</span>
          )}
          <span style={{ alignSelf: "flex-end" }}>
            <Link className="link">Resend Activation Code</Link>
          </span>
          <div className="input-field">
            <input
              type="password"
              className="input"
              placeholder="Create New Password *"
              {...register("create_password", { required: true })}
            />
            <span className="input-border"></span>
          </div>
          {errors.create_password && (
            <span className="error-msg">*This field is required</span>
          )}
          <div className="input-field">
            <input
              type="password"
              className="input"
              placeholder="Confirm New Password *"
              {...register("confirm_password", { required: true })}
            />
            <span className="input-border"></span>
          </div>
          {errors.confirm_password && (
            <span className="error-msg">*This field is required</span>
          )}

          <button
            type="submit"
            className={`btn ${active}`}
            onClick={() => {
              if (password !== "") {
                navigate("/reset-password")
              } else {
                toast.error("Please Enter Email")
              }
            }}
          >
            Create Password
          </button>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword