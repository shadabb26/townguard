import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneIssue } from "../Auth/Issue";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function SingleIssue() {
  
  const token = localStorage.getItem("token");
  const [issue, setIssue] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function getIssue() {
      try {
        const response = await getOneIssue(token, id);
        setIssue(response.data.data.issue[0]);
      } catch (error) {
        console.error("Error fetching issue:", error);
      }
    }
    getIssue();
  }, [token, id]);

  useEffect(()=>{
    document.title = 'Issue'
  },[])
  if (!issue.location || !issue.location.coordinates) {
    return null;
  }
  console.log(issue);

  return (
    <div className="container mt-5">
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
              <div className="row mt-1">
                {!issue.resolveImg && (
                  <>
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
                  </>
                )}
                {issue.resolveImg && (
                  <>
                    <div className="col-md-6">
                      <img
                        src={issue.resolveImg}
                        className="img-fluid"
                        alt="Image One"
                      />
                    </div>
                  </>
                )}
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
            style={{ height: "490px" }} // Adjusted height for better visibility
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
        </div>
      </div>
    </div>
  );
}
