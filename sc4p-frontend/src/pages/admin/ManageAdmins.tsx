import React, { useState, useEffect } from "react";
import { Button, Input, Card, CardBody, Spinner } from "@nextui-org/react";
import { useAuth } from "../../AuthContext";
import { AdminService } from "../../lib/AdminService";

interface Admin {
  uid: string;
  email: string;
  displayName: string | null;
}

const ManageAdmins = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  const fetchAdmins = async () => {
    try {
      const adminList = await AdminService.getAllAdmins(currentUser);
      setAdmins(adminList);
      setError("");
    } catch (error) {
      console.error("Error fetching admins:", error);
      setError("Failed to fetch administrators");
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async () => {
    if (!newAdminEmail.trim()) {
      setError("Please enter an email address");
      return;
    }

    try {
      let user;
      try {
        user = await AdminService.getUserByEmail(newAdminEmail, currentUser);
      } catch (error) {
        setError("User not found. Make sure they have registered first.");
        return;
      }

      await AdminService.addAdmin(user.uid, currentUser);
      setNewAdminEmail("");
      setError("");
      await fetchAdmins();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to add administrator");
      }
    }
  };

  const handleRemoveAdmin = async (uid: string) => {
    try {
      await AdminService.removeAdmin(uid, currentUser);
      setError("");
      await fetchAdmins();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to remove administrator");
      }
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Administrators</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <Card className="bg-white">
        <CardBody>
          <h2 className="text-xl font-semibold mb-4">Add New Administrator</h2>
          <div className="flex gap-4">
            <Input
              type="email"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              placeholder="Enter user email"
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddAdmin();
                }
              }}
            />
            <Button color="primary" onClick={handleAddAdmin} className="px-8">
              Add Admin
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card className="bg-white">
        <CardBody>
          <h2 className="text-xl font-semibold mb-4">Current Administrators</h2>
          <div className="space-y-4">
            {admins.map((admin) => (
              <div
                key={admin.uid}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">
                    {admin.displayName || "No name"}
                  </p>
                  <p className="text-gray-600 text-sm">{admin.email}</p>
                </div>
                <Button
                  color="danger"
                  variant="flat"
                  onClick={() => handleRemoveAdmin(admin.uid)}
                >
                  Remove Admin
                </Button>
              </div>
            ))}
            {admins.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No administrators found
              </p>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ManageAdmins;
