import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Button, Card, Spinner } from "@nextui-org/react";
import { UserType } from "../types/user";

const Profile: React.FC = () => {
  const { logout, userData } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
    }
  }, [userData]);

  const handleLogout = () => {
    void logout();
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-1">
          {userData?.name || "Owner's Name"}
        </h1>
        <p className="text-gray-600 mb-4">Contact Information</p>
        <div className="h-[1px] bg-[#E6D1FF] mb-6" />

        <Card className="bg-white rounded-3xl border-2 border-[#E6D1FF] shadow-sm">
          <div className="p-8 space-y-6">
            <div className="flex">
              <span className="w-36 font-bold text-lg">Email</span>
              <span className="text-lg">{userData?.email}</span>
            </div>

            <div className="flex">
              <span className="w-36 font-bold text-lg">Home Phone</span>
              <span className="text-lg">{userData?.home_phone || "-"}</span>
            </div>

            <div className="flex">
              <span className="w-36 font-bold text-lg">Cell Phone</span>
              <span className="text-lg">{userData?.cell_phone || "-"}</span>
            </div>

            <div className="flex">
              <span className="w-36 font-bold text-lg">Address</span>
              <span className="text-lg">{userData?.address || "-"}</span>
            </div>

            <div className="flex items-center">
              <div className="flex">
                <span className="w-36 font-bold text-lg">City</span>
                <span className="text-lg">{userData?.city || "-"}</span>
              </div>
              <div className="flex ml-8">
                <span className="w-16 font-bold text-lg">State</span>
                <span className="text-lg">{userData?.state || "-"}</span>
              </div>
              <div className="flex ml-8">
                <span className="w-24 font-bold text-lg">Zip Code</span>
                <span className="text-lg">{userData?.zip || "-"}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Button
        color="danger"
        variant="flat"
        onClick={handleLogout}
        className="mt-4"
      >
        Logout
      </Button>
    </div>
  );
};

export default Profile;
