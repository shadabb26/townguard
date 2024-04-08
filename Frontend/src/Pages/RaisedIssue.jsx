import IssueRaised from "../components/IssueRaised";
import AccessDenied from "../components/AccessDenied";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RaisedIssue() {
  let isLoggedIn = false;
  const token = localStorage.getItem("token");
  if (token) isLoggedIn = true;

  return (
    <>
      <Navbar inLogin={false} inSignup={false} isLoggedIn={isLoggedIn} />
      {!isLoggedIn && <AccessDenied />}
      {isLoggedIn && <IssueRaised />};
      <Footer />
    </>
  );
}
