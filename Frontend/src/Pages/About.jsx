import Navbar from "../components/Navbar";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";

export default function About() {
  let isLoggedIn = false;

  const token = localStorage.getItem("token");
  if (token) isLoggedIn = true;
  return (
    <>
      <Navbar inSignup={false} inLogin={false} isLoggedIn={isLoggedIn} />
      <AboutUs />
      <Footer />
    </>
  );
}
