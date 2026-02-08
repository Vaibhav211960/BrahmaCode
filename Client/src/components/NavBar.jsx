import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { LogOut, User, Loader2 } from "lucide-react";
import axios from "axios";
import "./style.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Track token in state so React UI updates immediately on Login/Logout
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setAuthToken(currentToken); // Update state to trigger re-render
    
    if (currentToken) {
      fetchProfile(currentToken);
    } else {
      setProfile(null);
    }
  }, [location]); // Re-run whenever route changes (like after login redirect)

  const fetchProfile = async (token) => {
    const role = localStorage.getItem("role");
    if (!token || !role) return;

    try {
      setLoading(true);
      const endpoint =
        role === "coach"
          ? "http://localhost:3000/api/coaches/profile"
          : "http://localhost:3000/api/athlete/profile";

      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data.data || response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProfileClick = () => {
    const role = localStorage.getItem("role");
    if (role === "coach") navigate("/coach-dashboard");
    else if (role === "athlete") navigate("/athlete-dashboard");
    else navigate("/login");
  };

  const handleLogout = () => {
    localStorage.clear(); 
    setAuthToken(null); // Triggers immediate UI switch to "Login" button
    setProfile(null);
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar-container">
      <div className="logo-section flex items-center space-x-3">
        <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 tracking-tight">
          ArenaFitCheck
        </span>
      </div>

      <div className="links flex items-center gap-4">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `nav-link ${isActive ? "text-blue-600 font-bold" : "text-gray-500"}`
          }
        >
          Home
        </NavLink>

        {/* LOGIC FIX: Check state variable 'authToken' instead of direct localStorage */}
        {authToken ? (
          <>
            <button
              onClick={handleProfileClick}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-100 transition-all active:scale-95 border border-blue-100"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <User className="w-4 h-4" />}
              {profile?.name ? profile.name.split(' ')[0] : "Dashboard"}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold text-sm hover:bg-red-100 transition-all active:scale-95 border border-red-100"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </>
        ) : (
          <NavLink 
            to="/login" 
            className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-200"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default NavBar;