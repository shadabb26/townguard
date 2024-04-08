import { useState } from "react";
import { useForm } from "react-hook-form";
import IssueForm from "../components/IssueForm";
import Map from "../components/Map";
import Navbar from "../components/Navbar";
import AccessDenied from "../components/AccessDenied";
import Footer from "../components/Footer";

export default function IssueReportingPage() {
  const [position, setPosition] = useState([18.631451, 73.797081]);
  let isLoggedIn = false;
  const token = localStorage.getItem("token");
  if (token) isLoggedIn = true;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <>
      <Navbar inLogin={false} inSignup={false} isLoggedIn={isLoggedIn} />
      {!isLoggedIn && <AccessDenied />}
      {isSubmitting && (
        <div
          className="d-flex justify-content-center align-items-center" // Added align-items-center to vertically center the spinner
          style={{
            position: "fixed", // Fixed position to make it cover the whole page
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Optional: semi-transparent overlay
          }}
        >
          <div className="spinner-border" role="status"></div>
        </div>
      )}

      {!isSubmitting && isLoggedIn && (
        <div className="container mt-3">
          <div className="row mb-5">
            <IssueForm
              setPosition={setPosition}
              position={position}
              register={register}
              handleSubmit={handleSubmit}
              formState={{ errors, isSubmitting }}
            />
            <Map position={position} />
          </div>
          <hr />
        </div>
      )}

      {!isSubmitting && <Footer />}
    </>
  );
}
