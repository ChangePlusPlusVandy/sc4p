import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./pages/Auth/PrivateRoute";
import AdminRoute from "./pages/Auth/AdminRoute";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import Pets from "./pages/Pets";
import Profile from "./pages/Profile";
import Caregivers from "./pages/Caregivers";
import Trustee from "./pages/Trustee";
import EmergencyContacts from "./pages/EmergencyContact";
import Vets from "./pages/Vets";
import InitialForm from "./pages/InitialForm";
import Landing from "./pages/Landing";
import PetInfo from "./pages/PetInfo";
import { ToastContainer } from "react-toastify";

// admin routes
import ManageAdmins from "./pages/admin/ManageAdmins";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/initialForm" element={<InitialForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected routes */}
          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Home />} />}
            />
            <Route
              path="/pets/:id"
              element={<PrivateRoute element={<PetInfo />} />}
            />
            <Route
              path="/profile"
              element={<PrivateRoute element={<Profile />} />}
            />
            <Route path="/pets" element={<PrivateRoute element={<Pets />} />} />
            <Route
              path="/caregivers"
              element={<PrivateRoute element={<Caregivers />} />}
            />
            <Route
              path="/trustees"
              element={<PrivateRoute element={<Trustee />} />}
            />
            <Route
              path="/contacts"
              element={<PrivateRoute element={<EmergencyContacts />} />}
            />
            <Route path="/vets" element={<PrivateRoute element={<Vets />} />} />

            {/* Admin routes */}
            <Route
              path="/admin/manage-admins"
              element={<AdminRoute element={<ManageAdmins />} />}
            />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
