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
      document.title = 'Issues'
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
                    <h5 className="card-title">{issue.description}</h5>
                    {/* <p className="card-text">Location: {issue.location}</p> */}
                    <p className="card-text">Category: {issue.category}</p>
                    <p className="card-text">
                      Expected Date: {issue.expectedDate}
                    </p>
                    <p className="card-text">Timeline: {issue.timeline}</p>
                    <p className="card-text ">
                      {" "}
                      Status:{" "}
                      <span className="badge bg-warning">{issue.status}</span>
                    </p>
                    <Link to={`/app/issues/${issue._id}`}>
                      <button className="btn btn-dark mt-4">Details</button>
                    </Link>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <img src={issue.imageOne} className="img-fluid" />
                      </div>
                      <div className="col-md-6">
                        <img src={issue.imageTwo} className="img-fluid" />
                      </div>
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
