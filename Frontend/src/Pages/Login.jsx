import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";

export default function Login() {
  return (
    <>
      <Navbar inLogin={true} inSignup={false} />
      <LoginForm />
      <Footer />
    </>
  );
}
