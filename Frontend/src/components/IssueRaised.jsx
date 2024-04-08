import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getIssueByUser } from "./../Auth/Issue.js";
export default function IssueRaised() {
  const token = localStorage.getItem("token");
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    async function getIssues() {
      const response = await getIssueByUser(token);
      setIssues(response.data.data.issue);
      document.title = 'Issue Raised'
    }
    getIssues();
  }, [token]);

  console.log(issues);
  return (
    <div className="container mt-5">
      <h2>Reported Issues</h2>
      {issues.length === 0 ? (
        <p>No issues reported.</p>
      ) : (
        <div>
          {issues.map((issue, i) => (
            <div className="card mt-3" key={i}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="card-title">{issue.title}</h5>
                    <p className="card-text">
                      Description: {issue.description}
                    </p>
                    <p className="card-text">
                      Raised Date: {new Date(issue.raisedDate).toDateString()}
                    </p>

                    {!issue.closedDate && (
                      <p className="card-text">
                        Expected to address:{" "}
                        {new Date(
                          new Date(issue.raisedDate).setDate(
                            new Date(issue.raisedDate).getDate() + 3
                          )
                        ).toDateString()}
                      </p>
                    )}

                    {issue.closedDate && (
                      <p className="card-text">
                        Issue Closed Date :{" "}
                        {new Date(issue.closedDate).toDateString()}
                      </p>
                    )}

                    <p className="card-text ">
                      {" "}
                      Status:{" "}
                      <span
                        className={
                          issue.status === "resolved"
                            ? "badge fw-bold bg-success"
                            : issue.status === "rejected"
                            ? "badge fw-bold  bg-danger"
                            : "badge fw-bold bg-warning"
                        }
                      >
                        {issue.status}
                      </span>
                    </p>
                    {issue.rejectionReason && (
                      <p>Rejection Reason : {issue.rejectionReason}</p>
                    )}
                    <Link to={`/app/issues/${issue._id}`}>
                      <button className="btn btn-secondary mt-4">View Details</button>
                    </Link>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      {!issue.resolveImg && (
                        <>
                          {" "}
                          <div className="col-md-6">
                            <img src={issue.imageOne} className="img-fluid" />
                          </div>
                          <div className="col-md-6">
                            <img src={issue.imageTwo} className="img-fluid" />
                          </div>
                        </>
                      )}
                      {issue.resolveImg && (
                        <>
                          {" "}
                          <div className="col-md-6">
                            <img src={issue.resolveImg} className="img-fluid" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
