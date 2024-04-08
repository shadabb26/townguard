import { useEffect, useState } from "react";
import { getUsers,  } from "./../Services/adminFunctionality";
import AccessDenied from "./AccessDenied";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("adminToken");
  useEffect(() => {
    async function getAllUsers() {
      const response = await getUsers(token);
      setUsers(response.data.data.users);
      document.title = "Users";
    }
    getAllUsers();
  }, [token]);


  return (
    <>
      {!token && <AccessDenied />}
      {token && (
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title fw-bold badge bg-primary">Users</h5>
              <p className="card-text">Registered users.</p>
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
                    {users.map((user, i) => {
                      return (
                        <tr key={i}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.contact}</td>
                         
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
