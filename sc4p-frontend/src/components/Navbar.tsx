import React, { useState } from "react";
import BellIcon from "../images/bell-icon.png";
import AdminBadge from "./AdminBadge";


const Navbar: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);

  // Function to handle toggle click
  const handleToggle = () => {
    setIsToggled((prev) => !prev);
    console.log("Toggle switched:", !isToggled); 
  };

  // Function to handle bell icon click
  const handleBellClick = () => {
    console.log("Bell icon clicked");
  };

  return (
    <nav
      className="flex items-center justify-between px-6 py-4 shadow-md"
      style={{
        backgroundColor: "rgba(230, 209, 255, 0.25)",
        borderBottom: ".5px solid #5E3593",
      }}
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

      <div className="flex items-center space-x-4">
        <button
          className="p-2 focus:outline-none"
          onClick={handleBellClick}
          style={{
            backgroundColor: "rgba(230, 209, 255, 0.35)",
            width: "50px",
            height: "50px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "8px",
          }}
        >
          <img src={BellIcon} alt="Notification" className="w-6 h-6" />
        </button>

        <AdminBadge />
      </div>
    </nav>
  );
};

export default Navbar;
