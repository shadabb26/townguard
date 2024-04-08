import { useEffect, useState } from "react";
import { getContactDetails } from "../Services/adminFunctionality";
import AccessDenied from "./AccessDenied";

export default function ContactTable() {
  const [contacts, setContacts] = useState([]);
  const token = localStorage.getItem("adminToken");
  useEffect(() => {
    async function getAll() {
      const response = await getContactDetails(token);
      setContacts(response.data.data.contacts);
      document.title = "Contacts";
    }
    getAll();
  }, [token]);

  return (
    <>
      {!token && <AccessDenied />}
      {token && (
        <div className="col-md-12 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="card-title d-flex justify-content-between">
                <h5 className="card-title fw-bold badge bg-primary">Contact</h5>
              </div>
              <p className="card-text ">Contact request by citizens.</p>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Email</th>
                      <th scope="col">Message</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact, i) => (
                      <tr key={i}>
                        <td>{contact.email}</td>
                        <td>{contact.message}</td>
                        <td>{new Date(contact.createdAt).toDateString()}</td>
                      </tr>
                    ))}
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
