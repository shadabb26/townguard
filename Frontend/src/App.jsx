import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Application from "./Pages/Application";
import IssueReportingPage from "./Pages/IssueReporting";
import RaisedIssue from "./Pages/RaisedIssue";
import PageNotFound from "./Pages/PageNotFound";
import SingleIssue from "./components/SingleIssue";
import UserProfile from "./components/UserProfile";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },


  {
    path: "/app",
    element: <Application />,
  },
  {
    path: "/app/report",
    element: <IssueReportingPage />,
  },
  {
    path: "/app/issues",
    element: <RaisedIssue />,
  },
  {
    path: "/app/issues/:id",
    element: <SingleIssue />,
  },
  {
    path:"/app/profile",
    element: <UserProfile/>
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
