import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AccessDenied from "../components/AccessDenied";
import UserLanding from "../components/UserLanding";

export default function Application() {
  let isLoggedIn = false;
  const token = localStorage.getItem("token");
  if (token) isLoggedIn = true;

  return (
    <>
      <Navbar inLogin={false} inSignup={false} isLoggedIn={isLoggedIn} />
      {!isLoggedIn && <AccessDenied />}
      {isLoggedIn && <UserLanding />}

      <Footer />
    </>
  );
}
