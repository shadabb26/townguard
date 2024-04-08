import { Outlet, NavLink, useNavigate } from "react-router-dom";
import AccessDenied from "./../Components/AccessDenied";
import { useEffect } from "react";
export default function Dashboard() {
  const token = localStorage.getItem("resolverToken");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("resolverToken");
    navigate("/", { replace: true });
  };
  useEffect(()=>{
    document.title = 'Page not found'
  },[])
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
                  to={"/resolver-dashboard/table"}
                  className={(e) =>
                    e.isActive ? "btn btn-dark mb-2" : "btn btn-light mb-2"
                  }
                >
                  Issues
                </NavLink>
              </nav>
            </div>
            <div className="col-md-10 p-4">
              <header className="d-flex justify-content-between mb-4">
                <h1 className="text-xl font-semibold">Dashboard</h1>
                <div className="d-flex align-items-center gap-1">
                  <div className="d-flex align-items-center gap-2 text-sm font-medium rounded-md p-2 text-dark">
                    <NavLink to={"/resolver-dashboard/details"} className="text-dark">
                      <button className="btn btn-dark">Profile</button>
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
