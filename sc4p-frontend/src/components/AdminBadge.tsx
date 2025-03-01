import React from "react";
import { useAuth } from "../AuthContext"; // Adjust the path as needed

const AdminBadge: React.FC = () => {
  const { isAdmin } = useAuth();

  return (
    <div
      style={{
        backgroundColor: "rgba(112, 203, 255, 0.50)",
        width: "125px",
        height: "50px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#254984",
        fontWeight: "bold",
        fontSize: "18px",
      }}
    >
      {isAdmin ? "Admin" : "User"}
    </div>
  );
};

export default AdminBadge;
