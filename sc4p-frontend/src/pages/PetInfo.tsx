import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormDisplayCard from "../components/FormDisplayCard";

const PetInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [petData, setPetData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await axios.get(`/api/pets/id/${id}`);
        setPetData(response.data);
      } catch (err: any) {
        console.error("Error fetching pet data:", err);
        setError("Failed to load pet information.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPetData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!petData) {
    return <div>No pet found.</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full bg-gray-100 px-[30px]">
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-col w-full">
          <h1>{petData.name}</h1>
          <div
            className="w-[300px] h-[200px] bg-gray-800"
            style={{
              borderRadius: "20px",
            }}
          ></div>
        </div>
        <FormDisplayCard
          headerTitle="Identification Information"
          sections={[
            [
              {
                title: "Microchip ID (Brand)",
                content: petData.microchipId || "N/A",
              },
            ],
            [
              {
                title: "License Number",
                content: petData.licenseNumber || "N/A",
              },
            ],
            [{ title: "Special Diet", content: petData.specialDiet || "N/A" }],
          ]}
        />
      </div>

      <div className="flex flex-row justify-between gap-4">
        <FormDisplayCard
          headerTitle="General Information"
          sections={[
            [{ title: "Sex", content: petData.sex }],
            [
              {
                title: "Spayed/Neutered",
                content: petData.spayedNeutered ? "Yes" : "No",
              },
            ],
            [{ title: "Type", content: petData.type }],
            [
              {
                title: "Date of Birth",
                content: new Date(petData.dateOfBirth).toLocaleDateString(),
              },
            ],
            [{ title: "Allergies", content: petData.allergies || "None" }],
          ]}
        />
        <FormDisplayCard
          headerTitle="Insurance"
          sections={[
            [
              {
                title: "Provider",
                content: petData.healthInsuranceProvider || "N/A",
              },
            ],
            [
              {
                title: "Policy Number",
                content: petData.healthInsurancePolicyNumber || "N/A",
              },
            ],
            [
              {
                title: "Cost per Year",
                content: petData.healthInsuranceCost || "N/A",
              },
            ],
          ]}
        />
      </div>

      <div className="flex flex-row justify-between gap-4">
        <FormDisplayCard
          headerTitle="Behavioral Information"
          sections={[
            [
              {
                title: "Behavioral Habits",
                content: petData.behavioralHabits || "N/A",
              },
            ],
            [
              {
                title: "Commands",
                content: petData.commands || "N/A",
              },
            ],
            [
              {
                title: "Daily Routine",
                content: petData.dailyRoutine || "N/A",
              },
            ],
            [
              {
                title: "Allowed Outside",
                content: petData.allowedOutside ? "Yes" : "No",
              },
            ],
            [
              {
                title: "Sleep Location",
                content: petData.sleepLocation || "N/A",
              },
            ],
          ]}
        />
      </div>

      <div className="flex flex-row justify-between gap-4">
        <FormDisplayCard
          headerTitle="Medical Information"
          sections={[
            [
              {
                title: "Medical History",
                content: petData.medicalHistory || "N/A",
              },
            ],
            [
              {
                title: "Special Needs",
                content: petData.specialNeeds || "None",
              },
            ],
            [
              {
                title: "Medications",
                content: petData.medications || "None",
              },
            ],
            [
              {
                title: "Flea Prevention",
                content: petData.fleaPrevention || "None",
              },
            ],
          ]}
        />
      </div>

      <div className="flex flex-row justify-between gap-4">
        <FormDisplayCard
          headerTitle="Extra Information"
          sections={[
            [
              {
                title: "Special Care Instructions",
                content: petData.specialCareInstructions || "None",
              },
            ],
            [
              {
                title: "Emergency Supplies",
                content: petData.emergencySupplies || "None",
              },
            ],
          ]}
        />
      </div>
    </div>
  );
};

export default PetInfo;
