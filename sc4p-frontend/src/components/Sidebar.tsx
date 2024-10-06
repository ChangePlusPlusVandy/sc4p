import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const CustomSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed((prevState) => !prevState);
  };

  return (
    <Sidebar collapsed={collapsed}>
      <div>
        <button onClick={handleToggleSidebar}>
          <FaBars />
        </button>
      </div>
      <Menu>
        <MenuItem component={<Link to="/" />}>Dashboard</MenuItem>
        <MenuItem component={<Link to="/form" />}>Form</MenuItem>
        <MenuItem component={<Link to="/calendar" />}>Calendar</MenuItem>
        <SubMenu label="Forms">
          <MenuItem component={<Link to="/form1" />}>Caregivers</MenuItem>
          <MenuItem component={<Link to="/form2" />}>
            Emergency Contact
          </MenuItem>
        </SubMenu>
        <MenuItem component={<Link to="/profile" />}>My Account</MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default CustomSidebar;
