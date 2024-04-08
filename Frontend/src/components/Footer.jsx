import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer bg-white text-dark">
      <div className="container">
        <div className="row mx-4">
          <div className="col-md-4 my-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>

              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>

          <div className="col-md-4 my-4">
            <h5>Contact Information</h5>
            <p>Shivajinagar, Pune, Maharashtra, 411003</p>
            <p>Email: townguard@gmail.com</p>
            <p>Phone: +91 1234567890</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="text-center my-1">
            &copy; 2024 TownGuard. All rights reserved.
          </p>
        </div>
        <hr />
      </div>
    </footer>
  );
}
