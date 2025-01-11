import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { AdminService } from "../lib/services";

interface Admin {
  uid: string;
  email: string;
  displayName: string | null;
}

export default function Admins() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  const fetchAdmins = async () => {
    try {
      const adminList = await AdminService.getAllAdmins(currentUser);
      setAdmins(adminList);
    } catch (error) {
      console.error("Error fetching admins:", error);
      setError("Failed to fetch admins");
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async () => {
    try {
      const user = await AdminService.getUserByEmail(
        newAdminEmail,
        currentUser
      );
      if (user?.uid) {
        await AdminService.addAdmin(user.uid, currentUser);
        setNewAdminEmail("");
        await fetchAdmins();
      }
    } catch (error) {
      setError("Failed to add admin");
    }
  };

  const handleRemoveAdmin = async (uid: string) => {
    try {
      await AdminService.removeAdmin(uid, currentUser);
      await fetchAdmins();
    } catch (error) {
      setError("Failed to remove admin");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Administrators</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Admin</h2>
        <div className="flex gap-4">
          <input
            type="email"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            placeholder="Enter user email"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleAddAdmin}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Admin
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Current Administrators</h2>
        <div className="grid gap-4">
          {admins.map((admin) => (
            <div
              key={admin.uid}
              className="flex items-center justify-between bg-white p-4 rounded shadow"
            >
              <div>
                <p className="font-medium">{admin.displayName || "No name"}</p>
                <p className="text-gray-600">{admin.email}</p>
              </div>
              <button
                onClick={() => handleRemoveAdmin(admin.uid)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove Admin
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
