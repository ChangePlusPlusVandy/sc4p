import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./pages/Auth/PrivateRoute";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import Pets from "./pages/Pets";
import Profile from "./pages/Profile";
import Caregivers from "./pages/Caregivers";
import Trustee from "./pages/Trustee";
import EmergencyContacts from "./pages/EmergencyContact";
import PetInfo from "./pages/PetInfo";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
          <Route element={<Layout />}>
            <Route path="/" element={<PrivateRoute element={<Home />} />} />
            <Route
              path="/profile"
              element={<PrivateRoute element={<Profile />} />}
            />
            <Route path="/pets" element={<PrivateRoute element={<Pets />} />} />
            <Route
              path="/pets/:id"
              element={<PrivateRoute element={<PetInfo />} />}
            />
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
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
