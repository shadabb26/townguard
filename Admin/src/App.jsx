import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminLogin from "./Pages/AdminLogin";
import ResolverLogin from "./Pages/ResolverLogin";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import IssueSummary from "./Components/IssueSummary";
import UserTable from "./Components/UserTable";
import IssueTable from "./Components/IssueTable";
import AdminDetails from "./Components/AdminDetails";
import AdmminSignup from "./Components/AdminSignup";
import ResolverSignup from "./Components/ResolverSignup";
import PageNotFound from "./Pages/PageNotFound";
import AdminTable from "./Components/AdminTable";
import ResolverTable from "./Components/ResolverTable";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import ResolverDashboard from "./Pages/ResolverDashboard";
import ResolverSummary from "./Components/ResolverSummary";
import ResolverIssueTable from "./Components/ResolverIssueTable";
import ResolverDetails from "./Components/ResolverDetails";
import IssueDetails from "./Pages/IssueDetails";
import ContactTable from "./Components/ContactTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/resolver",
    element: <ResolverLogin />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <IssueSummary />,
      },
      {
        path: "users",
        element: <UserTable />,
      },
      {
        path: "issues",
        element: <IssueTable />,
      },
      {
        path: "admins",
        element: <AdminTable />,
      },
      {
        path: "resolvers",
        element: <ResolverTable />,
      },
      {
        path: "contact",
        element: <ContactTable />,
      },
      {
        path: "details",
        element: <AdminDetails />,
      },
      {
        path: "new-admin",
        element: <AdmminSignup />,
      },
      {
        path: "new-resolver",
        element: <ResolverSignup />,
      },
    ],
  },

  {
    path: "resolver-dashboard",
    element: <ResolverDashboard />,
    children: [
      {
        path: "",
        element: <ResolverSummary />,
      },
      {
        path: "table",
        element: <ResolverIssueTable />,
      },
      {
        path: "details",
        element: <ResolverDetails />,
      },
      {
        path: "issue-details/:id",
        element: <IssueDetails />,
      },
    ],
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
