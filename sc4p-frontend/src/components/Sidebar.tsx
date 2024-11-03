import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import HomeIcon from "../images/dashboard.png";
import PetsIcon from "../images/pet-profile.png";
import FormsIcon from "../images/Forms.png";
import MoreIcon from "../images/more.png";
import ProfileIcon from "../images/owner-profile.png";

const CustomSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed((prevState) => !prevState);
  };

  return (
    <div className="flex h-screen"> {/* Full height container */}
      <Sidebar
        collapsed={collapsed}
        style={{
          backgroundColor: "rgba(230, 209, 255, 1)",
        }}
      >
        <div className="flex items-center p-2">
          <button onClick={handleToggleSidebar} className="text-lg">
            <FaBars />
          </button>
        </div>
        <Menu>
          <MenuItem 
            component={<Link to="/" />} 
            icon={<img src={HomeIcon} alt="Dashboard" className="mr-2 w-5 h-5" />}
          >
            <span className="font-bold text-black">Dashboard</span>
          </MenuItem>
          <SubMenu 
            label={<span className="font-bold text-black">Forms</span>} 
            icon={<img src={FormsIcon} alt="Forms" className="mr-2 w-5 h-5" />}
          >
            <MenuItem 
              component={<Link to="/pets" />} 
              style={{ backgroundColor: "rgba(230, 209, 255, .25)" }}
            >
              <span className="font-bold text-black">Pets</span>
            </MenuItem>
            <MenuItem 
              component={<Link to="/caregivers" />} 
              style={{ backgroundColor: "rgba(230, 209, 255, .25)" }}
            >
              <span className="font-bold text-black">Caregivers</span>
            </MenuItem>
            <MenuItem 
              component={<Link to="/trustees" />} 
              style={{ backgroundColor: "rgba(230, 209, 255, .25)" }}
            >
              <span className="font-bold text-black">Trust</span>
            </MenuItem>
            <MenuItem 
              component={<Link to="/contacts" />} 
              style={{ backgroundColor: "rgba(230, 209, 255, .25)" }}
            >
              <span className="font-bold text-black">Emergency Contacts</span>
            </MenuItem>
          </SubMenu>
          <MenuItem 
            component={<Link to="/profile" />} 
            icon={<img src={ProfileIcon} alt="Profile" className="mr-2 w-5 h-5" />}
          >
            <span className="font-bold text-black">Owner Profile</span>
          </MenuItem>
          <MenuItem 
            component={<Link to="/pets" />} 
            icon={<img src={PetsIcon} alt="Pet Profile" className="mr-2 w-5 h-5" />}
          >
            <span className="font-bold text-black">Pet Profile</span>
          </MenuItem>
          <MenuItem 
            component={<Link to="/more" />} 
            icon={<img src={MoreIcon} alt="More Options" className="mr-2 w-5 h-5" />}
          >
            <span className="font-bold text-black">More</span>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default CustomSidebar;