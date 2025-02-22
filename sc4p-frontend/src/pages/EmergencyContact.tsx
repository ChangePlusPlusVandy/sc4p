import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import {
  getEmergencyContacts,
  createEmergencyContact,
  deleteEmergencyContact,
  updateEmergencyContact,
} from "../lib/Services";
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
  Spinner,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type {
  EmergencyContact,
  CreateEmergencyContact,
} from "../types/emergencyContact";
import InformationCard from "../components/InformationCard";

const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  phone: yup
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

const formatPhoneNumber = (phone: string) => {
  const cleaned = ("" + phone).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : phone;
};

const EmergencyContactPage: React.FC = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, userData } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateEmergencyContact>({
    resolver: yupResolver(contactSchema),
    mode: "onBlur",
  });

  const fetchContacts = async () => {
    if (!currentUser?.email || !userData?.id) return;

    const token = await currentUser.getIdToken();
    try {
      const response = await getEmergencyContacts(token, userData.id);
      const data = await response.json();
      setContacts(data || []);
    } catch (error) {
      console.error("Error fetching emergency contacts:", error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser && userData) {
      fetchContacts();
    }
  }, [currentUser, userData]);

  const onSubmit = async (
    data: CreateEmergencyContact,
    onClose: () => void,
  ) => {
    try {
      if (!currentUser?.email || !userData?.id) return;

      const formattedData = {
        ...data,
        phone: formatPhoneNumber(data.phone),
      };

      const token = await currentUser.getIdToken();
      const response = await createEmergencyContact(token, {
        ...formattedData,
        owner_id: userData.id,
      });

      if (response.ok) {
        await fetchContacts();
        reset();
        onClose();
        toast.success("Succesfully added a new emergency contact!");
      } else {
        console.error(
          "Failed to create emergency contact:",
          await response.text(),
          toast.error("Failed to create emergency contact"),
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occured while adding emergency contact");
    }
  };

  const handleDelete = async (contactId: number) => {
    if (!currentUser) return;

    const token = await currentUser.getIdToken();
    try {
      await deleteEmergencyContact(token, contactId);
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== contactId),
      );
      toast.success("Succesfully removed emergency contact!");
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to remove emergency contact");
    }
  };

  const handleUpdate = async (id: number, updatedData: any) => {
    if (!currentUser) return;

    const token = await currentUser.getIdToken();
    try {
      const response = await updateEmergencyContact(token, id, updatedData);
      if (response.ok) {
        await fetchContacts();
        toast("Successfully updated emergency contact!");
      } else {
        console.error(
          "Failed to update emergency contact:",
          await response.text(),
        );
        toast.error("Failed to update emergency contact");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error("Error updating contact");
    }
  };

  const notifyAdd = () => toast("Succesfully added emergency contact!");
  const notifyDel = () => toast("Succesfully removed emergency contact!");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start w-full pl-6 pt-6 h-full">
      <h1 className="text-6xl font-bold mb-8">Emergency Contacts</h1>
      <Button onPress={onOpen} className="mb-6 bg-base text-white">
        Add Emergency Contact
      </Button>
      <div className="w-full grid grid-cols-1 gap-4">
        {contacts.map((contact) => (
          <InformationCard
            key={contact.id}
            type="emergency_contact"
            data={contact}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
        {contacts.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No emergency contacts added yet.
          </div>
        )}
      </div>
      <ToastContainer />
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
              <ModalHeader>Add Emergency Contact</ModalHeader>
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
                        type="email"
                        label="Email"
                        placeholder="Enter email address"
                        isRequired
                        labelPlacement="outside"
                        {...register("email")}
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                      />

                      <Input
                        type="tel"
                        label="Phone"
                        placeholder="Enter phone number (e.g., 123-456-7890)"
                        isRequired
                        labelPlacement="outside"
                        {...register("phone")}
                        isInvalid={!!errors.phone}
                        errorMessage={errors.phone?.message}
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
    </div>
  );
};

export default EmergencyContactPage;
