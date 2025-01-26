import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Button } from "@nextui-org/react";
import { getPetById } from "../lib/Services";
import { useAuth } from "../AuthContext";
import FormDisplayCard from "../components/FormDisplayCard";
import { Pet } from "../types/pet";

type PetData = Pet;

const PetInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [petData, setPetData] = useState<PetData | null>(null);
  const { currentUser, userData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetData = async () => {
      if (!currentUser || !userData) return;
      const token = await currentUser.getIdToken();
      try {
        const response = await getPetById(token, Number(id));
        const petData = await response.json();
        if (petData) {
          setPetData(petData);
        } else {
          setError("Pet not found.");
        }
      } catch (err: any) {
        console.error("Error fetching pet data:", err);
        setError("Failed to load pet information.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPetData();
  }, [id, currentUser, userData]);

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Spinner size="lg" label="Loading pet information..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="text-danger text-xl">{error}</div>
      </div>
    );
  }

  if (!petData) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="text-xl">No pet found.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full px-4 md:px-8 py-6">
      <Button
        className="w-fit bg-base text-white"
        onClick={() => navigate("/pets")}
      >
        Back to Pets
      </Button>
      <h1 className="text-4xl font-bold">Hi {petData.name}!</h1>
      <FormDisplayCard
        headerTitle="Identification Information"
        sections={[
          [
            {
              title: "Microchip ID (Brand)",
              content: petData.microchip_id || "N/A",
            },
          ],
          [
            {
              title: "License Number",
              content: petData.license_number || "N/A",
            },
          ],
          [{ title: "Special Diet", content: petData.special_diet || "N/A" }],
        ]}
      />

      <div className="flex flex-row justify-between gap-4">
        <FormDisplayCard
          headerTitle="General Information"
          petData={{
            name: petData.name,
            id: petData.id.toString(),
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
                content: petData.spayed_neutered ? "Yes" : "No",
                inputType: "radiogroup-horizontal",
                options: ["Yes", "No"],
              },
            ],
            [{ title: "Type", content: petData.type }],
            [
              {
                title: "Date of Birth",
                content: petData.date_of_birth
                  ? new Date(petData.date_of_birth).toLocaleDateString()
                  : "N/A",
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
                content: petData.health_insurance_provider || "N/A",
                inputType: "text",
              },
            ],
            [
              {
                title: "Policy Number",
                content: petData.health_insurance_policy_number || "N/A",
                inputType: "text",
              },
            ],
            [
              {
                title: "Cost per Year",
                content: petData.health_insurance_cost?.toString() || "N/A",
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
                content: petData.behavioral_habits || "N/A",
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
                content: petData.daily_routine || "N/A",
                inputType: "textarea",
              },
            ],
            [
              {
                title: "Allowed Outside",
                content: petData.allowed_outside ? "Yes" : "No",
                inputType: "radiogroup-horizontal",
                options: ["Yes", "No"],
              },
            ],
            [
              {
                title: "Sleep Location",
                content: petData.sleep_location || "N/A",
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
                content: petData.medical_history || "N/A",
                inputType: "textarea",
              },
            ],
            [
              {
                title: "Special Needs",
                content: petData.special_needs || "None",
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
                content: petData.flea_prevention || "None",
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
                content: petData.special_care_instructions || "None",
                inputType: "textarea",
              },
            ],
            [
              {
                title: "Emergency Supplies",
                content: petData.emergency_supplies || "None",
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
