import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@nextui-org/button";

import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <ul>
        <li style={{ display: "inline", marginRight: "10px" }}>
          <Link to="/">Home</Link>
        </li>
        <li style={{ display: "inline" }}>
          <Link to="/users">Users</Link>
        </li>
      </ul>
      <Button color="primary" variant="light" onPress={handleLogout}>
        Logout
      </Button>
    </nav>
  );
};

export default Navbar;
