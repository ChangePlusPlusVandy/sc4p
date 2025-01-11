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
      <ul className="flex gap-6">
        <li>
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/users" className="hover:text-gray-300">
            Users
          </Link>
        </li>
        <li>
          <Link to="/admins" className="hover:text-gray-300">
            Admins
          </Link>
        </li>
      </ul>
      <Button color="primary" variant="light" onPress={handleLogout}>
        Logout
      </Button>
    </nav>
  );
};

export default Navbar;
