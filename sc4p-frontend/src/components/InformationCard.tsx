import React from "react";
import { Image, Card, Button } from "@nextui-org/react";
import petTemplate from "../images/petTemplate.png";

type CardProps = {
  purpose: "pet" | "caregiver"; // Defines the purpose of the card
  imageSrc: string; // URL for the image
  name: string; // Name (e.g., pet's name or caregiver's name)
  petType?: string; // Pet's type (if purpose is "pet")
  phone?: string; // Caregiver's phone number (if purpose is "caregiver")
  email?: string; // Caregiver's email (if purpose is "caregiver")
  relation?: string; // Relationship (e.g., Primary for caregiver)
};

const PurposeCard: React.FC<CardProps> = ({
  purpose,
  imageSrc,
  name,
  petType,
  phone,
  email,
  relation,
}) => {
  return (
    <Card
      className={`flex items-center justify-between p-4 bg-[#e6d1ff] bg-opacity-25 shadow-sm shadow-[#AF94D3] rounded-lg w-full mb-4`}
    >
      {purpose === "pet" ? (
        <div className="flex items-center justify-between w-full">
          {/* Pet Layout */}
          <div className="flex items-center gap-8">
            {/* Image */}
            <Image
              src={imageSrc}
              alt={`${name} photo`}
              width={64}
              height={64}
              className="rounded object-cover"
            />
            {/* Pet Info */}
            <div>
              <h4 className="text-xl font-semibold text-black mb-1">{name}</h4>
              <p className="text-sm font-semibold text-gray-600">{petType}</p>
            </div>
          </div>
          {/* Button */}
          <Button
            className="bg-white text-purple-600 border border-purple-500 hover:bg-purple-200"
            radius="md"
          >
            Update
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          {/* Caregiver Layout */}
          <div className="flex items-center gap-8">
            {/* Image */}
            <Image
              src={imageSrc}
              alt={`${name} photo`}
              width={64}
              height={64}
              className="rounded object-cover"
            />
            {/* Caregiver Info */}
            <div>
              <div className="flex gap-8 items-center">
                <h4 className="text-xl font-semibold text-black mb-1">
                  {name}
                </h4>
                <p className="text-sm text-black font-semibold">
                  {"("}
                  {relation}
                  {")"}
                </p>
              </div>
              <div className="flex gap-8">
                <p className="text-sm text-black font-semibold">
                  Phone <span className="text-gray-500 ml-1">{phone}</span>
                </p>
                <p className="text-sm text-black font-semibold">
                  Email <span className="text-gray-500 ml-1">{email}</span>
                </p>
              </div>
            </div>
          </div>
          {/* Button */}
          <Button
            className="bg-white text-purple-600 border border-purple-500 hover:bg-purple-200"
            radius="md"
          >
            Update
          </Button>
        </div>
      )}
    </Card>
  );
};

export default PurposeCard;
