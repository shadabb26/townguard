import { NavLink } from "react-router-dom";
import { useEffect } from "react";
export default function UserLanding() {
  useEffect(()=>{
    document.title = 'Home'
  },[])
  return (
    <>
      <>
        <div className="user container text-center">
          <div>
            <h1 className="mt-5">Report local issues with ease</h1>
            <p>
              Let your voice be heard. Report issues in your community and help
              make a difference.
            </p>
          </div>

          <NavLink className="btn btn-dark mt-3" to="/app/report">
            Report Issue
          </NavLink>
        </div>

        <hr></hr>
      </>
      );
    </>
  );
}
