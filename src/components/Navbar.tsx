import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import { useLogout } from "../hooks/useAuth";
import "../styles/Navbar.css";

export default function Navbar() {
  const { isLoggedIn, checkAuth, setUser, setIsLoggedIn } = useAuthStore(); // Ensure setIsLoggedIn is included
  const navigate = useNavigate();

  const logoutMutation = useLogout();

  useEffect(() => {
    checkAuth(); // Check authentication on mount
  }, [checkAuth]);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setUser(null); 
    setIsLoggedIn(false); // Explicitly update `isLoggedIn`
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="logo">MyApp</div>
      <div className="nav-links">
        <Link className="nav-link" to="/">Home</Link>
        {!isLoggedIn && <Link className="nav-link" to="/register">Register</Link>}
        {isLoggedIn ? (
          <span onClick={handleLogout} className="nav-link logout">Logout</span>
        ) : (
          <Link className="nav-link" to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}
