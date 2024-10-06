// components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  // Inline styles for the navbar
  const navStyle: React.CSSProperties = {
    display: "flex", // Use flexbox to arrange items in a row
  };

  // Inline styles for each list item
  const listItemStyle: React.CSSProperties = {
    marginRight: "20px",
  };

  return (
    <nav>
      <ul style={navStyle}>
        <li style={listItemStyle}>
          <Link to="/">Home</Link>
        </li>
        <li style={listItemStyle}>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
