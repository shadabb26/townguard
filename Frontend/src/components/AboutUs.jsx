import { useEffect } from "react";

export default function AboutUs() {
  useEffect(()=>{
    document.title = 'About Us'
  })
  return (
    <div>
      {/* Page Content */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6">
            <img
              src="./../assets/town.png"
              style={{
                borderRadius: "10px",
                width: "600px",
                height: "280px",
              }}
              className="img-fluid"
              alt="Left Image"
            />
          </div>
          <div className="col-lg-6">
            <div className="text-right">
              <h2 className="mb-4">About Us</h2>
              <p className="lead my-1">
                Local Issue Platform is dedicated to improving the quality of
                life in our communities by providing a platform for citizens to
                report and address local issues.
              </p>
              <p>
                We believe that by empowering individuals to raise awareness of
                issues affecting their neighborhoods, we can work together to
                create positive change.
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className="row mt-3">
          <div className="col-lg-6 order-lg-2">
            <img
              src="./../assets/aboutTown.png"
              style={{
                borderRadius: "10px",
                width: "600px",
                height: "280px",
              }}
              className="img-fluid"
              alt="Right Image"
            />
          </div>
          <div className="col-lg-6 order-lg-1">
            <div className="text-left">
              <h2 className="mb-4">Our Mission</h2>
              <p className="lead my-1">
                Our mission is to create a more connected and engaged community
                by facilitating communication between citizens and local
                authorities.
              </p>
              <p>
                Through our platform, we aim to empower individuals to make a
                difference in their neighborhoods and contribute to the
                betterment of society.
              </p>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
