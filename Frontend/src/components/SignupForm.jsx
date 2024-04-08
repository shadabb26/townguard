import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signupToast, signupUser } from "../Auth/Signup";

export default function SignupForm() {
  const [response, setResponse] = useState(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    try {
      const response = await signupUser(data);
      setResponse(response);
    } catch (error) {
      setResponse(error.response);
      console.log(response);
    }
  }
  useEffect(() => {
    signupToast(response)
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch(() => {});
      document.title = 'SignUp'
  }, [response, navigate]);

  return (
    <>
      <div className="container signup">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Signup</div>
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
                        minLength: { value: 4, message: "Minimum Length is 4" },
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
                        minLength: { value: 4, message: "Minimum Length is 4" },
                        maxLength: {
                          value: 35,
                          message: "Maximum Length is 35",
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
                      Signup
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
        <hr />
      </div>
    </>
  );
}
