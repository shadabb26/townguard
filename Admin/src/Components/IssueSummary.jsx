import { getStats } from "./../Services/adminFunctionality";
import AccessDenied from "./AccessDenied";
import { useEffect, useState } from "react";
export default function IssueSummary() {
  const [stats, setStats] = useState({});
  const token = localStorage.getItem("adminToken");
  useEffect(() => {
    async function getAllStats() {
      const response = await getStats(token);
      setStats(response.data.data);
      document.title = "Summary";
    }
    getAllStats();
  }, [token]);

  return (
    <>
      {!token && <AccessDenied />}
      {token && (
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
                  <div className="badge bg-warning">{stats.pending}</div>
                </div>
                <div className="col">
                  <div className="fw-bold">Resolved</div>
                  <div className="badge bg-success">{stats.resolved}</div>
                </div>

                <div className="col">
                  <div className="fw-bold">Rejected</div>
                  <div className="badge bg-danger">{stats.rejected}</div>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="card mt-5">
            <div className="card-body">
              <h5 className="card-title fw-bold">Summary</h5>
              <p className="card-text">
                Summary of the total number of Users, Admins, Resolvers and
                Issues etc.
              </p>
              <div className="row">
                <div className="col">
                  <div className="fw-bold">Users</div>
                  <div className="badge bg-primary">{stats.users}</div>
                </div>
                <div className="col">
                  <div className="fw-bold">Admins</div>
                  <div className="badge bg-primary">{stats.admins}</div>
                </div>
                <div className="col">
                  <div className="fw-bold">Resolvers</div>
                  <div className="badge bg-success">{stats.resolvers}</div>
                </div>
                <div className="col">
                  <div className="fw-bold">Issues</div>
                  <div className="badge bg-danger">{stats.issues}</div>
                </div>
                <div className="col">
                  <div className="fw-bold">Contacts</div>
                  <div className="badge bg-warning">{stats.contacts}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
