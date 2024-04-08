import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="container d-flex flex-column align-items-center justify-content-center py-5">
        <div className="text-center mb-4">
          <h1 className="display-4 font-weight-bold">Page Not Found</h1>
          <p className="text-secondary">
            Oops! The page you are looking for does not exist.
          </p>
        </div>
        <button
          to="/"
          className="btn btn-dark btn-lg w-100"
          style={{ maxWidth: "200px" }}
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
