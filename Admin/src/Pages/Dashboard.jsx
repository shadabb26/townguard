import { Outlet, NavLink, useNavigate } from "react-router-dom";
import AccessDenied from "./../Components/AccessDenied";
import { useEffect } from "react";

export default function Dashboard() {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/", { replace: true });
  };
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <>
      {!token && <AccessDenied />}
      {token && (
        <div className="container-fluid">
          <div className="row min-vh-100 bg-gray-100">
            <div className="col-md-2 border-end border-gray-100">
              <nav className="d-flex flex-column p-3">
                <NavLink to="#" className="text-lg fw-bold mb-3 text-dark">
                  TownGuard
                </NavLink>

                <NavLink
                  exact="true"
                  to=""
                  className={(e) =>
                    e.isActive ? "btn btn-dark mb-2" : "btn btn-light mb-2"
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to={"/dashboard/issues"}
                  className={(e) =>
                    e.isActive ? "btn btn-dark mb-2" : "btn btn-light mb-2"
                  }
                >
                  Issues
                </NavLink>
                <NavLink
                  to={"/dashboard/users"}
                  className={(e) =>
                    e.isActive ? "btn btn-dark mb-2" : "btn btn-light mb-2"
                  }
                >
                  Users
                </NavLink>
                <NavLink
                  to={"/dashboard/admins"}
                  className={(e) =>
                    e.isActive ? "btn btn-dark mb-2" : "btn btn-light mb-2"
                  }
                >
                  Admins
                </NavLink>
                <NavLink
                  to={"/dashboard/resolvers"}
                  className={(e) =>
                    e.isActive ? "btn btn-dark mb-2" : "btn btn-light mb-2"
                  }
                >
                  Resolvers
                </NavLink>
                <NavLink
                  to={"/dashboard/contact"}
                  className={(e) =>
                    e.isActive ? "btn btn-dark mb-2" : "btn btn-light mb-2"
                  }
                >
                  Contact
                </NavLink>
                <NavLink
                  to={"/dashboard/new-admin"}
                  className={(e) =>
                    e.isActive ? "btn btn-dark mb-2" : "btn btn-light mb-2"
                  }
                >
                  Create Admin
                </NavLink>
                <NavLink
                  to={"/dashboard/new-resolver"}
                  className={(e) =>
                    e.isActive ? "btn btn-dark mb-2" : "btn btn-light mb-2"
                  }
                >
                  Create Resolver
                </NavLink>
              </nav>
            </div>
            <div className="col-md-10 p-4">
              <header className="d-flex justify-content-between mb-4">
                <h1 className="text-xl font-semibold">Dashboard</h1>
                <div className="d-flex align-items-center gap-1">
                  <div className="d-flex align-items-center gap-2 text-sm font-medium rounded-md p-2 text-dark">
                    <NavLink to={"/dashboard/details"} className="text-dark">
                      <button className="btn btn-dark">Admin</button>
                    </NavLink>
                  </div>
                  <div>
                    <button className="btn btn-dark" onClick={logout}>
                      Logout
                    </button>
                  </div>
                </div>
              </header>
              <div className="row">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
