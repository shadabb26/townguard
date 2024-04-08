import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useState } from "react";
import { loginUser, loginToast } from "../Auth/Login";

export default function LoginForm() {
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
      reset();
    } catch (error) {
      setResponse(error.response);
      reset();
    }
  }

  useEffect(() => {
    loginToast(response)
      .then(() => {
        navigate("/app", { replace: true });
      })
      .catch(() => {});
      document.title = 'Login'
  }, [response, navigate]);

  return (
    <>
      <div className="container ">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Login</div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="example@gamil.com"
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
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Please Enter Password",
                        },
                        minLength: { value: 8, message: "Minimum Length is 8" },
                        maxLength: {
                          value: 10,
                          message: "Maximum Length is 10",
                        },
                      })}
                    />
                    {errors.password && (
                      <small className="red">{errors.password.message}</small>
                    )}
                  </div>
                  <input
                      type="hidden"
                      className="form-control"
                      id="role"
                      aria-describedby="emailHelp"
                      value={"user"}
                      placeholder="Password"
                      {...register("role")}
                    />
                  <div className="d-grid gap-2">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="btn btn-dark"
                    >
                      Login
                    </button>

                    {/* <button type="reset" className="btn btn-danger">
                      Reset
                    </button> */}
                  </div>
                </form>
              </div>
              <div>
                <div className="mb-3 text-center my-2">
                  {" "}
                  {/* Add this div for spacing */}
                  <p className="mb-0">
                    Don&apos;t have an account?{" "}
                    <NavLink to="/signup">Signup</NavLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}
