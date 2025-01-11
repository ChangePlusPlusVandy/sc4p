import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext"; // Adjust path if needed

interface DBUser {
  id: number;
  name: string | null;
  email: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  home_phone: string | null;
  cell_phone: string | null;
  work_phone: string | null;
}

// Adjust your environment variable accordingly:
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Profile: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [dbUser, setDbUser] = useState<DBUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      // If no currentUser or no email, we can’t fetch data
      if (!currentUser?.email) {
        setIsLoading(false);
        return;
      }

      try {
        // Get Firebase token so we can pass it to the backend
        const token = await currentUser.getIdToken();
        const response = await fetch(
          `${backendUrl}/user/email/${encodeURIComponent(currentUser.email)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch user data (status ${response.status})`);
        }

        const data = await response.json();
        setDbUser(data);
      } catch (err: any) {
        console.error("Error fetching user data:", err);
        setError("Could not load profile data.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUserData();
  }, [currentUser]);

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!dbUser) {
    return <p>No user data found for this account.</p>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Owner name */}
      <h1 className="text-2xl font-bold">Owner&apos;s Name</h1>
      <p>{dbUser.name || "(No name on file)"}</p>
      <hr className="border-gray-500 w-1/2" />

      {/* Contact Info header */}
      <h2 className="text-lg font-bold">Contact Information</h2>

      {/* Card / box layout for the contact details */}
      <div className="border border-purple-300 bg-white rounded-lg shadow-lg p-4 shadow-purple-100 max-w-md space-y-4">
        <div>
          <strong>Email:</strong> {dbUser.email}
        </div>

        <div>
          <strong>Home Phone:</strong> {dbUser.home_phone ?? ""}
        </div>

        <div>
          <strong>Cell Phone:</strong> {dbUser.cell_phone ?? ""}
        </div>

        <div>
          <strong>Work Phone:</strong> {dbUser.work_phone ?? ""}
        </div>

        <div>
          <strong>Address:</strong> {dbUser.address ?? ""}
        </div>

        <div>
          <strong>City:</strong> {dbUser.city ?? ""} &nbsp;
          <strong>State:</strong> {dbUser.state ?? ""} &nbsp;
          <strong>Zip Code:</strong> {dbUser.zip ?? ""}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="bg-purple-500 text-white rounded px-4 py-2"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;

