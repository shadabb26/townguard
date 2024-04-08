import { useEffect, useState } from "react";
import { getIssues } from "../Services/adminFunctionality";
import AccessDenied from "./AccessDenied";

export default function IssueTable() {
  const [issues, setIssues] = useState([]);
  const token = localStorage.getItem("adminToken");
  useEffect(() => {
    async function getAllIssues() {
      const response = await getIssues(token);
      setIssues(response.data.data.issues);
      document.title = "Issues";
    }
    getAllIssues();
  }, [token]);

  return (
    <>
      {!token && <AccessDenied />}
      {token && (
        <div className="col-md-12 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="card-title d-flex justify-content-between">
                <h5 className="card-title fw-bold badge bg-primary">Issues</h5>
              </div>
              <p className="card-text ">Issues reported by citizens.</p>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issues.map((issue, i) => (
                      <tr key={i}>
                        <td>{issue.title}</td>
                        <td>{issue.description}</td>
                        <td>{new Date(issue.raisedDate).toDateString()}</td>
                        <td>
                        <button
                            className={
                              issue.status === "resolved"
                                ? "btn btn-success"
                                : issue.status === "rejected"
                                ? "btn btn-danger"
                                : "btn btn-warning"
                            }
                          >
                            {issue.status}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
