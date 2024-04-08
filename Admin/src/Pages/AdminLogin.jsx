import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser, loginToast } from "../Auth/Login";
export default function AdminLogin() {
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    try {
      const response = await loginUser(data);
      setResponse(response);
    } catch (error) {
      setResponse(error);
      reset();
    }
  }
  useEffect(() => {
    loginToast(response)
      .then(() => {
        navigate("/dashboard", { replace: true });
      })
      .catch(() => {});
      document.title = 'Admin Login'
  }, [response, navigate]);
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold">TownGuard</h1>
            <p className="text-sm font-medium">Admin Login</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                className="form-control"
                type="email"
                placeholder="john@example.com"
                required
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please Enter Email",
                  },
                  minLength: { value: 8, message: "Minimum Length is 8" },
                  maxLength: {
                    value: 45,
                    message: "Maximum Length is 45",
                  },
                })}
              />
              {errors.email && (
                <small className="red">{errors.email.message}</small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                className="form-control"
                type="password"
                required
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please Enter Password",
                  },
                  minLength: { value: 8, message: "Minimum Length is 8" },
                  maxLength: {
                    value: 20,
                    message: "Maximum Length is 20",
                  },
                })}
              />
              {errors.password && (
                <small className="red">{errors.password.message}</small>
              )}
            </div>
            <input
              id="role"
              className="form-control"
              type="hidden"
              required
              value={"admin"}
              {...register("role")}
            />
            <button
              disabled={isSubmitting}
              className="btn btn-dark w-100"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-3">
            <a href="#" className="text-dark">
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
