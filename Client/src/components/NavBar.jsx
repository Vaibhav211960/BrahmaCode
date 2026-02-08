import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./style.css";
import { LogOut, User } from "lucide-react";
import axios from "axios";

const NavBar = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const role = localStorage.getItem("role");
      const token = localStorage.getItem("token");

      if (!token || !role) {
        return;
      }

      const endpoint =
        role === "coach"
          ? "http://localhost:3000/api/coaches/profile"
          : "http://localhost:3000/api/athlete/profile";

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data.data || response.data);
    } catch (error) {
      console.log("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileClick = () => {
    const role = localStorage.getItem("role");
    if (role === "coach") {
      navigate("/coach-dashboard");
    } else {
      navigate("/athlete-dashboard");
    }
  };

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // axios.post(`http://localhost:3000/api/auth/logout`,{
    //   role: localStorage.getItem("role")
    // },{
    //   headers:{
    //     Authorization: localStorage.getItem("token")
    //   }
    // })
    // .then(res => {
    //   if(res.status === 200) {
    //     navigate("/login")
    //   }
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  };
  return (
    <nav>
      <div className="flex items-center space-x-3 ">
        <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-900">
          ArenaFitCheck
        </span>
      </div>
      <div className="links">
        <NavLink to="/">Home</NavLink>
        <button
          onClick={handleProfileClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <User className="w-4 h-4" />
          Profile
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
