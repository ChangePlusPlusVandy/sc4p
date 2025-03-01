import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Input,
  Textarea,
  Radio,
  RadioGroup,
  Select,
  SelectSection,
  SelectItem,
} from "@nextui-org/react";

type petDataType = {
  name: string;
  id: string;
};

type InfoSection = {
  title: string;
  content: string;
  inputType?:
    | "text"
    | "textarea"
    | "dateInput"
    | "select"
    | "radiogroup-vertical"
    | "radiogroup-horizontal";
  options?: string[];
};

type FormDisplayCardProps = {
  headerTitle: string;
  petData?: petDataType;
  sections: InfoSection[][];
};

const FormDisplayCard: React.FC<FormDisplayCardProps> = ({
  petData,
  headerTitle,
  sections,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editableSections, setEditableSections] = useState(sections);

  const handleEditClick = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleChange = (
    sectionIndex: number,
    itemIndex: number,
    newValue: string,
  ) => {
    const updatedSections = editableSections.map((section, sIndex) =>
      section.map((item, iIndex) =>
        sIndex === sectionIndex && iIndex === itemIndex
          ? { ...item, content: newValue }
          : item,
      ),
    );
    setEditableSections(updatedSections);
  };

  const handleSave = () => {
    // Logic to save the updated data if needed
    setModalOpen(false);
    notifySave();
  };

  const notifySave = () => toast("Succesfully saved!");

  return (
    <>
      <Card
        shadow="md"
        radius="lg"
        fullWidth={true}
        className="p-4 border-2"
        style={{
          borderColor: "#AF94D3",
          boxShadow: "0px 4px 10px #E6D1FF",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <CardHeader className="flex justify-between items-center mb-[20px]">
          <h1 className="text-xl font-bold">{headerTitle}</h1>
          <button
            onClick={handleEditClick}
            className="rounded-full p-2"
            style={{
              backgroundColor: "#F3EAFF", // Button background color
            }}
          >
            <FiEdit2 color="#5E3593" /> {/* Icon color */}
          </button>
        </CardHeader>

        <CardBody className="flex flex-col gap-y-2 w-full">
          {editableSections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="flex flex-row justify-start w-full gap-2"
            >
              {section.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex flex-row gap-4 justify-start w-full"
                >
                  <h3 className="w-full font-bold w-max-[33%] break-words">
                    {item.title}
                  </h3>
                  <span className="w-full">{item.content || "No Entry"}</span>{" "}
                  {/* Default value */}
                </div>
              ))}
            </div>
          ))}
        </CardBody>
      </Card>
      <ToastContainer />
      <Modal isOpen={isModalOpen} onOpenChange={setModalOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {headerTitle}
              </ModalHeader>
              <ModalBody>
                {editableSections.map((section, sectionIndex) =>
                  section.map((item, itemIndex) => (
                    <div key={`${sectionIndex}-${itemIndex}`} className="mb-4">
                      <label className="block font-semibold mb-2">
                        {item.title}
                      </label>
                      {item.inputType === "textarea" ? (
                        <Textarea
                          value={item.content}
                          onChange={(e) =>
                            handleChange(
                              sectionIndex,
                              itemIndex,
                              e.target.value,
                            )
                          }
                          fullWidth
                        />
                      ) : item.inputType === "dateInput" ? (
                        <Input
                          type="date"
                          value={item.content}
                          onChange={(e) =>
                            handleChange(
                              sectionIndex,
                              itemIndex,
                              e.target.value,
                            )
                          }
                          fullWidth
                        />
                      ) : item.inputType === "select" && item.options ? (
                        <Select
                          value={item.content}
                          onChange={(value) =>
                            handleChange(
                              sectionIndex,
                              itemIndex,
                              value as unknown as string,
                            )
                          }
                          fullWidth
                        >
                          <SelectSection>
                            {item.options.map((option, index) => (
                              <SelectItem key={index} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectSection>
                        </Select>
                      ) : item.inputType === "radiogroup-vertical" &&
                        item.options ? (
                        <RadioGroup
                          value={item.content}
                          onChange={(value) =>
                            handleChange(
                              sectionIndex,
                              itemIndex,
                              value as unknown as string,
                            )
                          }
                          orientation="vertical"
                        >
                          {item.options.map((option, index) => (
                            <Radio key={index} value={option}>
                              {option}
                            </Radio>
                          ))}
                        </RadioGroup>
                      ) : item.inputType === "radiogroup-horizontal" &&
                        item.options ? (
                        <RadioGroup
                          value={item.content}
                          onChange={(value) =>
                            handleChange(
                              sectionIndex,
                              itemIndex,
                              value as unknown as string,
                            )
                          }
                          orientation="horizontal"
                        >
                          {item.options.map((option, index) => (
                            <Radio key={index} value={option}>
                              {option}
                            </Radio>
                          ))}
                        </RadioGroup>
                      ) : (
                        <Input
                          value={item.content}
                          onChange={(e) =>
                            handleChange(
                              sectionIndex,
                              itemIndex,
                              e.target.value,
                            )
                          }
                          fullWidth
                        />
                      )}
                    </div>
                  )),
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
                <Button color="primary" onClick={handleSave}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormDisplayCard;
