import { useState, useEffect } from "react";
import AccessDenied from "./AccessDenied";
import { getResolverDetails } from "../Services/resolverFunctionality";

export default function AdminDetails() {
  const [details, setDetails] = useState({});
  const [count, setCount] = useState({});
  const token = localStorage.getItem("resolverToken");

  useEffect(() => {
    async function getDetails() {
      const response = await getResolverDetails(token);
      setDetails(response.data.resolver);
      setCount(response.data.count);
    }
    getDetails();
  }, [token]);

  useEffect(() => {
    document.title = "Details";
  }, []);

  console.log(details);
  return (
    <>
      {!token && <AccessDenied />}
      {token && (
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Resolver Details</h1>
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
              <p>
                No of Issues Resolved :{" "}
                <span className="fw-bold badge bg-success">
                  {" "}
                  {count.resolvedCount}
                </span>
              </p>
              <p>
                No of Issues Rejected :{" "}
                <span className="fw-bold badge bg-danger">
                  {" "}
                  {count.rejectedCount}
                </span>
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
