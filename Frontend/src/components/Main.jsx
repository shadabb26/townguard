import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Home'
    if (token) navigate("/app", { replace: true });
  }, [navigate, token]);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: 'url("./../assets/town.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-center">
        <h1 className="display-2">
          Welcome to <span style={{ color: "#7B1FA2" }}>TownGuard</span>
        </h1>
        <p>
          Empowering Communities, Strengthening Bonds: TownGuard, Your Local
          Issue Platform.
        </p>
      </div>
    </div>
  );
}
