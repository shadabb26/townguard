import Navbar from "../components/Navbar";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";

export default function Contact() {
  let isLoggedIn = false;

  const token = localStorage.getItem("token");
  if (token) isLoggedIn = true;

  return (
    <>
      <Navbar inSignup={false} inLogin={false} isLoggedIn={isLoggedIn} />
      <ContactUs />
      <Footer />
    </>
  );
}
