import Navbar from "./../components/Navbar";
import Main from "./../components/Main";
import Footer from "./../components/Footer";


export default function Home() {
  let isLoggedIn = false;

  const token = localStorage.getItem("token");
  if (token) isLoggedIn = true;
  return (
    <>
      <Navbar inLogin={false} inSignup={false} isLoggedIn={isLoggedIn} />
      <Main />
      <Footer />
    </>
  );
}
