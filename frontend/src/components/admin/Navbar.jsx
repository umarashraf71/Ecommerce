import {useNavigate} from "react-router";
import {useAuth} from "../../context/AuthContext.jsx";

function Navbar() {
  const navigate = useNavigate();
  const { clearAuthData } = useAuth();

  const logout = () => {
    console.log("Logging out...");
    clearAuthData();
    navigate('/login'); 
  };

  return (
    <header className="header">
      <h2>Dashboard</h2>

      <div className="header-right">
        <span>Welcome </span>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}

export default Navbar;