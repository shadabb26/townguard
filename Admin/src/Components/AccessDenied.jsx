import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function AccessDenied() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Access Denied"
  }, []);
  return (
    <>
      <div className="admin container text-center denied">
        <div>
          <h1 className="mt-5">Access Denied</h1>
          <p>You do not have the necessary permissions to view this page.</p>
          <p>Please log in with an account to access this page.</p>
        </div>

        <button
          className="btn btn-dark"
          onClick={() => navigate("/", { replace: true })}
        >
          Login
        </button>
      </div>
    </>
  );
}
