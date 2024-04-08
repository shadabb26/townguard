import Navbar from "../components/Navbar";
import SignupForm from "../components/SignupForm";
import Footer from "../components/Footer";

export default function Signup() {
  return (
    <>
      <Navbar inLogin={false} inSignup={true} />
      <SignupForm />
      <Footer />
    </>
  );
}
