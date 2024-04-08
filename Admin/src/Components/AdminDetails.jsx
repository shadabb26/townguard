import { useState, useEffect } from "react";
import AccessDenied from "./AccessDenied";
import { getAdminDetails } from "../Services/adminFunctionality";

export default function AdminDetails() {
  const [details, setDetails] = useState({});
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    async function getDetails() {
      const response = await getAdminDetails(token);
      setDetails(response.data.admin);
    }
    getDetails();
  }, [token]);

  useEffect(() => {
    document.title = "Details";
  }, []);

  return (
    <>
      {!token && <AccessDenied />}
      {token && (
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Admin Details</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                Name: <span className="fw-bold ">{details.name}</span>
              </p>
              <p>
                Email: <span className="fw-bold ">{details.email}</span>
              </p>
              <p>
                Role:{" "}
                <span className="fw-bold"> {details.role?.toUpperCase()}</span>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-dark">Edit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
