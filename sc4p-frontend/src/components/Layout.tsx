import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <Box display="flex" width="100%" height="100%">
      {/* Main content area */}
      <Box display="flex" flexDirection="column" flexGrow={1}>
        <Navbar />
        <Box display="flex" flexGrow={1}>
          {/* Sidebar stays on the left */}
          <Sidebar />
          {/* Render child routes here */}
          <Box flexGrow={1} padding={2}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;