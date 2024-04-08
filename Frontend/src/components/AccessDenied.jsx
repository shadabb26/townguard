import { NavLink } from "react-router-dom";
import { useEffect } from "react";
export default function AccessDenied() {
  useEffect(()=>{
    document.title = 'Access Denied'
  })
  return (
    <>
      <>
        <div className="user container text-center">
          <div>
            <h1 className="mt-5">Please Login</h1>
            <p>
              Let your voice be heard. Report issues in your community and help
              make a difference.
            </p>
            <p>Please login to report an issue.</p>
          </div>

          <NavLink className="btn btn-dark mt-3" to="/login">
            Login
          </NavLink>
        </div>
s
        <hr></hr>
      </>
      );
    </>
  );
}
