import React from "react";
import {
  Card,
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "@nextui-org/react";
import { Pet, UpdatePet } from "../types/pet";
import {
  EmergencyContact,
  UpdateEmergencyContact,
} from "../types/emergencyContact";
import { UserType, UpdateUser } from "../types/user";
import { Caregiver, UpdateCaregiver } from "../types/caregiver";
import { BoardingFac, UpdateBoardingFac } from "../types/boardingFac";
import { Trustee, UpdateTrustee } from "../types/trustee";

type CardType = {
  type:
    | "pet"
    | "emergency_contact"
    | "user"
    | "caregiver"
    | "boarding_facilities"
    | "trustee";
  data?: Pet | EmergencyContact | UserType | Caregiver | BoardingFac | Trustee;
  onDelete?: (id: number) => void;
  onUpdate?: (
    id: number,
    data:
      | UpdatePet
      | UpdateEmergencyContact
      | UpdateUser
      | UpdateCaregiver
      | UpdateBoardingFac
      | UpdateTrustee,
  ) => void;
};

type FormDataType =
  | Pet
  | EmergencyContact
  | UserType
  | Caregiver
  | BoardingFac
  | Trustee;

const InformationCard: React.FC<CardType> = ({
  type,
  data,
  onDelete,
  onUpdate,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = React.useState<FormDataType | undefined>(
    data,
  );

  if (!data) {
    return (
      <Card className="flex items-center justify-center p-4 bg-[#e6d1ff] bg-opacity-25 shadow-sm shadow-[#AF94D3] rounded-lg w-full mb-4 h-32">
        <Spinner color="secondary" />
      </Card>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (!prev) return undefined;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSave = () => {
    if (onUpdate && formData) {
      onUpdate(data.id, formData);
    }
    onClose();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(data.id);
    }
  };

  const getDisplayName = () => {
    if (type === "boarding_facilities") {
      return (data as BoardingFac).contact_name;
    }
    if (type === "trustee") {
      return (data as Trustee).trustee_name;
    }
    return "name" in data ? data.name : "";
  };

  const renderCardContent = () => {
    const displayName = getDisplayName();

    return (
      <div className="px-8 py-10">
        <div className="flex justify-between items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[32px] font-bold font-inter">
                {displayName}
              </span>
              {type === "caregiver" && (
                <span className="text-lg">
                  ({(data as Caregiver).primary ? "Primary" : "Secondary"})
                </span>
              )}
            </div>
            <div className="flex gap-16">
              {type === "pet" ? (
                <div>
                  <span className="font-bold mr-2 text-[20px]">Type</span>
                  <span className="text-[18px]">
                    {(data as Pet).type || "Not specified"}
                  </span>
                </div>
              ) : (
                <>
                  <div>
                    <span className="font-bold mr-2 text-[20px]">Phone</span>
                    <span className="text-[18px]">
                      {type === "boarding_facilities"
                        ? (data as BoardingFac).cell_phone
                        : type === "caregiver"
                        ? (data as Caregiver).phone
                        : type === "emergency_contact"
                        ? (data as EmergencyContact).phone
                        : type === "trustee"
                        ? (data as Trustee).cell_phone
                        : ""}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold mr-2 text-[20px]">Email</span>
                    <span className="text-[18px]">
                      {type === "boarding_facilities"
                        ? (data as BoardingFac).email
                        : type === "caregiver"
                        ? (data as Caregiver).email
                        : type === "emergency_contact"
                        ? (data as EmergencyContact).email
                        : type === "trustee"
                        ? (data as Trustee).email
                        : ""}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          <Button
            className="bg-[#FFC53D] text-black font-bold text-[20px] rounded-3xl px-8 py-7 hover:bg-[#FFC53D]/90"
            onClick={onOpen}
          >
            See more
          </Button>
        </div>
      </div>
    );
  };

  const renderFormFields = () => {
    if (!formData) return null;

    const commonFields = (
      <>
        <div className="grid grid-cols-2 gap-4">
          {"name" in formData && (
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mb-4"
            />
          )}
          {"contact_name" in formData && (
            <Input
              label="Contact Name"
              name="contact_name"
              value={(formData as BoardingFac).contact_name}
              onChange={handleInputChange}
              className="mb-4"
            />
          )}
          {"address" in formData && (
            <>
              <Input
                label="Address"
                name="address"
                value={formData.address || ""}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                label="City"
                name="city"
                value={formData.city || ""}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                label="State"
                name="state"
                value={formData.state || ""}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                label="ZIP"
                name="zip"
                value={formData.zip || ""}
                onChange={handleInputChange}
                className="mb-4"
              />
            </>
          )}
        </div>
      </>
    );

    switch (type) {
      case "pet":
        const pet = formData as Pet;
        return (
          <>
            {commonFields}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Type"
                name="type"
                value={pet.type}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                label="Sex"
                name="sex"
                value={pet.sex}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                label="Microchip ID"
                name="microchip_id"
                value={pet.microchip_id || ""}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                label="License Number"
                name="license_number"
                value={pet.license_number || ""}
                onChange={handleInputChange}
                className="mb-4"
              />
            </div>
          </>
        );
      case "emergency_contact":
        const contact = formData as EmergencyContact;
        return (
          <>
            {commonFields}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Phone"
                name="phone"
                value={contact.phone || ""}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                label="Email"
                name="email"
                value={contact.email || ""}
                onChange={handleInputChange}
                className="mb-4"
              />
            </div>
          </>
        );
      case "user":
        const user = formData as UserType;
        return (
          <>
            {commonFields}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Cell Phone"
                name="cell_phone"
                value={user.cell_phone}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                label="Home Phone"
                name="home_phone"
                value={user.home_phone || ""}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                label="Work Phone"
                name="work_phone"
                value={user.work_phone || ""}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                label="Email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="mb-4"
              />
            </div>
          </>
        );
      case "caregiver":
        const caregiver = formData as Caregiver;
        return (
          <>
            {commonFields}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Phone"
                name="phone"
                value={caregiver.phone}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                label="Email"
                name="email"
                value={caregiver.email}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                label="Care Type"
                name="care_type"
                value={caregiver.care_type}
                onChange={handleInputChange}
                className="mb-4"
              />
            </div>
          </>
        );
      case "boarding_facilities":
        const boardingFac = formData as BoardingFac;
        return (
          <>
            {commonFields}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Daily Charge"
                name="daily_charge"
                type="number"
                value={String(boardingFac.daily_charge || "")}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                label="Cell Phone"
                name="cell_phone"
                value={boardingFac.cell_phone}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                label="Home Phone"
                name="home_phone"
                value={boardingFac.home_phone || ""}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                label="Email"
                name="email"
                value={boardingFac.email || ""}
                onChange={handleInputChange}
                className="mb-4"
              />
            </div>
          </>
        );
      case "trustee":
        const trustee = formData as Trustee;
        return (
          <>
            {commonFields}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Cell Phone"
                name="cell_phone"
                value={trustee.cell_phone}
                onChange={handleInputChange}
                className="mb-4"
              />
              <Input
                label="Email"
                name="email"
                value={trustee.email}
                onChange={handleInputChange}
                className="mb-4"
              />
            </div>
          </>
        );
      default:
        return commonFields;
    }
  };

  return (
    <>
      <Card className="bg-[#F8F0FF] border-2 border-[#8B5CF6] shadow-md shadow-purple-200 rounded-2xl w-full mb-4">
        {renderCardContent()}
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>Edit {getDisplayName()}</ModalHeader>
          <ModalBody>{renderFormFields()}</ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSave}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InformationCard;
