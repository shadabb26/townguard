import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getUserStats } from "../Auth/User";
import AccessDenied from "../components/AccessDenied";

export default function UserProfile() {
  let isLoggedIn = false;
  const token = localStorage.getItem("token");
  if (token) isLoggedIn = true;
  const [stats, setStats] = useState({});
  const [details, setDetails] = useState({});

  useEffect(() => {
    async function getDetails() {
      const response = await getUserStats(token);
      setStats(response.data.stats);
      setDetails(response.data.userDetails);
    }
    getDetails();
  }, [token]);

  useEffect(()=>{
    document.title = 'Profile'
  },[])
  return (
    <>
      <Navbar inLogin={false} inSignup={false} isLoggedIn={isLoggedIn} />
      {!isLoggedIn && <AccessDenied />}
      <div className="container mt-2">
        <div className="row">
          <div className="col">
            <h1>User Details</h1>
          </div>
        </div>
        <hr />

        <div className="container" style={{ height: "100%" }}>
          <div className="row">
            <div className="col">
              <p>
                Name: <span className="fw-bold ">{details.name}</span>
              </p>
              <p>
                Email: <span className="fw-bold ">{details.email}</span>
              </p>
              {/* <p>
                Role:{" "}
                <span className="fw-bold"> {details.role?.toUpperCase()}</span>
              </p> */}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-dark mt-2">Edit</button>
            </div>
          </div>
        </div>
        <hr />
        <div className="col-md-12 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title fw-bold">Summary</h5>
              <p className="card-text">
                Summary of the total number of reported issues, resolved issues,
                and pending issues.
              </p>
              <div className="row">
                <div className="col">
                  <div className="fw-bold">Pending</div>
                  <div className="badge bg-warning">
                    {stats.userIssuePending}
                  </div>
                </div>
                <div className="col">
                  <div className="fw-bold">Resolved</div>
                  <div className="badge bg-success">
                    {stats.userIssueResolved}
                  </div>
                </div>
                <div className="col">
                  <div className="fw-bold">Rejected</div>
                  <div className="badge bg-danger">
                    {stats.userIssueRejected}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
