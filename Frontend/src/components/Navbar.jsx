import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to={""}>
          TownGuard
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {isLoggedIn && (
                <NavLink
                  className={(e) =>
                    e.isActive ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/app"
                >
                  Home
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {!isLoggedIn && (
                <NavLink
                  className={(e) =>
                    e.isActive ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              <NavLink
                className={(e) => (e.isActive ? "nav-link active" : "nav-link")}
                aria-current="page"
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(e) => (e.isActive ? "nav-link active" : "nav-link")}
                aria-current="page"
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
            {props.isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  className={(e) =>
                    e.isActive ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/app/report"
                >
                  Report Issue
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  className={(e) =>
                    e.isActive ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/app/issues"
                >
                  Issues Raised
                </NavLink>
              </li>
            )}
          </ul>
          <form className="d-flex" role="search">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!props.inLogin && !isLoggedIn && (
                <li className="nav-item">
                  <NavLink to="/login">
                    <button
                      type="button"
                      className="mx-1 my-1 btn btn-dark"
                      // style={{ backgroundColor: "#7B1FA2", color: "white" }}
                    >
                      Login
                    </button>
                  </NavLink>
                </li>
              )}
              <i className="bi bi-moon-stars"></i>
              {!props.inSignup && !isLoggedIn && (
                <li className="nav-item">
                  <NavLink to="/signup">
                    <button
                      type="button"
                      className="mx-1 my-1 btn btn-dark"
                      // style={{ backgroundColor: "#7B1FA2", color: "white" }}
                    >
                      Signup
                    </button>
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <NavLink to="/app/profile">
                    <button
                      type="button"
                      className="mx-1 my-1 btn btn-dark"
                      // style={{ backgroundColor: "#7B1FA2", color: "white" }}
                    >
                      Profile
                    </button>
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <NavLink to="/">
                    <button
                      type="button"
                      className="mx-1 my-1 btn btn-dark"
                      // style={{ backgroundColor: "#7B1FA2", color: "white" }}
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </NavLink>
                </li>
              )}
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}
Navbar.propTypes = {
  inLogin: PropTypes.bool,
  inSignup: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};
