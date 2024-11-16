import React from "react";
import FormDisplayCard from "../components/FormDisplayCard";

const PetInfo: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 w-full bg-gray-100 px-[30px]">
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-col w-full">
          <h1>Pet Name</h1>
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
            [{ title: "Microchip ID (Brand)", content: "Brand Name" }],
            [{ title: "ID Number", content: "123456" }],
            [{ title: "License (City or County)", content: "Nashville" }],
            [{ title: "Tag Number", content: "7891011" }],
          ]}
        />
      </div>

      <div className="flex flex-row justify-between gap-4">
        <FormDisplayCard
          headerTitle="General Information"
          sections={[
            [{ title: "Breed", content: "Corgi Shepard mix" }],
            [{ title: "Weight", content: "36 lbs" }],
            [{ title: "Height", content: "40 cm" }],
            [{ title: "Age", content: "2 years 1 month" }],
            [{ title: "Gender", content: "Girl" }],
            [{ title: "Spayed", content: "No" }],
            [{ title: "Allergies", content: "None" }],
          ]}
        />
        <FormDisplayCard
          headerTitle="Insurance"
          sections={[
            [{ title: "Name of Provider", content: "Corgi Shepard mix" }],
            [{ title: "Phone", content: "123-123-1342" }],
            [{ title: "Policy Number", content: "2 years 1 month" }],
            [{ title: "Cost per year", content: "Girl" }],
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
                content: "Fear of loud noises, loves to bark",
              },
            ],
            [
              {
                title: "Verbal and Nonverbal Commands",
                content: "Come, Sit, Stay Down",
              },
            ],
            [
              {
                title: "Daily Routine",
                content:
                  "She likes walking in the mornings and later at night, we don’t restrict her eating or when she eats, we bring her to a dog park for playing, sleeps like a baby",
              },
            ],
            [{ title: "Allowed Outside", content: "Yes" }],
            [{ title: "Where does your pet sleep", content: "Our bed" }],
            [{ title: "Does your pet like children", content: "Yes" }],
            [
              {
                title:
                  "What Access does your pet have to your home and furniture",
                content: "She has access to everything",
              },
            ],
            [
              {
                title: "Favorite games, toys, or possessions (and location)",
                content:
                  "Her favorite game is playing catch with any tennis ball, and her favorite toy is a blue squeaky dinosaur toy that is stored in the living room cabin",
              },
            ],
            [
              {
                title: "Special Diet Requirements",
                content: "She can’t eat beans",
              },
            ],
            [{ title: "What brand of food do you feed this pet", content: "" }],
            [{ title: "Approximately how much food per day", content: "" }],
            [
              {
                title: "When are the typical feeding times and amounts",
                content: "",
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
                title:
                  "Medical History specific information relative to the pet’s health",
                content: "She has allergic reactions",
              },
            ],
            [
              {
                title:
                  "Special Needs (permanent medical condition or special exercise)",
                content:
                  "She is scared of heights, also needs 1 hour of exercise every day (like walking her)",
              },
            ],
            [
              {
                title:
                  "List any medications/supplements (indicate dosage and frequency)",
                content: "She can’t eat beans",
              },
            ],
            [
              {
                title: "Where is your pet’s medical history located",
                content:
                  "There is an online version in USB, with the vet office, and the physical version is in the master bedroom",
              },
            ],
            [
              {
                title:
                  "Type of flea/heartworm preventative and when administered",
                content: "XX brand type preventative administered 05/25/2023",
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
                title: "Special care instruction",
                content: "",
              },
            ],
            [
              {
                title:
                  "Emergency supplies for my pet (location of leashes and harnesses, food, food bowls, medicine, and veterinarian records)",
                content: "",
              },
            ],
          ]}
        />
      </div>
    </div>
  );
};

export default PetInfo;
