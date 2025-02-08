import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { getCaregivers, getPets } from "../lib/Services";
import { Spinner } from "@nextui-org/react";
import { FaPaw } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [caregivers, setCaregivers] = useState<any[]>([]);
  const [pets, setPets] = useState<any[]>([]);
  const { currentUser, userData } = useAuth();
  const image =
    "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80";
  const navigate = useNavigate();

  const getIdenticonUrl = (identifier: string) => {
    return `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
      identifier,
    )}`;
  };

  const handlePetClick = (petId: string) => {
    navigate(`/pets/${petId}`);
  };

  const handleCaregiversClick = () => {
    navigate("/caregivers");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser && userData?.id) {
        try {
          const token = await currentUser.getIdToken();
          const caregiversResponse = await getCaregivers(token, userData.id);
          const caregiversData = await caregiversResponse.json();
          setCaregivers(caregiversData);
          const petsResponse = await getPets(token, userData.id);
          const petsData = await petsResponse.json();
          setPets(petsData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [currentUser, userData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-left">
            <img
              src={image}
              alt="Owner"
              className="w-full h-36 object-cover rounded-t-lg"
            />
            <h3 className="ml-4 mt-2 text-lg font-semibold">
              {userData?.name || "Loading..."}
            </h3>
            <p className="ml-4 mb-4 text-sm text-gray-500">
              {userData?.cell_phone || "No contact information"}
            </p>
          </div>
        </div>

        <div
          className="bg-white p-4 rounded-lg shadow-md border border-purple-500 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={handleCaregiversClick}
        >
          <h4 className="text-lg font-semibold mb-4">Caregivers</h4>
          <hr className="border-purple-500 mb-4" />
          <div className="space-y-3">
            {caregivers.map((caregiver: any) => (
              <div key={caregiver.id} className="flex items-center space-x-3">
                <img
                  src={
                    caregiver.profileImage ||
                    getIdenticonUrl(caregiver.id.toString())
                  }
                  alt="Caregiver"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold">{caregiver.name}</p>
                  <p className="text-xs text-gray-500">{caregiver.phone}</p>
                </div>
              </div>
            ))}
            {caregivers.length === 0 && (
              <p className="text-sm text-gray-500">No caregivers added</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md border border-purple-500">
          <h4 className="text-lg font-semibold mb-4">All Pets</h4>
          <div className="space-y-3">
            {pets.map((pet: any, index: number) => (
              <React.Fragment key={pet.id}>
                <div
                  className="flex items-center space-x-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  onClick={() => handlePetClick(pet.id)}
                >
                  {pet.image ? (
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-12 h-12 rounded-lg"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                      <FaPaw className="w-8 h-8 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{pet.name}</p>
                    <p className="text-xs text-gray-500">{pet.breed}</p>
                  </div>
                </div>
                {index < pets.length - 1 && (
                  <hr className="border-purple-500 mb-4" />
                )}
              </React.Fragment>
            ))}
            {pets.length === 0 && (
              <p className="text-sm text-gray-500">No pets added</p>
            )}
          </div>
        </div>

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
