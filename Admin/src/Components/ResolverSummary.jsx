import { getStats } from "./../Services/resolverFunctionality";
import AccessDenied from "./AccessDenied";
import { useEffect, useState } from "react";
export default function ResolverSummary() {
  const [stats, setStats] = useState({});
  const token = localStorage.getItem("resolverToken");
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
                  <div className="fw-bold">Total</div>
                  <div className="badge bg-primary">{stats.issues}</div>
                </div>
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
          </div>
        </div>
      )}
    </>
  );
}
