import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@nextui-org/react";
import { useAuth } from "../AuthContext";
import { CreateCaregiver, Caregiver } from "~/types/caregiver";
import { BoardingFac, CreateBoardingFac } from "~/types/boardingFac";
import {
  getCaregivers,
  createCaregiver,
  deleteCaregiver,
  getBoardingFacilities,
  deleteBoardingFacility,
} from "../lib/Services";

const caregiverSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  primary: yup
    .string()
    .transform((value) => value === "true")
    .required("Caregiver agreement is required"),
  accepted: yup
    .string()
    .transform((value) => value === "true")
    .required("Acceptance is required"),
  care_type: yup
    .string()
    .oneOf(["short-term", "long-term", "both"], "Must select a valid care type")
    .required("Care type is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup
    .string()
    .required("State is required")
    .matches(/^[A-Z]{2}$/, "State must be a 2-letter code (e.g., CA)"),
  zip: yup
    .string()
    .required("ZIP code is required")
    .matches(/^[0-9]{5}(-[0-9]{4})?$/, "Must be a valid ZIP code"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      "Phone number must be a valid US phone number",
    ),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
});

const Caregivers = () => {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, userData } = useAuth();

  const {
    isOpen: isCaregiverOpen,
    onOpen: onCaregiverOpen,
    onOpenChange: onCaregiverOpenChange,
  } = useDisclosure();

  const {
    isOpen: isBoardingOpen,
    onOpen: onBoardingOpen,
    onOpenChange: onBoardingOpenChange,
  } = useDisclosure();

  const {
    register: registerBoardingFac,
    handleSubmit: handleSubmitBoardingFac,
    reset: resetBoardingFac,
    formState: { errors: boardingFacErrors },
  } = useForm<CreateBoardingFac>();

  const {
    register: registerCaregiver,
    handleSubmit: handleSubmitCaregiver,
    reset: resetCaregiver,
    formState: { errors: caregiverErrors, isSubmitting },
  } = useForm<CreateCaregiver>({
    resolver: yupResolver(caregiverSchema),
    mode: "onBlur",
  });

  const [boardingFacilities, setBoardingFacilities] = useState<BoardingFac[]>(
    [],
  );

  const fetchCaregivers = async () => {
    if (!currentUser?.email || !userData?.id) return;

    const token = await currentUser.getIdToken();
    try {
      const response = await getCaregivers(token, userData.id);
      const data = await response.json();
      setCaregivers(data || []);
    } catch (error) {
      console.error("Error fetching caregivers:", error);
      setCaregivers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBoardingFacilities = async () => {
    if (!currentUser?.email || !userData?.id) return;

    const token = await currentUser.getIdToken();
    try {
      const response = await getBoardingFacilities(token, userData.id);
      const data = await response.json();
      setBoardingFacilities(data || []);
    } catch (error) {
      console.error("Error fetching boarding facilities:", error);
      setBoardingFacilities([]);
    }
  };

  useEffect(() => {
    if (currentUser && userData) {
      fetchCaregivers();
      fetchBoardingFacilities();
    }
  }, [currentUser, userData]);

  const onSubmitCaregiver = async (
    data: CreateCaregiver,
    onClose: () => void,
  ) => {
    try {
      if (!currentUser?.email || !userData?.id) return;

      const token = await currentUser.getIdToken();
      const response = await createCaregiver(token, {
        ...data,
        owner_id: userData.id,
        primary: data.primary === "true",
        accepted: data.accepted === "true",
      });

      if (response.ok) {
        await fetchCaregivers();
        resetCaregiver();
        onClose();
      } else {
        console.error("Failed to create caregiver:", await response.text());
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (caregiverId: number) => {
    if (!currentUser) return;

    const token = await currentUser.getIdToken();
    try {
      await deleteCaregiver(token, caregiverId);
      setCaregivers((prevCaregivers) =>
        prevCaregivers.filter((caregiver) => caregiver.id !== caregiverId),
      );
    } catch (error) {
      console.error("Error deleting caregiver:", error);
    }
  };

  const handleDeleteFacility = async (facilityId: number) => {
    if (!currentUser) return;

    const token = await currentUser.getIdToken();
    try {
      await deleteBoardingFacility(token, facilityId);
      setBoardingFacilities((prevFacilities) =>
        prevFacilities.filter((facility) => facility.id !== facilityId),
      );
    } catch (error) {
      console.error("Error deleting boarding facility:", error);
    }
  };

  return (
    <div className="flex flex-col items-start w-full pl-6 pt-6 h-full">
      <h1 className="text-6xl font-bold mb-8">Caregivers</h1>
      <ButtonGroup>
        <Button onPress={onCaregiverOpen} className="mb-6 bg-base text-white">
          Add Caregiver
        </Button>
        <Button onPress={onBoardingOpen} className="mb-6 bg-base text-white">
          Add Boarding Facility
        </Button>
      </ButtonGroup>

      <Modal
        isOpen={isCaregiverOpen}
        onOpenChange={onCaregiverOpenChange}
        scrollBehavior="inside"
        placement="center"
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Caregiver
              </ModalHeader>
              <form
                onSubmit={handleSubmitCaregiver((data) =>
                  onSubmitCaregiver(data, onClose),
                )}
              >
                <ModalBody>
                  <Card shadow="none">
                    <CardBody className="flex flex-col gap-4">
                      <Input
                        label="Name"
                        placeholder="Enter name"
                        isRequired
                        labelPlacement="outside"
                        {...registerCaregiver("name")}
                        isInvalid={!!caregiverErrors.name}
                        errorMessage={caregiverErrors.name?.message}
                      />
                      <RadioGroup
                        label="Caregiver Agreement"
                        orientation="horizontal"
                        isRequired
                        {...registerCaregiver("primary")}
                        errorMessage={caregiverErrors.primary?.message}
                      >
                        <Radio value="true">Yes</Radio>
                        <Radio value="false">No</Radio>
                      </RadioGroup>
                      <RadioGroup
                        label="Acceptance"
                        orientation="horizontal"
                        isRequired
                        {...registerCaregiver("accepted")}
                        errorMessage={caregiverErrors.accepted?.message}
                      >
                        <Radio value="true">Yes</Radio>
                        <Radio value="false">No</Radio>
                      </RadioGroup>
                      <RadioGroup
                        label="This caregiver will provide"
                        orientation="vertical"
                        isRequired
                        {...registerCaregiver("care_type")}
                        errorMessage={caregiverErrors.care_type?.message}
                      >
                        <Radio value="short-term">Short-term care</Radio>
                        <Radio value="long-term">Long-term care</Radio>
                        <Radio value="both">Both</Radio>
                      </RadioGroup>
                      <Input
                        label="Address"
                        placeholder="Enter address"
                        isRequired
                        labelPlacement="outside"
                        {...registerCaregiver("address")}
                        isInvalid={!!caregiverErrors.address}
                        errorMessage={caregiverErrors.address?.message}
                      />
                      <div className="flex flex-row gap-2">
                        <Input
                          label="City"
                          placeholder="Enter city"
                          isRequired
                          labelPlacement="outside"
                          {...registerCaregiver("city")}
                          isInvalid={!!caregiverErrors.city}
                          errorMessage={caregiverErrors.city?.message}
                        />
                        <Input
                          label="State"
                          placeholder="Enter state"
                          isRequired
                          labelPlacement="outside"
                          {...registerCaregiver("state")}
                          isInvalid={!!caregiverErrors.state}
                          errorMessage={caregiverErrors.state?.message}
                        />
                        <Input
                          label="Zip"
                          placeholder="Enter zip code"
                          isRequired
                          labelPlacement="outside"
                          {...registerCaregiver("zip")}
                          isInvalid={!!caregiverErrors.zip}
                          errorMessage={caregiverErrors.zip?.message}
                        />
                      </div>
                      <Input
                        type="tel"
                        label="Phone"
                        placeholder="Enter phone number"
                        isRequired
                        labelPlacement="outside"
                        {...registerCaregiver("phone")}
                        isInvalid={!!caregiverErrors.phone}
                        errorMessage={caregiverErrors.phone?.message}
                      />
                      <Input
                        type="email"
                        label="Email"
                        placeholder="Enter email address"
                        isRequired
                        labelPlacement="outside"
                        {...registerCaregiver("email")}
                        isInvalid={!!caregiverErrors.email}
                        errorMessage={caregiverErrors.email?.message}
                      />
                    </CardBody>
                  </Card>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Add Caregiver
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isBoardingOpen}
        onOpenChange={onBoardingOpenChange}
        scrollBehavior="inside"
        placement="center"
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Boarding Facility Information
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col">
                  <Card shadow="none">
                    <CardBody className="flex flex-col gap-4">
                      <Input
                        label="Contact"
                        placeholder="Enter contact name"
                        isRequired
                        labelPlacement="outside"
                        {...registerBoardingFac("contact_name")}
                      />
                      <Input
                        label="Average Daily Charge"
                        placeholder="Enter average daily charge"
                        type="number"
                        isRequired
                        labelPlacement="outside"
                        {...registerBoardingFac("daily_charge")}
                      />
                      <Input
                        label="Address"
                        placeholder="Enter address"
                        isRequired
                        labelPlacement="outside"
                        {...registerBoardingFac("address")}
                      />
                      <div className="flex flex-row gap-2">
                        <Input
                          label="City"
                          placeholder="Enter city"
                          isRequired
                          labelPlacement="outside"
                          {...registerBoardingFac("city")}
                        />
                        <Input
                          label="State"
                          placeholder="Enter state"
                          isRequired
                          labelPlacement="outside"
                          {...registerBoardingFac("state")}
                        />
                        <Input
                          label="Zip"
                          placeholder="Enter zip code"
                          isRequired
                          labelPlacement="outside"
                          {...registerBoardingFac("zip")}
                        />
                      </div>
                      <Input
                        type="tel"
                        label="Home Phone"
                        placeholder="Enter home phone number"
                        labelPlacement="outside"
                        {...registerBoardingFac("home_phone")}
                      />
                      <Input
                        type="tel"
                        label="Cell Phone"
                        placeholder="Enter cell phone number"
                        isRequired
                        labelPlacement="outside"
                        {...registerBoardingFac("cell_phone")}
                      />
                      <Input
                        type="email"
                        label="Email"
                        placeholder="Enter email address"
                        labelPlacement="outside"
                        {...registerBoardingFac("email")}
                      />
                    </CardBody>
                  </Card>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() =>
                    handleSubmitBoardingFac((data) => {
                      console.log(data);
                      onClose();
                    })()
                  }
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="w-full mt-6 space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Caregivers</h2>
          <div className="grid gap-4">
            {caregivers.map((caregiver) => (
              <div
                key={caregiver.id}
                className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold">{caregiver.name}</h3>
                  <div className="text-sm text-gray-600">
                    <p>Phone: {caregiver.phone}</p>
                    <p>Email: {caregiver.email}</p>
                    <p>Care Type: {caregiver.care_type}</p>
                    <p>Role: {caregiver.primary ? "Primary" : "Secondary"}</p>
                    <p>Accepted: {caregiver.accepted ? "Yes" : "No"}</p>
                    <p className="text-xs text-gray-500">
                      {caregiver.address}, {caregiver.city}, {caregiver.state}{" "}
                      {caregiver.zip}
                    </p>
                  </div>
                </div>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => handleDelete(caregiver.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
            {caregivers.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No caregivers added yet.
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Boarding Facilities</h2>
          <div className="grid gap-4">
            {boardingFacilities.map((facility) => (
              <div
                key={facility.id}
                className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold">
                    {facility.contact_name}
                  </h3>
                  <div className="text-sm text-gray-600">
                    <p>Daily Charge: ${facility.daily_charge}</p>
                    <p>Cell Phone: {facility.cell_phone}</p>
                    {facility.home_phone && (
                      <p>Home Phone: {facility.home_phone}</p>
                    )}
                    {facility.email && <p>Email: {facility.email}</p>}
                    <p className="text-xs text-gray-500">
                      {facility.address}, {facility.city}, {facility.state}{" "}
                      {facility.zip}
                    </p>
                  </div>
                </div>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => handleDeleteFacility(facility.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
            {boardingFacilities.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No boarding facilities added yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Caregivers;
