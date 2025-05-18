import "./Navbar.css";
import logo from "../assets/nlogo.png";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <h1 className="navbar-title">الــــدعم الفني</h1>

      <div className="navbar-right">
        <button onClick={handleLogout} className="logout-btn">
          تسجيل خروج
        </button>
      </div>
    </header>
  );
}

export default Navbar;
