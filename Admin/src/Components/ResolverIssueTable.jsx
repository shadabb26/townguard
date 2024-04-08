import { useEffect, useState } from "react";
import { getIssues } from "../Services/resolverFunctionality";
import { Link } from "react-router-dom";
import AccessDenied from "./AccessDenied";

export default function ResolverIssueTable() {
  const [issues, setIssues] = useState([]);
  const token = localStorage.getItem("resolverToken");
  useEffect(() => {
    async function getAllIssues() {
      const response = await getIssues(token);
      setIssues(response.data.data.issues);
      document.title = "Issues";
    }
    getAllIssues();
  }, [token]);
  console.log(issues);
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
                      <th scope="col">Raised Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Operations</th>
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
                        <td>
                          <Link
                            to={`/resolver-dashboard/issue-details/${issue._id}`}
                          >
                            <button className="btn btn-primary
                            ">Details</button>
                          </Link>
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
