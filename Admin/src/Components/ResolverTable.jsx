import { useEffect, useState } from "react";
import { getResolvers } from "./../Services/adminFunctionality";
import AccessDenied from "./AccessDenied";

export default function ResolverTable() {
    const [resolvers, setResolvers] = useState([]);
    const token = localStorage.getItem("adminToken");
    useEffect(() => {
      async function getAllResolvers() {
        const response = await getResolvers(token);
        setResolvers(response.data.data.resolvers);
        document.title = "Admins";
      }
      getAllResolvers();
    }, [token]);
    console.log(resolvers);
  return (
    <>
      {!token && <AccessDenied />}
      {token && (
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title fw-bold badge bg-primary">Resolvers</h5>
              <p className="card-text">Registered resolvers.</p>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resolvers.map((resolver, i) => {
                      return (
                        <tr key={i}>
                          <td>{resolver.name}</td>
                          <td>{resolver.email}</td>
                          <td>{resolver.contact}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
