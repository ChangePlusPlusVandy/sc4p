import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

interface AdminRouteProps {
  element: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ element }) => {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser || !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return <>{element}</>;
};

export default AdminRoute;
