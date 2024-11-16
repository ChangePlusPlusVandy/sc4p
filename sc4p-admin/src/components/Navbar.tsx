import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li style={{ display: "inline", marginRight: "10px" }}>
          <Link to="/">Home</Link>
        </li>
        <li style={{ display: "inline" }}>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
