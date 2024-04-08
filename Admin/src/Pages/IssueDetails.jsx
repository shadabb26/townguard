import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getOneIssue,
  rejectIssue,
  resolveIssue,
} from "./../Services/resolverFunctionality";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useForm } from "react-hook-form";

export default function IssueDetails() {
  const token = localStorage.getItem("resolverToken");
  const [issue, setIssue] = useState({});
  const [resolve, setResolve] = useState(true);
  const [reject, setReject] = useState(false);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  function handleResolve() {
    setReject(false);
    setResolve(true);
  }
  function handleReject() {
    setResolve(false);
    setReject(true);
  }

  async function onSubmitReject(data) {
    const response = await rejectIssue(token, data, id);
    console.log(response);
    reset();
  }
  async function onSubmitResolve(data) {
    const response = await resolveIssue(token, data, id);

    console.log(response);
    reset();
  }
  useEffect(() => {
    async function getIssue() {
      try {
        const response = await getOneIssue(token, id);
        setIssue(response.data.data.issue[0]);
        document.title = "details";
      } catch (error) {
        console.error("Error fetching issue:", error);
      }
    }
    getIssue();
  }, [token, id]);

  if (!issue.location || !issue.location.coordinates) {
    return null; // or handle this case differently
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{issue.title}</h2>
                <p className="card-text">Description: {issue.description}</p>
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
                <div className="row">
                  <div className="col-md-6">
                    <img
                      src={issue.imageOne}
                      className="img-fluid"
                      alt="Image One"
                      style={{ height: "225px", width: "400px" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <img
                      src={issue.imageTwo}
                      className="img-fluid"
                      alt="Image Two"
                      style={{ height: "225px", width: "400px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <MapContainer
              center={[
                Number.parseFloat(issue.location.coordinates[1]),
                Number.parseFloat(issue.location.coordinates[0]),
              ]}
              zoom={13}
              scrollWheelZoom={true}
              style={{ height: "290px" }} // Adjusted height for better visibility
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[
                  Number.parseFloat(issue.location.coordinates[1]),
                  Number.parseFloat(issue.location.coordinates[0]),
                ]}
              >
                <Popup>your location</Popup>
              </Marker>
            </MapContainer>
            <div className="mt-1">
              <button className="btn btn-secondary m-1" onClick={handleResolve}>
                Resolve
              </button>
              <button className="btn btn-secondary" onClick={handleReject}>
                Reject
              </button>
              {reject && (
                <form onSubmit={handleSubmit(onSubmitReject)}>
                  <div className="form-group mt-2">
                    <label htmlFor="reason" className="form-label">
                      Rejection Reason
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="reason"
                      aria-describedby="emailHelp"
                      placeholder="Enter reason"
                      name="reason"
                      {...register("reason", {
                        required: {
                          value: true,
                          message: "Please Enter reason",
                        },
                        minLength: {
                          value: 10,
                          message: "Minimum Length is 10",
                        },
                        maxLength: {
                          value: 100,
                          message: "Maximum Length is 10",
                        },
                      })}
                    />
                    {errors.reason && (
                      <small className="red">{errors.reason.message}</small>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-danger mt-1"
                    disabled={isSubmitting}
                  >
                    Reject Issue
                  </button>
                </form>
              )}
            {resolve && (
                <form onSubmit={handleSubmit(onSubmitResolve)}>
                  <div className="form-group mt-2">
                    <label htmlFor="resolveImg">
                      Upload Issue Resolved Image
                    </label>
                    <br />
                    <input
                      type="file"
                      className="form-control-file mt-2"
                      id="resolveImg"
                      accept="image/*"
                      name="resolveImg"
                      {...register("resolveImg", {
                        required: "Please select an image file",
                      })}
                    />
                    {errors.resolveImg && (
                      <small className="text-danger">
                        {errors.resolveImg.message}
                      </small>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success mt-2"
                    disabled={isSubmitting}
                  >
                    Resolve Issue
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
