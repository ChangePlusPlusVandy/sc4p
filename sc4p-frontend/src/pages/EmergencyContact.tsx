import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { getUserData } from "../lib/Services";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Tabs,
  Tab,
  Card,
  CardBody,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import InformationCard from "../components/InformationCard";

const EmergencyContact: React.FC = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTab, setSelectedTab] = useState(1);

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
      <h1 className="text-6xl font-bold mb-8">Emergency Contacts</h1>
      <Button onPress={onOpen} className="mb-6 bg-base text-white">
        Add Emergency Contact
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        placement="center"
        size={"3xl"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Emergency Contact
                <Tabs
                  aria-label="Options"
                  destroyInactiveTabPanel={false}
                  variant="bordered"
                  className="w-full"
                  selectedKey={`contactForm${selectedTab}`}
                  onSelectionChange={(key) =>
                    setSelectedTab(
                      parseInt((key as string).replace("contactForm", ""), 10),
                    )
                  }
                  fullWidth={true}
                >
                  <Tab key="contactForm1" title="Personal Information" />
                  <Tab key="contactForm2" title="Contact Details" />
                  <Tab key="contactForm3" title="Additional Information" />
                </Tabs>
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col">
                  {selectedTab === 1 && (
                    <Card shadow="none">
                      <CardBody className="flex flex-col gap-4">
                        <Input
                          type="text"
                          label="Full Name"
                          placeholder="Enter contact's full name"
                          isRequired
                          labelPlacement="outside"
                        />
                        <Input
                          type="text"
                          label="Relationship"
                          placeholder="Enter relationship (e.g., Sibling, Friend)"
                          isRequired
                          labelPlacement="outside"
                        />
                        <Select
                          label="Priority Level"
                          placeholder="Select priority level"
                          labelPlacement="outside"
                          isRequired
                        >
                          <SelectItem key="primary">Primary Contact</SelectItem>
                          <SelectItem key="secondary">
                            Secondary Contact
                          </SelectItem>
                          <SelectItem key="tertiary">
                            Tertiary Contact
                          </SelectItem>
                        </Select>
                      </CardBody>
                    </Card>
                  )}
                  {selectedTab === 2 && (
                    <Card shadow="none">
                      <CardBody className="flex flex-col gap-4">
                        <Input
                          type="tel"
                          label="Primary Phone"
                          placeholder="Enter primary phone number"
                          isRequired
                          labelPlacement="outside"
                        />
                        <Input
                          type="tel"
                          label="Secondary Phone"
                          placeholder="Enter secondary phone number"
                          labelPlacement="outside"
                        />
                        <Input
                          type="email"
                          label="Email"
                          placeholder="Enter email address"
                          isRequired
                          labelPlacement="outside"
                        />
                        <Textarea
                          label="Address"
                          placeholder="Enter full address"
                          isRequired
                          labelPlacement="outside"
                        />
                      </CardBody>
                    </Card>
                  )}
                  {selectedTab === 3 && (
                    <Card shadow="none">
                      <CardBody className="flex flex-col gap-4">
                        <RadioGroup
                          label="Has house key?"
                          orientation="horizontal"
                          isRequired
                        >
                          <Radio value="yes">Yes</Radio>
                          <Radio value="no">No</Radio>
                        </RadioGroup>
                        <Textarea
                          label="Best times to contact"
                          placeholder="Enter preferred contact hours"
                          labelPlacement="outside"
                        />
                        <Textarea
                          label="Additional Notes"
                          placeholder="Enter any additional information"
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
                  {selectedTab === 3 ? "Add Contact" : "Next"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="w-full mt-6">
        {/* Example Emergency Contacts */}
        <InformationCard
          purpose="pet"
          imageSrc="https://via.placeholder.com/64"
          name="John Doe"
        />
        <InformationCard
          purpose="pet"
          imageSrc="https://via.placeholder.com/64"
          name="Jane Smith"
        />
      </div>
    </div>
  );
};

export default EmergencyContact;
