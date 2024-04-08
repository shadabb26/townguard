import { Link } from "react-router-dom";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <header className="text-center mb-4">
            <h1 className="display-3">TownGuard</h1>
            <p className="lead">Report and resolve local issues.</p>
          </header>
          <div className="d-grid">
            <Link
              to={"/admin"}
              className="btn btn-outline-dark btn-lg btn-block"
            >
              Admin
            </Link>
            <div className="my-2"></div>
            <Link
              to={"/resolver"}
              className="btn btn-outline-dark btn-lg btn-block"
            >
              Resolver
            </Link>
          </div>
          <p className="text-center mt-4 text-muted">
            Who you are, click to login
          </p>
        </div>
      </div>
    </div>
  );
}
