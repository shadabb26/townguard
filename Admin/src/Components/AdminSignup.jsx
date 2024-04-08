import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signupToast, signupUser } from "../Auth/Signup";
import AccessDenied from "./AccessDenied";

export default function AdminSignup() {
  const [response, setResponse] = useState(null);
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    try {
      const response = await signupUser(data);
      setResponse(response);
      reset();
    } catch (error) {
      setResponse(error.response);
      console.log(response);
    }
  }
  useEffect(() => {
    signupToast(response);
  }, [response, navigate]);

  useEffect(() => {
    document.title = "Admin Signup";
  }, []);
  return (
    <>
      {!token && <AccessDenied />}
      {token && (
        <div className="container signup">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="card">
                <div className="card-header">Admin Signup</div>
                <div className="card-body">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        aria-describedby="emailHelp"
                        placeholder="Name"
                        {...register("name", {
                          required: {
                            value: true,
                            message: "Please Enter Name",
                          },
                          minLength: {
                            value: 4,
                            message: "Minimum Length is 4",
                          },
                          maxLength: {
                            value: 35,
                            message: "Maximum Length is 35",
                          },
                        })}
                      />
                      {errors.name && (
                        <small className="red">{errors.name.message}</small>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="contact" className="form-label">
                        Phone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="contact"
                        placeholder="9987654321"
                        {...register("contact", {
                          required: {
                            value: true,
                            message: "Please Enter Phone",
                          },
                          minLength: {
                            value: 10,
                            message: "Please Enter A 10-digit Contact Number.",
                          },
                          maxLength: {
                            value: 10,
                            message: "Please Enter A 10-digit Contact Number.",
                          },
                        })}
                      />
                      {errors.contact && (
                        <small className="red">{errors.contact.message}</small>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="example@gmail.com"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Please Enter Email",
                          },
                          minLength: {
                            value: 4,
                            message: "Minimum Length is 4",
                          },
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
                        aria-describedby="emailHelp"
                        placeholder="Password"
                        {...register("password", {
                          required: {
                            value: true,
                            message: "Please Enter Password",
                          },
                          minLength: {
                            value: 4,
                            message: "Minimum Length is 10",
                          },
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
                      value={"admin"}
                      placeholder="Password"
                      {...register("role")}
                    />

                    <div className="d-grid gap-2">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="btn btn-dark"
                      >
                        Create Admin
                      </button>
                      {/* <button type="reset" className="btn btn-danger">
                      Reset
                    </button> */}
                    </div>
                  </form>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
