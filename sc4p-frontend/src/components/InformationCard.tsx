import React from "react";
import { Card, 
  Button, 
  Modal, 
  Input,
  ButtonGroup,
  CardBody,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import petTemplate from "../images/petTemplate.png";

type CardProps = {
  purpose: "pet" | "caregiver" | "boarding_facilities" | "trust" | "emergency_contact"; // Defines the purpose of the card
  name: string; // Name (e.g., pet's name or caregiver's name)
  petType?: string; // Pet's type (if purpose is "pet")
  phone?: string; // Caregiver's phone number (if purpose is "caregiver")
  email?: string | null; // Caregiver's email (if purpose is "caregiver")
  relation?: string; // Relationship (e.g., Primary for caregiver)
  care_type?: string;// long or short term
  accepted?: string; // whether or not they accept
  address?: string; 
  city?: string;
  state?: string;
  zip?: string;
  home_phone?: string | null;
  daily_charge?: number;
  id?: number;
  deleteItem?: (id: number) => void;
};

const PurposeCard: React.FC<CardProps> = ({
  purpose,
  name,
  petType,
  phone,
  email,
  relation,
  care_type,
  accepted,
  address,
  city,
  state,
  zip,
  home_phone,
  daily_charge,
  id,
  deleteItem,
}) => {

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => setShowPopup((prev) => !prev);

  const handleSave = () => {
    setShowPopup(false); // Close the popup after saving
  };


  const [editableData, setEditableData] = useState({
    name,
    petType,
    phone,
    email,
    relation,
    care_type,
    accepted,
    address,
    city,
    state,
    zip,
    home_phone,
    daily_charge,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    if (id && deleteItem) {
      deleteItem(id); // Call the delete function passed from parent with the id
    }
  };


  return (

    <Card
      className={`flex items-center justify-between p-4 bg-[#e6d1ff] bg-opacity-25 shadow-sm shadow-[#AF94D3] rounded-lg w-full mb-4`}
    >
      {purpose === "pet" && (
        <div className="flex items-center justify-between w-full">
          {/* Pet Layout */}
          <div className="flex items-center gap-8">
            
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
            onClick={togglePopup}
          >
            {showPopup ? "See Less" : "See More"}
          </Button>
        </div>
      )}
      
      {purpose == "caregiver" && (
        <div className="flex items-center justify-between w-full">
          {/* Caregiver Layout */}
          <div className="flex items-center gap-8">
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
    {/* Button Container */}
    <div className="flex gap-4">
      {/* See More Button */}
      <Button
        className="bg-white text-purple-600 border border-purple-500 hover:bg-purple-200 mt-4"
        radius="md"
        onClick={togglePopup}
      >
        {showPopup ? "See Less" : "See More"}
      </Button>
      {/* Delete Button */}
      <Button
        className="bg-red-500 text-white mt-4"
        onClick={handleDelete}
        radius="md"
      >
        Delete
      </Button>
        </div>
      </div>
      )}

      {purpose == "boarding_facilities" && (
        <div className="flex items-center justify-between w-full">
          {/* Facility Layout */}
          <div className="flex items-center gap-8">
            {/* Facility Info */}
            <div>
              <div className="flex gap-8 items-center">
                <h4 className="text-xl font-semibold text-black mb-1">
                  {name}
                </h4>
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
          {/* Button Container */}
    <div className="flex gap-4">
      {/* See More Button */}
      <Button
        className="bg-white text-purple-600 border border-purple-500 hover:bg-purple-200 mt-4"
        radius="md"
        onClick={togglePopup}
      >
        {showPopup ? "See Less" : "See More"}
      </Button>
      {/* Delete Button */}
      <Button
        className="bg-red-500 text-white mt-4"
        onClick={handleDelete}
        radius="md"
      >
        Delete
      </Button>
          </div>
        </div>
      )}

      {purpose == "trust" && (
        <div className="flex items-center justify-between w-full">
          {/* Trust Layout */}
          <div className="flex items-center gap-8">
            {/* Trust Info */}
            <div>
              <div className="flex gap-8 items-center">
                <h4 className="text-xl font-semibold text-black mb-1">
                  {name}
                </h4>
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
            See More
          </Button>
        </div>
      )}

{purpose == "emergency_contact" && (
        <div className="flex items-center justify-between w-full">
          {/* emergency Layout */}
          <div className="flex items-center gap-8">
            {/* emergency Info */}
            <div>
              <div className="flex gap-8 items-center">
                <h4 className="text-xl font-semibold text-black mb-1">
                  {name}
                </h4>
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
          {/* Button Container */}
    <div className="flex gap-4">
      {/* See More Button */}
      <Button
        className="bg-white text-purple-600 border border-purple-500 hover:bg-purple-200 mt-4"
        radius="md"
        onClick={togglePopup}
      >
        {showPopup ? "See Less" : "See More"}
      </Button>
      {/* Delete Button */}
      <Button
        className="bg-red-500 text-white mt-4"
        onClick={handleDelete}
        radius="md"
      >
        Delete
      </Button>
          </div>
        </div>
      )}



    {showPopup && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
       <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <div className="flex flex-col space-y-4">

          {purpose === "caregiver" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{editableData.name}</h3>
            <div className="text-sm text-gray-600">
              {/* Flex row for fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block">Phone Number</label>
                  <Input
                    fullWidth
                    name="phone"
                    value={editableData.phone || ""}
                    onChange={handleChange}
                    placeholder="Phone"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Email</label>
                  <Input
                    fullWidth
                    name="email"
                    value={editableData.email || ""}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Care Type</label>
                  <Input
                    fullWidth
                    name="care_type"
                    value={editableData.care_type || ""}
                    onChange={handleChange}
                    placeholder="Care Type"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Relation</label>
                  <Input
                    fullWidth
                    name="relation"
                    value={editableData.relation || ""}
                    onChange={handleChange}
                    placeholder="Relation"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Accepted</label>
                  <Input
                    fullWidth
                    name="accepted"
                    value={editableData.accepted || ""}
                    onChange={handleChange}
                    placeholder="Accepted"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Address</label>
                  <Input
                    fullWidth
                    name="address"
                    value={editableData.address || ""}
                    onChange={handleChange}
                    placeholder="Address"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">City</label>
                  <Input
                    fullWidth
                    name="city"
                    value={editableData.city || ""}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">State</label>
                  <Input
                    fullWidth
                    name="state"
                    value={editableData.state || ""}
                    onChange={handleChange}
                    placeholder="State"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Zip</label>
                  <Input
                    fullWidth
                    name="zip"
                    value={editableData.zip || ""}
                    onChange={handleChange}
                    placeholder="Zip"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {purpose === "boarding_facilities" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{editableData.name}</h3>
            <div className="text-sm text-gray-600">
              {/* Flex row for fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block">Phone Number</label>
                  <Input
                    fullWidth
                    name="phone"
                    value={editableData.phone || ""}
                    onChange={handleChange}
                    placeholder="Phone"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Home Number</label>
                  <Input
                    fullWidth
                    name="Home phone"
                    value={editableData.home_phone|| ""}
                    onChange={handleChange}
                    placeholder="Home Phone"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Daily Charge</label>
                  <Input
                    label="Average Daily Charge"
                    placeholder="Enter average daily charge"
                    type="number"
                    isRequired
                    labelPlacement="outside"
                   />
                </div>
                <div className="mb-4">
                  <label className="block">Email</label>
                  <Input
                    fullWidth
                    name="email"
                    value={editableData.email || ""}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Address</label>
                  <Input
                    fullWidth
                    name="address"
                    value={editableData.address || ""}
                    onChange={handleChange}
                    placeholder="Address"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">City</label>
                  <Input
                    fullWidth
                    name="city"
                    value={editableData.city || ""}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">State</label>
                  <Input
                    fullWidth
                    name="state"
                    value={editableData.state || ""}
                    onChange={handleChange}
                    placeholder="State"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Zip</label>
                  <Input
                    fullWidth
                    name="zip"
                    value={editableData.zip || ""}
                    onChange={handleChange}
                    placeholder="Zip"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {purpose === "emergency_contact" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{editableData.name}</h3>
            <div className="text-sm text-gray-600">
              {/* Flex row for fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block">Phone Number</label>
                  <Input
                    fullWidth
                    name="phone"
                    value={editableData.phone || ""}
                    onChange={handleChange}
                    placeholder="Phone"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Email</label>
                  <Input
                    fullWidth
                    name="email"
                    value={editableData.email || ""}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Address</label>
                  <Input
                    fullWidth
                    name="address"
                    value={editableData.address || ""}
                    onChange={handleChange}
                    placeholder="Address"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">City</label>
                  <Input
                    fullWidth
                    name="city"
                    value={editableData.city || ""}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">State</label>
                  <Input
                    fullWidth
                    name="state"
                    value={editableData.state || ""}
                    onChange={handleChange}
                    placeholder="State"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Zip</label>
                  <Input
                    fullWidth
                    name="zip"
                    value={editableData.zip || ""}
                    onChange={handleChange}
                    placeholder="Zip"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <Button
          className="bg-purple-600 text-white mt-4"
          radius="md"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  </div>
)}
        </Card>
  )};

export default PurposeCard;
