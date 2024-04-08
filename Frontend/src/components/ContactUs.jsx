import {
  submitContact,
  contactErrorToast,
  contactSuccessToast,
} from "../Auth/User";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    try {
      const response = await submitContact(data);
      if (response.data.status === "success") {
        contactSuccessToast();
      } else {
        contactErrorToast();
      }
      reset();
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(()=>{
    document.title = 'Contact'
  },[])

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6">
            <img
              src="../assets/contact.png" // Corrected image source path
              className="img-fluid"
              alt="Contact Us"
              style={{
                width: "420px",
                height: "350px",
              }}
            />
          </div>
          <div className="col-lg-6">
            <h2>Contact Us</h2>
            <p>
              If you have any questions, feedback, or concerns, please feel free
              to contact us using the form below:
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group my-1">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="example@gmail.com" // Corrected placeholder
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
              <div className="form-group my-1">
                <label htmlFor="message" className="form-label">
                  {" "}
                  {/* Corrected htmlFor attribute */}
                  Message
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="message" // Corrected textarea id
                  placeholder=""
                  {...register("message", {
                    required: {
                      value: true,
                      message: "Please Enter Message",
                    },
                    minLength: { value: 10, message: "Minimum Length is 10" },
                    maxLength: {
                      value: 100,
                      message: "Maximum Length is 100",
                    },
                  })}
                />
                {errors.message && (
                  <small className="red">{errors.message.message}</small>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-dark my-2"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}
