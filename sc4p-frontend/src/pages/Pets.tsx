import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { getPets } from "../lib/Services";
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
  DateInput,
  Select,
  SelectItem,
  Textarea,
  SharedSelection,
  Spinner,
} from "@nextui-org/react";
import InformationCard from "../components/InformationCard";
import { CalendarDate } from "@internationalized/date";
import { Pet } from "../types/pet";

const Pets: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser, userData } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = React.useState("petsForm1");
  const [selectedCommands, setSelectedCommands] = useState<string[]>([]);
  const [hasAdditionalInstructions, setHasAdditionalInstructions] =
    useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);

  const fetchPets = async () => {
    if (!currentUser?.email || !userData?.id) return;

    const token = await currentUser.getIdToken();
    try {
      const response = await getPets(token, userData.id);
      const data = await response.json();
      setPets(data || []);
    } catch (error) {
      console.error("Error fetching pets:", error);
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser && userData) {
      fetchPets();
    }
  }, [currentUser, userData]);

  const handleCommandSelection = (keys: SharedSelection) => {
    const selectedValues = Array.from(keys) as string[];
    setSelectedCommands(selectedValues);
    setShowOtherInput(selectedValues.includes("other"));
  };
  const [selectedTab, setSelectedTab] = useState(1);

  const handleNext = (onClose: () => void) => {
    if (selectedTab < 7) {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start w-full pl-6 pt-6 h-full">
      <h1 className="text-6xl font-bold mb-8">Pets</h1>
      <Button onPress={onOpen} className="mb-6 bg-base text-white">
        Add Pet
      </Button>
      <div className="w-full grid grid-cols-1 gap-4">
        {pets.map((pet) => (
          <InformationCard
            key={pet.id}
            type="pet"
            data={pet}
            onUpdate={async (id, updatedData) => {
              // TODO: Implement pet update logic
              console.log("Updating pet:", id, updatedData);
            }}
            onDelete={async (id) => {
              // TODO: Implement pet delete logic
              console.log("Deleting pet:", id);
            }}
          />
        ))}
      </div>
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
                Add a new Pet
                <Tabs
                  aria-label="Options"
                  destroyInactiveTabPanel={false}
                  variant="bordered"
                  className="w-full"
                  selectedKey={`petsForm${selectedTab}`}
                  onSelectionChange={(key) =>
                    setSelectedTab(
                      parseInt((key as string).replace("petsForm", ""), 10),
                    )
                  }
                  fullWidth={true}
                >
                  <Tab key="petsForm1" title="Information"></Tab>
                  <Tab key="petsForm2" title="Identification"></Tab>
                  <Tab key="petsForm3" title="Health"></Tab>
                  <Tab key="petsForm4" title="Behavior"></Tab>
                  <Tab key="petsForm5" title="Routine"></Tab>
                  <Tab key="petsForm6" title="Diet"></Tab>
                  <Tab key="petsForm7" title="Additional Information"></Tab>
                </Tabs>
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col">
                  {selectedTab === 1 && (
                    <Card shadow="none">
                      <CardBody className="flex flex-col gap-4">
                        <Input
                          type="text"
                          label="Pet's Name"
                          placeholder="Enter your pet's name"
                          isRequired
                          labelPlacement="outside"
                        />
                        <div className="flex w-full flex-row justify-between">
                          <RadioGroup label="Sex" orientation="horizontal">
                            <Radio value="M">Male</Radio>
                            <Radio value="F">Female</Radio>
                          </RadioGroup>
                          <DateInput
                            label="Date of Birth"
                            isRequired
                            placeholderValue={new CalendarDate(1995, 11, 6)}
                            labelPlacement="outside"
                            className="max-w-xs"
                          />
                        </div>
                        <div className="flex flex-row justify-between">
                          <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                            <Select
                              labelPlacement="outside"
                              label="Pet Type"
                              placeholder="Select an animal"
                              className="max-w-xs"
                            >
                              <SelectItem key="indoor">Indoor</SelectItem>
                              <SelectItem key="outdoor">Outdoor</SelectItem>
                              <SelectItem key="cat">Cat</SelectItem>
                              <SelectItem key="dog">Dog</SelectItem>
                              <SelectItem key="bird">Bird</SelectItem>
                              <SelectItem key="horse">Horse</SelectItem>
                              <SelectItem key="other">Other</SelectItem>
                            </Select>
                          </div>
                          <Input
                            type="text"
                            label="Specify animal type"
                            placeholder="E.G. Golden Retriever"
                            isRequired
                            labelPlacement="outside"
                          />
                        </div>
                      </CardBody>
                    </Card>
                  )}
                  {selectedTab === 2 && (
                    <Card shadow="none">
                      <CardBody className="flex flex-col gap-4">
                        <div className="flex flex-row justify-between gap-2">
                          <Input
                            type="text"
                            label="Microchip ID (Brand)"
                            placeholder="Enter microchip brand"
                            isRequired
                            labelPlacement="outside"
                          />
                          <Input
                            type="text"
                            label="ID Number"
                            placeholder="Enter ID number"
                            isRequired
                            labelPlacement="outside"
                          />
                        </div>

                        <div className="flex flex-row justify-between gap-2">
                          <Input
                            type="text"
                            label="License/Tag Number"
                            placeholder="Enter license/tag number"
                            isRequired
                            labelPlacement="outside"
                          />
                          <Input
                            type="text"
                            label="City/County Tag Number"
                            placeholder="Enter city/county tag number"
                            isRequired
                            labelPlacement="outside"
                          />
                        </div>

                        <Textarea
                          label="Identification Marks"
                          placeholder="Describe any identification marks"
                          isRequired
                          labelPlacement="outside"
                        />
                      </CardBody>
                    </Card>
                  )}
                  {selectedTab === 3 && (
                    <Card shadow="none">
                      <CardBody className="flex flex-col gap-4">
                        <Textarea
                          label="Medical History"
                          placeholder="Enter any specific information relative to the pet's health history"
                          isRequired
                          labelPlacement="outside"
                        />

                        <Textarea
                          label="Special Needs"
                          placeholder="Enter any special needs your pet has (such as a permanent medical condition or special exercise routine)"
                          isRequired
                          labelPlacement="outside"
                        />

                        <Input
                          type="text"
                          label="Type of flea/heartworm preventative and when administered"
                          placeholder="E.g., Flea medication every 3 months"
                          isRequired
                          labelPlacement="outside"
                        />

                        <Textarea
                          label="Allergies (foods, medications, fleas, flea control products, etc.)"
                          placeholder="Enter any allergies your pet has"
                          isRequired
                          labelPlacement="outside"
                        />

                        <Input
                          type="text"
                          label="Where is your pet's medical history located?"
                          placeholder="Enter the location of your pet's medical history"
                          isRequired
                          labelPlacement="outside"
                        />

                        <Textarea
                          label="List any medications and/or supplements (indicate dosage and frequency)"
                          placeholder="Enter medications and supplements details"
                          isRequired
                          labelPlacement="outside"
                        />

                        <RadioGroup
                          label="Do you maintain additional instructions for this pet?"
                          orientation="horizontal"
                          onChange={(event) =>
                            setHasAdditionalInstructions(
                              event.target.value === "yes",
                            )
                          }
                          isRequired
                        >
                          <Radio value="yes">Yes</Radio>
                          <Radio value="no">No</Radio>
                        </RadioGroup>

                        {hasAdditionalInstructions && (
                          <Input
                            type="text"
                            label="If yes, where?"
                            placeholder="Enter where additional instructions are maintained"
                            isRequired
                            labelPlacement="outside"
                          />
                        )}
                      </CardBody>
                    </Card>
                  )}
                  {selectedTab === 4 && (
                    <Card shadow="none">
                      <CardBody className="flex flex-col gap-4">
                        <div className="flex items-start gap-2">
                          <Textarea
                            label="Behavioral Habits"
                            placeholder="Enter details about your pet's behavior (e.g., protective, fear of loud noises)"
                            labelPlacement="outside"
                            isRequired
                          />
                        </div>

                        <div className="flex flex-col gap-4">
                          <Select
                            label="Commands your pet responds to"
                            labelPlacement="outside"
                            placeholder="Select all that apply"
                            selectionMode="multiple"
                            onSelectionChange={(keys) =>
                              handleCommandSelection(keys)
                            }
                          >
                            <SelectItem key="come">Come</SelectItem>
                            <SelectItem key="sit">Sit</SelectItem>
                            <SelectItem key="stay">Stay</SelectItem>
                            <SelectItem key="down">Down</SelectItem>
                            <SelectItem key="other">Other</SelectItem>
                          </Select>

                          {showOtherInput && (
                            <Input
                              type="text"
                              label="Other command"
                              placeholder="Enter other commands"
                              labelPlacement="outside"
                              isRequired
                            />
                          )}
                        </div>

                        <Textarea
                          label="Unique Obedience Language"
                          placeholder="Describe any unique obedience language used with your pet"
                          labelPlacement="outside"
                          isRequired
                        />
                      </CardBody>
                    </Card>
                  )}
                  {selectedTab === 5 && (
                    <Card shadow="none">
                      <CardBody className="flex flex-col gap-4">
                        <div className="flex flex-row justify-between">
                          <RadioGroup
                            label="Is your pet allowed outside?"
                            orientation="horizontal"
                            isRequired
                          >
                            <Radio value="yes">Yes</Radio>
                            <Radio value="no">No</Radio>
                          </RadioGroup>
                          <RadioGroup
                            label="Does your pet like children?"
                            orientation="horizontal"
                            isRequired
                          >
                            <Radio value="yes">Yes</Radio>
                            <Radio value="no">No</Radio>
                            <Radio value="not-enough-info">
                              Not enough information
                            </Radio>
                          </RadioGroup>
                        </div>

                        <Input
                          type="text"
                          label="Where does your pet sleep?"
                          placeholder="Enter where your pet sleeps"
                          isRequired
                          labelPlacement="outside"
                        />

                        <Input
                          type="text"
                          label="What access does your pet have to your home and furniture?"
                          placeholder="Describe your pet's access"
                          isRequired
                          labelPlacement="outside"
                        />

                        <Textarea
                          label="Please outline your pet's daily routine (walking, eating, sleeping, playing, eliminating)"
                          placeholder="Describe your pet's daily routine"
                          isRequired
                          labelPlacement="outside"
                        />

                        <Textarea
                          label="If your pet has any favorite games, toys or possessions, please note where they are located."
                          placeholder="List your pet's favorite items and their locations"
                          isRequired
                          labelPlacement="outside"
                        />
                      </CardBody>
                    </Card>
                  )}
                  {selectedTab === 6 && (
                    <Card shadow="none">
                      <CardBody className="flex flex-col gap-4">
                        <Input
                          type="text"
                          label="What brand of food do you feed this pet?"
                          placeholder="Enter the brand of food"
                          isRequired
                          labelPlacement="outside"
                        />

                        <Input
                          type="text"
                          label="Approximately how much food per day? (for example: 3 cups/day)"
                          placeholder="Enter the daily amount of food"
                          isRequired
                          labelPlacement="outside"
                        />

                        <Textarea
                          label="When are the typical feeding times and amounts?"
                          placeholder="Describe typical feeding times and portions"
                          isRequired
                          labelPlacement="outside"
                        />

                        <Textarea
                          label="Special diet requirements?"
                          placeholder="Enter any special diet requirements"
                          isRequired
                          labelPlacement="outside"
                        />
                      </CardBody>
                    </Card>
                  )}
                  {selectedTab === 7 && (
                    <Card shadow="none">
                      <CardBody className="flex flex-col gap-4">
                        <Textarea
                          label="Emergency supplies for my pet"
                          placeholder="Describe the location of emergency supplies (location of leashes, harnesses, food, bowls, medicine, vet records)"
                          isRequired
                          labelPlacement="outside"
                        />

                        <Textarea
                          label="Any other observations?"
                          placeholder="Enter any additional notes or observations"
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
                  {selectedTab === 7 ? "Finish Registration" : "Next"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="w-full mt-6">{/* Remove old hardcoded cards */}</div>
    </div>
  );
};

export default Pets;
