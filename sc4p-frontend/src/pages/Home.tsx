import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { getUserData } from "../lib/Services";

const Home: React.FC = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        try {
          const response = await getUserData(token);
          const data = JSON.parse(await response.text());
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {Array.isArray(userData) && userData.length > 0 ? (
          userData.map((user) => (
            <li key={user.id}> {user.name || user.email}</li>
          ))
        ) : (
          <li>No users found.</li>
        )}
      </ul>
    </div>
  );
};

export default Home;
