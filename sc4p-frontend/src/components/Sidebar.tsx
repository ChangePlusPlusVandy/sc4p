import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import HomeIcon from "../images/dashboard.png";
import PetsIcon from "../images/pet-profile.png";
import FormsIcon from "../images/Forms.png";
import MoreIcon from "../images/more.png";
import ProfileIcon from "../images/owner-profile.png";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
const CustomSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed((prevState) => !prevState);
  };

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={collapsed} className="bg-[#E6D1FF]">
        <style>
          {`
            .ps-submenu-expand-icon.css-um1o6k {
              display: none; /* Hide the submenu expand icon */
            }
          `}
        </style>

        <Menu>
          {collapsed ? (
            <MenuItem
              icon={<FaAngleDoubleRight />}
              onClick={handleToggleSidebar}
            ></MenuItem>
          ) : (
            <MenuItem
              suffix={<FaAngleDoubleLeft />}
              onClick={handleToggleSidebar}
            >
              <div
                style={{
                  textAlign: "center",
                  padding: "9px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 15,
                  letterSpacing: "1px",
                }}
              >
                Directory
              </div>
            </MenuItem>
          )}
        </Menu>
        <Menu>
          <MenuItem
            component={<Link to="/dashboard" />}
            icon={
              <img src={HomeIcon} alt="Dashboard" className="mr-2 w-5 h-5" />
            }
          >
            <span className="font-bold text-black">Dashboard</span>
          </MenuItem>
          <SubMenu
            label={<span className="font-bold text-black bg-red">Forms</span>}
            icon={<img src={FormsIcon} alt="Forms" className="mr-2 w-5 h-5" />}
          >
            <MenuItem component={<Link to="/pets" />} className="bg-[#E6D1FF]">
              <span className="font-bold text-black">Pets</span>
            </MenuItem>
            <MenuItem
              component={<Link to="/caregivers" />}
              className="bg-[#E6D1FF]"
            >
              <span className="font-bold text-black">Caregivers</span>
            </MenuItem>
            <MenuItem
              component={<Link to="/trustees" />}
              className="bg-[#E6D1FF]"
            >
              <span className="font-bold text-black">Trust</span>
            </MenuItem>
            <MenuItem
              component={<Link to="/contacts" />}
              className="bg-[#E6D1FF]"
            >
              <span className="font-bold text-black">Emergency Contacts</span>
            </MenuItem>
          </SubMenu>
          <MenuItem
            component={<Link to="/profile" />}
            icon={
              <img src={ProfileIcon} alt="Profile" className="mr-2 w-5 h-5" />
            }
          >
            <span className="font-bold text-black">Owner Profile</span>
          </MenuItem>
          <MenuItem
            component={<Link to="/pets" />}
            icon={
              <img src={PetsIcon} alt="Pet Profile" className="mr-2 w-5 h-5" />
            }
          >
            <span className="font-bold text-black">Pet Profile</span>
          </MenuItem>
          <MenuItem
            component={<Link to="/more" />}
            icon={
              <img src={MoreIcon} alt="More Options" className="mr-2 w-5 h-5" />
            }
          >
            <span className="font-bold text-black">More</span>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default CustomSidebar;
