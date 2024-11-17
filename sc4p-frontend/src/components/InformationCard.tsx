import React from "react";
import { Image, Card, Button } from "@nextui-org/react";
import petTemplate from "../images/petTemplate.png";

type PetCardProps = {
  imageSrc: string; // URL for the pet's image
  name: string; // Pet's name
  petType: string; // Type of pet (e.g., Dog, Cat)
};

const PetCard: React.FC<PetCardProps> = ({ imageSrc, name, petType }) => {
  return (
    <Card className="flex flex-row items-center justify-between p-4 bg-[#e6d1ff] bg-opacity-25 shadow-sm shadow-[#AF94D3] rounded-lg w-full mb-4">
      <div className="flex items-center gap-8">
        {/* Image */}
        <Image
          src={petTemplate}
          alt={`${name} photo`}
          width={64}
          height={64}
          className="rounded object-cover "
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
    </Card>
  );
};

export default PetCard;
