import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { getUserData } from "../lib/Services";

const Home: React.FC = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useAuth();
  const image =
    "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80";

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (currentUser) {
//         const token = await currentUser.getIdToken();
//         try {
//           const response = await getUserData(token);
//           const data = JSON.parse(await response.text());
//           setUserData(data);
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchUserData();
//   }, [currentUser]);

//     if (loading) {
//       return <div>Loading...</div>;
//     }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-left">
            <img
              src={image}
              alt="Owner"
              className="w-full h-36 object-cover rounded-t-lg" // Ensure the top is rounded, not the whole image
            />
            <h3 className="ml-4 mt-2 text-lg font-semibold">Owner's Name</h3>
            <p className="ml-4 mb-4 text-sm text-gray-500">
              Contact Information
            </p>
          </div>
        </div>

        {/* Caretakers */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-purple-500">
          <h4 className="text-lg font-semibold mb-4">Caretakers</h4>
          <hr className=" border-purple-500 mb-4" />
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <img
                src={image}
                alt="Caretaker"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold">Andrea Antonelli</p>
                <p className="text-xs text-gray-500">123-123-1234</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <img
                src={image}
                alt="Caretaker"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold">Andrea Antonelli</p>
                <p className="text-xs text-gray-500">123-123-1234</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* All Pets */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-purple-500">
          <h4 className="text-lg font-semibold mb-4">All Pets</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <img src={image} alt="Oreo" className="w-12 h-12 rounded-lg" />
              <div>
                <p className="font-semibold">Oreo</p>
                <p className="text-xs text-gray-500">Breed</p>
              </div>
            </div>
            <hr className=" border-purple-500 mb-4" />

            <div className="flex items-center space-x-4">
              <img src={image} alt="Walnut" className="w-12 h-12 rounded-lg" />
              <div>
                <p className="font-semibold">Walnut</p>
                <p className="text-xs text-gray-500">Breed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Forms */}
        <div className="bg-white border border-purple-500 p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-4">Forms</h4>
          <hr className="border-purple-500 mb-4" />
          <div className="space-y-2">
            <p className="text-purple-700 cursor-pointer flex items-center space-x-4">
              <span className="w-3.5 h-3.5 bg-purple-300 rounded-full inline-block mr-2"></span>
              Update Pet Information &gt;
            </p>
            <p className="text-purple-700 cursor-pointer flex items-center space-x-4">
              <span className="w-3.5 h-3.5 bg-purple-300 rounded-full inline-block mr-2"></span>
              Update Contact Information &gt;
            </p>
            <p className="text-purple-700 cursor-pointer flex items-center space-x-4">
              <span className="w-3.5 h-3.5 bg-purple-300 rounded-full inline-block mr-2"></span>
              Update Emergency Information &gt;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
