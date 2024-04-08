import { useEffect, useState } from "react";
import { getAdmins } from "./../Services/adminFunctionality";
import AccessDenied from "./AccessDenied";

export default function AdminTable() {
    const [admins, setAdmins] = useState([]);
    const token = localStorage.getItem("adminToken");
    useEffect(() => {
      async function getAllAdmins() {
        const response = await getAdmins(token);
        setAdmins(response.data.data.admins);
        document.title = "Admins";
      }
      getAllAdmins();
    }, [token]);
 
  return (
    <>
      {!token && <AccessDenied />}
      {token && (
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title fw-bold badge bg-primary">Admins</h5>
              <p className="card-text">Registered admins.</p>
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
                    {admins.map((admin, i) => {
                      return (
                        <tr key={i}>
                          <td>{admin.name}</td>
                          <td>{admin.email}</td>
                          <td>{admin.contact}</td>
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
