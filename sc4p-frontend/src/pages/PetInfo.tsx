import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormDisplayCard from "../components/FormDisplayCard";
import { Spinner } from "@nextui-org/react";

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
    return (
      <Spinner className="w-full flex flex-row " label="Loading"></Spinner>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!petData) {
    return <div>No pet found.</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full px-[30px] py-[20px]">
      <h1 className="w-auto text-4xl font-bold">Hi {petData.name}!</h1>
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

      <div className="flex flex-row justify-between gap-4">
        <FormDisplayCard
          headerTitle="General Information"
          petData={{
            name: petData.name,
            id: petData.id,
          }}
          sections={[
            [
              {
                title: "Sex",
                content: petData.sex,
                inputType: "select",
                options: ["Male", "Female"],
              },
            ],
            [
              {
                title: "Spayed/Neutered",
                content: petData.spayedNeutered ? "Yes" : "No",
                inputType: "radiogroup-horizontal",
                options: ["Yes", "No"],
              },
            ],
            [{ title: "Type", content: petData.type }],
            [
              {
                title: "Date of Birth",
                content: new Date(petData.dateOfBirth).toLocaleDateString(),
                inputType: "dateInput",
              },
            ],
            [
              {
                title: "Allergies",
                content: petData.allergies || "None",
                inputType: "textarea",
              },
            ],
          ]}
        />
        <FormDisplayCard
          headerTitle="Insurance"
          sections={[
            [
              {
                title: "Provider",
                content: petData.healthInsuranceProvider || "N/A",
                inputType: "text",
              },
            ],
            [
              {
                title: "Policy Number",
                content: petData.healthInsurancePolicyNumber || "N/A",
                inputType: "text",
              },
            ],
            [
              {
                title: "Cost per Year",
                content: petData.healthInsuranceCost.toString() || "N/A",
                inputType: "text",
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
                inputType: "textarea",
              },
            ],
            [
              {
                title: "Commands",
                content: petData.commands || "N/A",
                inputType: "textarea",
              },
            ],
            [
              {
                title: "Daily Routine",
                content: petData.dailyRoutine || "N/A",
                inputType: "textarea",
              },
            ],
            [
              {
                title: "Allowed Outside",
                content: petData.allowedOutside ? "Yes" : "No",
                inputType: "radiogroup-horizontal",
                options: ["Yes", "No"],
              },
            ],
            [
              {
                title: "Sleep Location",
                content: petData.sleepLocation || "N/A",
                inputType: "text",
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
                inputType: "textarea",
              },
            ],
            [
              {
                title: "Special Needs",
                content: petData.specialNeeds || "None",
                inputType: "textarea",
              },
            ],
            [
              {
                title: "Medications",
                content: petData.medications || "None",
                inputType: "textarea",
              },
            ],
            [
              {
                title: "Flea Prevention",
                content: petData.fleaPrevention || "None",
                inputType: "textarea",
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
                inputType: "textarea",
              },
            ],
            [
              {
                title: "Emergency Supplies",
                content: petData.emergencySupplies || "None",
                inputType: "textarea",
              },
            ],
          ]}
        />
      </div>
    </div>
  );
};

export default PetInfo;
