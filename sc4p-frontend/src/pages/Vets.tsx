import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { getVets, createVets, deleteVets } from "../lib/Services";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Card,
  CardBody,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { Veterinarian, CreateVeterinarian } from "../types/veterinarian";

const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  cell_phone: yup
    .string()
    .required("Cell phone is required")
    .matches(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      "Phone number must be a valid US phone number",
    ),
  address: yup
    .string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),
  city: yup
    .string()
    .required("City is required")
    .min(2, "City must be at least 2 characters"),
  state: yup
    .string()
    .required("State is required")
    .matches(/^[A-Z]{2}$/, "State must be a 2-letter code (e.g., CA)"),
  zip: yup
    .string()
    .required("ZIP code is required")
    .matches(/^[0-9]{5}(-[0-9]{4})?$/, "Must be a valid ZIP code"),
});

const ContactCard: React.FC<{
  contact: Veterinarian;
  onDelete: (id: number) => Promise<void>;
}> = ({ contact, onDelete }) => (
  <div className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center">
    <div className="flex flex-col gap-1">
      <h3 className="text-lg font-semibold">{contact.name}</h3>
      <div className="text-sm text-gray-600">
        <p>Phone: {contact.cell_phone}</p>
        <p className="text-xs text-gray-500">
          {contact.address}, {contact.city}, {contact.state} {contact.zip}
        </p>
      </div>
    </div>
    <Button color="danger" variant="light" onPress={() => onDelete(contact.id)}>
      Delete
    </Button>
  </div>
);

const formatPhoneNumber = (phone: string) => {
  const cleaned = ("" + phone).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : phone;
};

const vetpage: React.FC = () => {
  const [veterinarian, setVeterinarian] = useState<Veterinarian[]>([]);
  const [loading, setLoading] = useState(true);

  const { currentUser, userData } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateVeterinarian>({
    resolver: yupResolver(contactSchema),
    mode: "onBlur",
  });

  const fetchVeterinarians = async () => {
    if (!currentUser?.email || !userData?.id) return;

    const token = await currentUser.getIdToken();
    try {
      const contactsResponse = await getVets(token, userData.id);
      const contactsData = await contactsResponse.json();
      setVeterinarian(contactsData);
    } catch (error) {
      console.error("Error fetching vets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVeterinarians();
  }, [currentUser, userData]);

  const onSubmit = async (data: CreateVeterinarian, onClose: () => void) => {
    try {
      if (!currentUser?.email || !userData?.id) return;

      const formattedData = {
        ...data,
        phone: formatPhoneNumber(data.cell_phone),
      };

      const token = await currentUser.getIdToken();
      const response = await createVets(token, {
        ...formattedData,
        owner_id: userData.id,
      });

      if (response.ok) {
        await fetchVeterinarians();
        reset();
        onClose();
      } else {
        console.error("Failed to create vet:", await response.text());
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (contactId: number) => {
    if (!currentUser) return;

    const token = await currentUser.getIdToken();
    try {
      await deleteVets(token, contactId);
      setVeterinarian((contacts) =>
        contacts.filter((contact) => contact.id !== contactId),
      );
    } catch (error) {
      console.error("Error deleting vet:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-start w-full pl-6 pt-6 h-full">
      <h1 className="text-6xl font-bold mb-8">Veterinarians</h1>
      <Button onPress={onOpen} className="mb-6 bg-base text-white">
        Add Vet
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          reset();
          onOpenChange();
        }}
        scrollBehavior="inside"
        placement="center"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add Veterinarian</ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit((data) => onSubmit(data, onClose))}
                >
                  <Card shadow="none">
                    <CardBody className="flex flex-col gap-6">
                      <Input
                        type="text"
                        label="Name"
                        placeholder="Enter contact's full name"
                        isRequired
                        labelPlacement="outside"
                        {...register("name")}
                        isInvalid={!!errors.name}
                        errorMessage={errors.name?.message}
                      />

                      <Input
                        type="tel"
                        label="Phone"
                        placeholder="Enter phone number (e.g., 123-456-7890)"
                        isRequired
                        labelPlacement="outside"
                        {...register("cell_phone")}
                        isInvalid={!!errors.cell_phone}
                        errorMessage={errors.cell_phone?.message}
                      />

                      <Input
                        type="text"
                        label="Street Address"
                        placeholder="Enter street address"
                        isRequired
                        labelPlacement="outside"
                        {...register("address")}
                        isInvalid={!!errors.address}
                        errorMessage={errors.address?.message}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="text"
                          label="City"
                          placeholder="Enter city"
                          isRequired
                          labelPlacement="outside"
                          {...register("city")}
                          isInvalid={!!errors.city}
                          errorMessage={errors.city?.message}
                        />

                        <Input
                          type="text"
                          label="State"
                          placeholder="Enter state (e.g., CA)"
                          isRequired
                          labelPlacement="outside"
                          {...register("state")}
                          isInvalid={!!errors.state}
                          errorMessage={errors.state?.message}
                        />
                      </div>

                      <Input
                        type="text"
                        label="ZIP Code"
                        placeholder="Enter ZIP code"
                        isRequired
                        labelPlacement="outside"
                        {...register("zip")}
                        isInvalid={!!errors.zip}
                        errorMessage={errors.zip?.message}
                      />
                    </CardBody>
                  </Card>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="flat"
                      onPress={() => {
                        reset();
                        onClose();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Add Contact
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="w-full mt-6 grid gap-4">
        {veterinarian.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onDelete={handleDelete}
          />
        ))}
        {veterinarian.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No veterinarians added yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default vetpage;
