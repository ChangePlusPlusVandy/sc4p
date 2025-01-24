import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button, Input } from "@nextui-org/react";

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
    <nav>
    {/* Top Section */}
    <div
      className="flex justify-between items-center p-4"
      style={{ backgroundColor: "#D3F4FF" }}
    >
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          color: "#5E3593",
          fontSize: "35px",
        }}
      >
        2nd Chance for Pets
      </div>
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <Input
          isClearable
          placeholder="Search"
          startContent={<i className="fa fa-search" aria-hidden="true"></i>}
          style={{
            width: "300px",
            backgroundColor: "#DEE1FF",
            color: 'black',
            borderRadius: "8px",
          }}
        />
        {/* Logout Button */}
        <Button
          onPress={handleLogout}
          className="px-4 py-2 rounded-lg"
          style={{
            backgroundColor: "#DEE1FF",
            fontWeight: "600",
            color: "#254984",
          }}
        >
          Logout
        </Button>
        {/* Admin Button */}
        <button
          disabled
          className="px-4 py-2 rounded-lg"
          style={{
            backgroundColor: "#DEE1FF",
            fontWeight: "600",
            color: "#254984",
          }}
        >
          Admin
        </button>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="text-black" style={{ backgroundColor: "#70CBFF" }}>
      <ul className="flex justify-center gap-6 p-4">
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
    </div>
  </nav>
);
};

export default Navbar;
