import React, { useEffect, useState } from "react";
import {
  Button,
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
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { useAuth } from "../AuthContext";
import { getUserData } from "../lib/Services";
import InformationCard from "../components/InformationCard";

const Caregivers: React.FC = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTab, setSelectedTab] = useState(1);
  const { currentUser } = useAuth();

  const handleNext = (onClose: () => void) => {
    if (selectedTab < 3) {
      setSelectedTab(selectedTab + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (selectedTab > 1) {
      setSelectedTab(selectedTab - 1);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        try {
          const response = await getUserData(token);
          const data = JSON.parse(await response.text());
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-start w-full pl-6 pt-6 h-full">
      <h1 className="text-6xl font-bold mb-8">Caregivers</h1>
      <Button onPress={onOpen} className="mb-6 bg-base text-white">
        Add Caregiver
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        placement="center"
        size={"5xl"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Caregiver Information
                <Tabs
                  aria-label="Options"
                  destroyInactiveTabPanel={false}
                  variant="bordered"
                  className="w-full"
                  selectedKey={`caregiverForm${selectedTab}`}
                  onSelectionChange={(key) =>
                    setSelectedTab(
                      parseInt(
                        (key as string).replace("caregiverForm", ""),
                        10,
                      ),
                    )
                  }
                  fullWidth={true}
                >
                  <Tab key="caregiverForm1" title="Primary Caregiver"></Tab>
                  <Tab key="caregiverForm2" title="Alternate Caregiver"></Tab>
                  <Tab
                    key="caregiverForm3"
                    title="Pet Sitters & Boarding"
                  ></Tab>
                </Tabs>
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col">
                  {selectedTab === 1 && (
                    <Card shadow="none">
                      <CardBody className="flex flex-col gap-4">
                        <RadioGroup
                          label="Primary Caregiver Agreement"
                          orientation="horizontal"
                        >
                          <Radio value="yes">Yes</Radio>
                          <Radio value="no">No</Radio>
                        </RadioGroup>

                        <RadioGroup
                          label="This caregiver will provide"
                          orientation="vertical"
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
                        />
                        <div className="flex flex-row gap-2">
                          <Input
                            type="text"
                            label="City"
                            placeholder="Enter city"
                            isRequired
                            labelPlacement="outside"
                          />
                          <Input
                            type="text"
                            label="State"
                            placeholder="Enter state"
                            isRequired
                            labelPlacement="outside"
                          />
                          <Input
                            type="text"
                            label="Zip"
                            placeholder="Enter zip code"
                            isRequired
                            labelPlacement="outside"
                          />
                        </div>
                        <Input
                          type="tel"
                          label="Home Phone"
                          placeholder="Enter home phone number"
                          isRequired
                          labelPlacement="outside"
                        />
                        <Input
                          type="tel"
                          label="Cell Phone"
                          placeholder="Enter cell phone number"
                          isRequired
                          labelPlacement="outside"
                        />
                        <Input
                          type="email"
                          label="Email"
                          placeholder="Enter email address"
                          isRequired
                          labelPlacement="outside"
                        />
                      </CardBody>
                    </Card>
                  )}

                  {selectedTab === 2 && (
                    <Card shadow="none">
                      <CardBody className="flex flex-col gap-4">
                        <RadioGroup
                          label="Alternate Caregiver Agreement"
                          orientation="horizontal"
                        >
                          <Radio value="yes">Yes</Radio>
                          <Radio value="no">No</Radio>
                        </RadioGroup>

                        <RadioGroup
                          label="This caregiver will provide"
                          orientation="vertical"
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
                        />
                        <div className="flex flex-row gap-2">
                          <Input
                            type="text"
                            label="City"
                            placeholder="Enter city"
                            isRequired
                            labelPlacement="outside"
                          />
                          <Input
                            type="text"
                            label="State"
                            placeholder="Enter state"
                            isRequired
                            labelPlacement="outside"
                          />
                          <Input
                            type="text"
                            label="Zip"
                            placeholder="Enter zip code"
                            isRequired
                            labelPlacement="outside"
                          />
                        </div>
                        <Input
                          type="tel"
                          label="Home Phone"
                          placeholder="Enter home phone number"
                          isRequired
                          labelPlacement="outside"
                        />
                        <Input
                          type="tel"
                          label="Cell Phone"
                          placeholder="Enter cell phone number"
                          isRequired
                          labelPlacement="outside"
                        />
                        <Input
                          type="email"
                          label="Email"
                          placeholder="Enter email address"
                          isRequired
                          labelPlacement="outside"
                        />
                      </CardBody>
                    </Card>
                  )}

                  {selectedTab === 3 && (
                    <Card shadow="none">
                      <CardBody className="flex flex-col gap-4">
                        <Input
                          label="Contact"
                          placeholder="Enter contact name"
                          isRequired
                          labelPlacement="outside"
                        />
                        <Input
                          label="Average Daily Charge (or costs)"
                          placeholder="Enter average daily charge"
                          isRequired
                          labelPlacement="outside"
                        />
                        <Input
                          label="Address"
                          placeholder="Enter address"
                          isRequired
                          labelPlacement="outside"
                        />
                        <div className="flex flex-row gap-2">
                          <Input
                            type="text"
                            label="City"
                            placeholder="Enter city"
                            isRequired
                            labelPlacement="outside"
                          />
                          <Input
                            type="text"
                            label="State"
                            placeholder="Enter state"
                            isRequired
                            labelPlacement="outside"
                          />
                          <Input
                            type="text"
                            label="Zip"
                            placeholder="Enter zip code"
                            isRequired
                            labelPlacement="outside"
                          />
                        </div>
                        <Input
                          type="tel"
                          label="Home Phone"
                          placeholder="Enter home phone number"
                          isRequired
                          labelPlacement="outside"
                        />
                        <Input
                          type="tel"
                          label="Cell Phone"
                          placeholder="Enter cell phone number"
                          isRequired
                          labelPlacement="outside"
                        />
                        <Input
                          type="email"
                          label="Email"
                          placeholder="Enter email address"
                          isRequired
                          labelPlacement="outside"
                        />
                      </CardBody>
                    </Card>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={handlePrevious}
                  isDisabled={selectedTab === 1}
                >
                  Previous
                </Button>
                <Button color="primary" onPress={() => handleNext(onClose)}>
                  {selectedTab === 3 ? "Finish" : "Next"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="w-full mt-6">
        {/* First Pet */}
        <InformationCard
          purpose="caregiver"
          imageSrc="https://via.placeholder.com/64"
          name="Alina Antonelli"
          phone="123-456-7890"
          relation="primary"
          email="randomperson@gmail.com"
        />
        {/* Second Pet */}
        <InformationCard
          purpose="caregiver"
          imageSrc="https://via.placeholder.com/64"
          name="Alina Antonelli"
          phone="123-456-7890"
          relation="primary"
          email="randomperson@gmail.com"
        />
        {/* Third Pet */}
        <InformationCard
          purpose="caregiver"
          imageSrc="https://via.placeholder.com/64"
          name="Alina Antonelli"
          phone="123-456-7890"
          relation="primary"
          email="randomperson@gmail.com"
        />
      </div>
    </div>
  );
};

export default Caregivers;
