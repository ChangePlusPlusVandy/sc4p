import {
  Button,
  Input,
  DateInput,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useState } from "react";
export const states = [
  { key: "AL", label: "AL" },
  { key: "AK", label: "AK" },
  { key: "AZ", label: "AZ" },
  { key: "AR", label: "AR" },
  { key: "CA", label: "CA" },
  { key: "CO", label: "CO" },
  { key: "CT", label: "CT" },
  { key: "DE", label: "DE" },
  { key: "FL", label: "FL" },
  { key: "GA", label: "GA" },
  { key: "HI", label: "HI" },
  { key: "ID", label: "ID" },
  { key: "IL", label: "IL" },
  { key: "IN", label: "IN" },
  { key: "IA", label: "IA" },
  { key: "KS", label: "KS" },
  { key: "KY", label: "KY" },
  { key: "LA", label: "LA" },
  { key: "ME", label: "ME" },
  { key: "MD", label: "MD" },
  { key: "MA", label: "MA" },
  { key: "MI", label: "MI" },
  { key: "MN", label: "MN" },
  { key: "MS", label: "MS" },
  { key: "MO", label: "MO" },
  { key: "MT", label: "MT" },
  { key: "NE", label: "NE" },
  { key: "NV", label: "NV" },
  { key: "NH", label: "NH" },
  { key: "NJ", label: "NJ" },
  { key: "NM", label: "NM" },
  { key: "NY", label: "NY" },
  { key: "NC", label: "NC" },
  { key: "ND", label: "ND" },
  { key: "OH", label: "OH" },
  { key: "OK", label: "OK" },
  { key: "OR", label: "OR" },
  { key: "PA", label: "PA" },
  { key: "RI", label: "RI" },
  { key: "SC", label: "SC" },
  { key: "SD", label: "SD" },
  { key: "TN", label: "TN" },
  { key: "TX", label: "TX" },
  { key: "UT", label: "UT" },
  { key: "VT", label: "VT" },
  { key: "VA", label: "VA" },
  { key: "WA", label: "WA" },
  { key: "WV", label: "WV" },
  { key: "WI", label: "WI" },
  { key: "WY", label: "WY" },
];

const hidePlaceholders = false;

const InitialForm = () => {
  const [petSections, setPetSections] = useState([1]);
  const [totalPets, setTotalPets] = useState(1);

  const addPetSection = () => {
    setPetSections([...petSections, totalPets + 1]);
    setTotalPets(totalPets + 1);
  };

  return (
    <form className="w-full px-[100px] py-[60px] h-auto flex flex-col items-center justify-center gap-[30px]">
      <section className="ownerInfo w-full flex flex-col gap-4  ">
        <h2 className="text-3xl font-bold">Pet Owner Information</h2>
        <div className="flex flex-col w-full gap-4">
          <div className="row1 flex flex-row w-full gap-6">
            <Input
              classNames={{
                label: "font-bold",
                inputWrapper: [
                  "border-[#AF94D3]",
                  "hover:border-[#D7BEF7]",
                  "focus-within:border-[#5E3593]",
                ],
              }}
              variant="bordered"
              label="First and Last Name"
              labelPlacement="outside"
              key={"user_name"}
              placeholder={hidePlaceholders ? " " : "Your Name"}
              type="text"
            />
            <Input
              classNames={{
                label: "font-bold",
                inputWrapper: [
                  "border-[#AF94D3]",
                  "hover:border-[#D7BEF7]",
                  "focus-within:border-[#5E3593]",
                ],
              }}
              variant="bordered"
              label="Cell Phone"
              labelPlacement="outside"
              key={"user_cell_phone"}
              placeholder={hidePlaceholders ? " " : "(123) 456 7890"}
              type="text"
            />
            <Input
              classNames={{
                label: "font-bold",
                inputWrapper: [
                  "border-[#AF94D3]",
                  "hover:border-[#D7BEF7]",
                  "focus-within:border-[#5E3593]",
                ],
              }}
              variant="bordered"
              label="Email"
              labelPlacement="outside"
              key={"user_email"}
              placeholder={hidePlaceholders ? " " : "your.email@email.com"}
              type="email"
            />
          </div>
          <div className="row2 flex flex-row w-full gap-6">
            <Input
              classNames={{
                label: "font-bold",
                inputWrapper: [
                  "border-[#AF94D3]",
                  "hover:border-[#D7BEF7]",
                  "focus-within:border-[#5E3593]",
                ],
              }}
              variant="bordered"
              label="Address"
              labelPlacement="outside"
              key={"user_address"}
              placeholder={hidePlaceholders ? " " : "123 Street name"}
              type="text"
            />
            <Input
              classNames={{
                label: "font-bold",
                inputWrapper: [
                  "border-[#AF94D3]",
                  "hover:border-[#D7BEF7]",
                  "focus-within:border-[#5E3593]",
                ],
              }}
              variant="bordered"
              label="City"
              labelPlacement="outside"
              key={"user_city"}
              placeholder={hidePlaceholders ? " " : "City name"}
              type="text"
            />
          </div>
          <div className="row3 flex flex-row w-full gap-6">
            <Select
              classNames={{
                label: "font-bold",
                innerWrapper: [
                  "border-[#AF94D3]",
                  "hover:border-[#D7BEF7]",
                  "focus-within:border-[#5E3593]",
                ],
                trigger: [
                  "border-[#AF94D3]",
                  "hover:border-[#D7BEF7]",
                  "focus-within:border-[#5E3593]",
                ],
              }}
              variant="bordered"
              label="State"
              labelPlacement="outside"
              key={"user_state"}
              placeholder={hidePlaceholders ? " " : "Select your state"}
            >
              {states.map((state) => (
                <SelectItem key={state.key}>{state.label}</SelectItem>
              ))}
            </Select>
            <Input
              classNames={{
                label: "font-bold",
                inputWrapper: [
                  "border-[#AF94D3]",
                  "hover:border-[#D7BEF7]",
                  "focus-within:border-[#5E3593]",
                ],
              }}
              variant="bordered"
              label="Zip Code"
              labelPlacement="outside"
              key={"user_zip"}
              placeholder={hidePlaceholders ? " " : "12345"}
              type="text"
            />
            <Select
              classNames={{
                label: "font-bold",
                innerWrapper: [
                  "border-[#AF94D3]",
                  "hover:border-[#D7BEF7]",
                  "focus-within:border-[#5E3593]",
                ],
                trigger: [
                  "border-[#AF94D3]",
                  "hover:border-[#D7BEF7]",
                  "focus-within:border-[#5E3593]",
                ],
              }}
              variant="bordered"
              label="Care-giving Length"
              labelPlacement="outside"
              key={""}
              placeholder={hidePlaceholders ? " " : "Select"}
            >
              <SelectItem key="">Option</SelectItem>
            </Select>
          </div>
        </div>
      </section>

      <hr className="border-[#e5e7eb] h-px w-full" />

      <section className="caregiversInfo w-full flex flex-col gap-6">
        <div className="sectionTitle">
          <h2 className="text-3xl font-bold">Caregiver Information</h2>
          <p>
            Carefully select a minimum of two caregivers who agree to be
            responsible for your pets should anything happen to you. Caregivers
            are typically responsible for the day-to-day care of your pets. They
            should fully understand the obligation and requirements for this
            role. Your choice of caregivers should take into consideration the
            potential lifespan of your pets.
          </p>
        </div>

        <hr />

        <section className="primaryCaregiverInfo w-full flex flex-col gap-4">
          <div className="sectionTitle">
            <h2 className="text-lg font-bold">Primary Caregiver</h2>
            <p>
              This caregiver has agreed to care for my pets should anything
              happen to me
            </p>
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="row1 flex flex-row w-full gap-6">
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="First and Last Name"
                labelPlacement="outside"
                key={"primary_caregiver_name"}
                placeholder={hidePlaceholders ? " " : "Your Name"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Cell Phone"
                labelPlacement="outside"
                key={"primary_caregiver_cell_phone"}
                placeholder={hidePlaceholders ? " " : "(123) 456 7890"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Email"
                labelPlacement="outside"
                key={"primary_caregiver_email"}
                placeholder={hidePlaceholders ? " " : "your.email@email.com"}
                type="email"
              />
            </div>
            <div className="row2 flex flex-row w-full gap-6">
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Address"
                labelPlacement="outside"
                key={"primary_caregiver_address"}
                placeholder={hidePlaceholders ? " " : "123 Street name"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="City"
                labelPlacement="outside"
                key={"primary_caregiver_city"}
                placeholder={hidePlaceholders ? " " : "City name"}
                type="text"
              />
            </div>
            <div className="row3 flex flex-row w-full gap-6">
              <Select
                classNames={{
                  label: "font-bold",
                  innerWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                  trigger: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="State"
                labelPlacement="outside"
                key={"primary_caregiver_state"}
                placeholder={hidePlaceholders ? " " : "Select your state"}
              >
                {states.map((state) => (
                  <SelectItem key={state.key}>{state.label}</SelectItem>
                ))}
              </Select>
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Zip Code"
                labelPlacement="outside"
                key={"primary_caregiver_zip"}
                placeholder={hidePlaceholders ? " " : "12345"}
                type="text"
              />
              <Select
                classNames={{
                  label: "font-bold",
                  innerWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                  trigger: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Care-giving Length"
                labelPlacement="outside"
                key={""}
                placeholder={hidePlaceholders ? " " : "Select"}
              >
                <SelectItem key="">Option</SelectItem>
              </Select>
            </div>
          </div>
        </section>

        <hr />

        <section className="alternateCaregiverInfo w-full flex flex-col gap-4">
          <div className="sectionTitle">
            <h2 className="text-lg font-bold">Alternate Caregiver</h2>
            <p>
              This caregiver has agreed to care for my pets should anything
              happen to me
            </p>
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="row1 flex flex-row w-full gap-6">
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="First and Last Name"
                labelPlacement="outside"
                key={"alternate_caregiver_name"}
                placeholder={hidePlaceholders ? " " : "Your Name"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Cell Phone"
                labelPlacement="outside"
                key={"alternate_caregiver_cell_phone"}
                placeholder={hidePlaceholders ? " " : "(123) 456 7890"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Email"
                labelPlacement="outside"
                key={"alternate_caregiver_email"}
                placeholder={hidePlaceholders ? " " : "your.email@email.com"}
                type="email"
              />
            </div>
            <div className="row2 flex flex-row w-full gap-6">
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Address"
                labelPlacement="outside"
                key={"alternate_caregiver_address"}
                placeholder={hidePlaceholders ? " " : "123 Street name"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="City"
                labelPlacement="outside"
                key={"alternate_caregiver_city"}
                placeholder={hidePlaceholders ? " " : "City name"}
                type="text"
              />
            </div>
            <div className="row3 flex flex-row w-full gap-6">
              <Select
                classNames={{
                  label: "font-bold",
                  innerWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                  trigger: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="State"
                labelPlacement="outside"
                key={"alternate_caregiver_state"}
                placeholder={hidePlaceholders ? " " : "Select your state"}
              >
                {states.map((state) => (
                  <SelectItem key={state.key}>{state.label}</SelectItem>
                ))}
              </Select>
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Zip Code"
                labelPlacement="outside"
                key={"alternate_caregiver_zip"}
                placeholder={hidePlaceholders ? " " : "12345"}
                type="text"
              />
              <Select
                classNames={{
                  label: "font-bold",
                  innerWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                  trigger: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Care-giving Length"
                labelPlacement="outside"
                key={""}
                placeholder={hidePlaceholders ? " " : "Select"}
              >
                <SelectItem key="">Option</SelectItem>
              </Select>
            </div>
          </div>
        </section>

        <hr />

        <section className="petSittersInfo w-full flex flex-col gap-4">
          <div className="sectionTitle">
            <h2 className="text-lg font-bold">
              Pet Sitters and Boarding Facilities
            </h2>
            <p>
              Should your designated caregiver go on vacation or be temporarily
              unavailable to care for your pets, who should take care of them
            </p>
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="row1 flex flex-row w-full gap-6">
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="First and Last Name"
                labelPlacement="outside"
                key={"boarding_fac_name"}
                placeholder={hidePlaceholders ? " " : "Your Name"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Cell Phone"
                labelPlacement="outside"
                key={"boarding_fac_cell_phone"}
                placeholder={hidePlaceholders ? " " : "(123) 456 7890"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Email"
                labelPlacement="outside"
                key={"boarding_fac_email"}
                placeholder={hidePlaceholders ? " " : "your.email@email.com"}
                type="email"
              />
            </div>
            <div className="row2 flex flex-row w-full gap-6">
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Address"
                labelPlacement="outside"
                key={"boarding_fac_address"}
                placeholder={hidePlaceholders ? " " : "123 Street name"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="City"
                labelPlacement="outside"
                key={"boarding_fac_city"}
                placeholder={hidePlaceholders ? " " : "City name"}
                type="text"
              />
            </div>
            <div className="row3 flex flex-row w-full gap-6">
              <Select
                classNames={{
                  label: "font-bold",
                  innerWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                  trigger: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="State"
                labelPlacement="outside"
                key={"boarding_fac_state"}
                placeholder={hidePlaceholders ? " " : "Select your state"}
              >
                {states.map((state) => (
                  <SelectItem key={state.key}>{state.label}</SelectItem>
                ))}
              </Select>
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Zip Code"
                labelPlacement="outside"
                key={"boarding_fac_zip"}
                placeholder={hidePlaceholders ? " " : "12345"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Average Daily Charge"
                labelPlacement="outside"
                key={"boarding_fac_charge"}
                placeholder={hidePlaceholders ? " " : "USD 123.00"}
                type="text"
              />
            </div>
          </div>
        </section>
      </section>

      <hr className="border-[#e5e7eb] h-px w-full" />

      <section className="emergencyInfo w-full flex flex-col gap-6">
        <div className="sectionTitle">
          <h2 className="text-3xl font-bold">Emergency Information</h2>
          <p>
            Emergency contacts might include friends and family members who may
            not necessarily take care of your pets but would be able to assist
            in case of an emergency
          </p>
        </div>

        <hr />

        <section className="primaryCaregiverInfo w-full flex flex-col gap-4">
          <div className="sectionTitle">
            <h2 className="text-lg font-bold">Contact 1</h2>
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="row1 flex flex-row w-full gap-6">
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="First and Last Name"
                labelPlacement="outside"
                key={"emergency_contact1_name"}
                placeholder={hidePlaceholders ? " " : "Your Name"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Cell Phone"
                labelPlacement="outside"
                key={"emergency_contact1_cell_phone"}
                placeholder={hidePlaceholders ? " " : "(123) 456 7890"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Email"
                labelPlacement="outside"
                key={"emergency_contact1_email"}
                placeholder={hidePlaceholders ? " " : "your.email@email.com"}
                type="email"
              />
            </div>
            <div className="row2 flex flex-row w-full gap-6">
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Address"
                labelPlacement="outside"
                key={"emergency_contact1_address"}
                placeholder={hidePlaceholders ? " " : "123 Street name"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="City"
                labelPlacement="outside"
                key={"emergency_contact1_city"}
                placeholder={hidePlaceholders ? " " : "City name"}
                type="text"
              />
            </div>
            <div className="row3 flex flex-row w-full gap-6">
              <Select
                classNames={{
                  label: "font-bold",
                  innerWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                  trigger: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="State"
                labelPlacement="outside"
                key={"emergency_contact1_state"}
                placeholder={hidePlaceholders ? " " : "Select your state"}
              >
                {states.map((state) => (
                  <SelectItem key={state.key}>{state.label}</SelectItem>
                ))}
              </Select>
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Zip Code"
                labelPlacement="outside"
                key={"emergency_contact1_zip"}
                placeholder={hidePlaceholders ? " " : "12345"}
                type="text"
              />
            </div>
          </div>

          <hr />

          <div className="sectionTitle">
            <h2 className="text-lg font-bold">Contact 2</h2>
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="row1 flex flex-row w-full gap-6">
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="First and Last Name"
                labelPlacement="outside"
                key={"emergency_contact2_name"}
                placeholder={hidePlaceholders ? " " : "Your Name"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Cell Phone"
                labelPlacement="outside"
                key={"emergency_contact2_cell_phone"}
                placeholder={hidePlaceholders ? " " : "(123) 456 7890"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Email"
                labelPlacement="outside"
                key={"emergency_contact2_email"}
                placeholder={hidePlaceholders ? " " : "your.email@email.com"}
                type="email"
              />
            </div>
            <div className="row2 flex flex-row w-full gap-6">
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Address"
                labelPlacement="outside"
                key={"emergency_contact2_address"}
                placeholder={hidePlaceholders ? " " : "123 Street name"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="City"
                labelPlacement="outside"
                key={"emergency_contact2_city"}
                placeholder={hidePlaceholders ? " " : "City name"}
                type="text"
              />
            </div>
            <div className="row3 flex flex-row w-full gap-6">
              <Select
                classNames={{
                  label: "font-bold",
                  innerWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                  trigger: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="State"
                labelPlacement="outside"
                key={"emergency_contact2_state"}
                placeholder={hidePlaceholders ? " " : "Select your state"}
              >
                {states.map((state) => (
                  <SelectItem key={state.key}>{state.label}</SelectItem>
                ))}
              </Select>
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Zip Code"
                labelPlacement="outside"
                key={"emergency_contact2_zip"}
                placeholder={hidePlaceholders ? " " : "12345"}
                type="text"
              />
            </div>
          </div>
        </section>
      </section>

      <hr className="border-[#e5e7eb] h-px w-full" />

      <section className="veterinarianInfo w-full flex flex-col gap-6">
        <div className="sectionTitle">
          <h2 className="text-3xl font-bold">Veterinarian Information</h2>
          <p>
            In addition to listing the contact details below, please provide
            your veterinarian with copies of your care instructions. Make sure
            your veterinarian clinic knows who they should contact in case of an
            emergency
          </p>
        </div>

        <hr />

        <section className="primaryCaregiverInfo w-full flex flex-col gap-4">
          <div className="sectionTitle">
            <h2 className="text-lg font-bold">
              Primary Veterinarian or Emergency Care Facility
            </h2>
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="row1 flex flex-row w-full gap-6">
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="First and Last Name"
                labelPlacement="outside"
                key={"veterinarian_name"}
                placeholder={hidePlaceholders ? " " : "Your Name"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Cell Phone"
                labelPlacement="outside"
                key={"veterinarian_cell_phone"}
                placeholder={hidePlaceholders ? " " : "(123) 456 7890"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Emergency Phone"
                labelPlacement="outside"
                key={"veterinarian_emergency_phone"}
                placeholder={hidePlaceholders ? " " : "(123) 456 7890"}
                type="text"
              />
            </div>
            <div className="row2 flex flex-row w-full gap-6">
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Address"
                labelPlacement="outside"
                key={"veterinarian_address"}
                placeholder={hidePlaceholders ? " " : "123 Street name"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="City"
                labelPlacement="outside"
                key={"veterinarian_city"}
                placeholder={hidePlaceholders ? " " : "City name"}
                type="text"
              />
            </div>
            <div className="row3 flex flex-row w-full gap-6">
              <Select
                classNames={{
                  label: "font-bold",
                  innerWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                  trigger: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="State"
                labelPlacement="outside"
                key={"veterinarian_state"}
                placeholder={hidePlaceholders ? " " : "Select your state"}
              >
                {states.map((state) => (
                  <SelectItem key={state.key}>{state.label}</SelectItem>
                ))}
              </Select>
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Zip Code"
                labelPlacement="outside"
                key={"veterinarian_zip"}
                placeholder={hidePlaceholders ? " " : "12345"}
                type="text"
              />
            </div>
          </div>
        </section>
      </section>

      <hr className="border-[#e5e7eb] h-px w-full" />

      <section className="trustAndWill w-full flex flex-col gap-6">
        <div className="sectionTitle">
          <h2 className="text-3xl font-bold">Trust & Will Information</h2>
          <p>
            Trustees are responsible for administering the assets you have set
            aside in your fund for your pets. Trustees might provide annual
            payments to caregivers as outlined in your estate plan or trust to
            cover the expenses of caring for your pet. It is recommended by
            licensed attorneys that Trustees and caregivers not be the same
            individuals
          </p>
        </div>

        <hr />

        <section className="primaryTrusteeInfo w-full flex flex-col gap-4">
          <div className="sectionTitle">
            <h2 className="text-lg font-bold">
              Primary Trustee or Trustee Service
            </h2>
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="row2 flex flex-row w-full gap-6">
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Address"
                labelPlacement="outside"
                key={"primary_trustee_address"}
                placeholder={hidePlaceholders ? " " : "123 Street name"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="City"
                labelPlacement="outside"
                key={"primary_trustee_city"}
                placeholder={hidePlaceholders ? " " : "City name"}
                type="text"
              />
            </div>
            <div className="row3 flex flex-row w-full gap-6">
              <Select
                classNames={{
                  label: "font-bold",
                  innerWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                  trigger: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="State"
                labelPlacement="outside"
                key={"primary_trustee_state"}
                placeholder={hidePlaceholders ? " " : "Select your state"}
              >
                {states.map((state) => (
                  <SelectItem key={state.key}>{state.label}</SelectItem>
                ))}
              </Select>
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Zip Code"
                labelPlacement="outside"
                key={"primary_trustee_zip"}
                placeholder={hidePlaceholders ? " " : "12345"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Cell Phone"
                labelPlacement="outside"
                key={"primary_trustee_cell_phone"}
                placeholder={hidePlaceholders ? " " : "(123) 456 7890"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Emergency Phone"
                labelPlacement="outside"
                key={"primary_trustee_emergency_phone"}
                placeholder={hidePlaceholders ? " " : "(123) 456 7890"}
                type="text"
              />
            </div>
            <div className="row2 flex flex-row w-full gap-6">
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Money allocated per year to Trustee to provide for caregiver"
                labelPlacement="outside"
                key={"primary_trustee_allocated_amount"}
                placeholder={hidePlaceholders ? " " : "USD 1000.00"}
                type="text"
              />
            </div>
          </div>
        </section>

        <hr />

        <section className="trustFundInfo w-full flex flex-col gap-4">
          <div className="sectionTitle">
            <h2 className="text-lg font-bold">Trust Fund</h2>
            <p>
              We encourage you to work with an attorney or financial planner to
              appropriately fund your trust so that the Trustee is able to
              access the funds
            </p>
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="row2 flex flex-row w-full gap-6">
              <Textarea
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Funding plan"
                labelPlacement="outside"
                placeholder={
                  hidePlaceholders
                    ? ""
                    : "Please indicate how you plan to provide funds for the care of your pet"
                }
                key={"trust_fund_funding_plan"}
                type="text"
              />
            </div>
          </div>
        </section>

        <hr />

        <section className="remainingAssetsInfo w-full flex flex-col gap-4">
          <div className="sectionTitle">
            <h2 className="text-lg font-bold">
              Reallocation of Remaining Assets
            </h2>
            <p>
              Should my pet(s) die while under the care of a caregiver, I would
              like my remaining funds distributed to (percentages should total
              100%)
            </p>
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="row1 flex flex-row w-full gap-6">
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="2nd Chance 4 Pets"
                labelPlacement="outside"
                key={"2nd_chance_4_pets"}
                placeholder={hidePlaceholders ? " " : "e.g: 50%"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Other pet welfare organization"
                labelPlacement="outside"
                key={"other_pet_welfare_org"}
                placeholder={hidePlaceholders ? " " : "e.g: 30%"}
                type="text"
              />
            </div>
            <div className="row2 flex flex-row w-full gap-6">
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Address"
                labelPlacement="outside"
                key={"other_pet_welfare_org_address"}
                placeholder={hidePlaceholders ? " " : "123 Street name"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="City"
                labelPlacement="outside"
                key={"other_pet_welfare_org_city"}
                placeholder={hidePlaceholders ? " " : "City name"}
                type="text"
              />
            </div>
            <div className="row3 flex flex-row w-full gap-6">
              <Select
                classNames={{
                  label: "font-bold",
                  innerWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                  trigger: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="State"
                labelPlacement="outside"
                key={"other_pet_welfare_org_state"}
                placeholder={hidePlaceholders ? " " : "Select your state"}
              >
                {states.map((state) => (
                  <SelectItem key={state.key}>{state.label}</SelectItem>
                ))}
              </Select>
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Zip Code"
                labelPlacement="outside"
                key={"other_pet_welfare_org_zip"}
                placeholder={hidePlaceholders ? " " : "12345"}
                type="text"
              />
              <Input
                classNames={{
                  label: "font-bold",
                  inputWrapper: [
                    "border-[#AF94D3]",
                    "hover:border-[#D7BEF7]",
                    "focus-within:border-[#5E3593]",
                  ],
                }}
                variant="bordered"
                label="Other Beneficiary"
                labelPlacement="outside"
                key={"other_beneficiary_name"}
                placeholder={hidePlaceholders ? " " : "e.g: 20%"}
                type="text"
              />
            </div>
          </div>
        </section>
      </section>

      <hr className="border-[#e5e7eb] h-px w-full" />

      <div className=" flex flex-col gap-6 w-full">
        {petSections.map((pet, index) => (
          <section
            key={"pet_" + index}
            className="petInfo w-full flex flex-col gap-6"
          >
            <section className="mainPetInfo">
              <h2 className="text-3xl font-bold">Pet Information {pet}</h2>
              <div className="flex flex-col w-full gap-4">
                <div className="row1 flex flex-row w-full gap-6">
                  <Input
                    classNames={{
                      label: "font-bold",
                      inputWrapper: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                    }}
                    variant="bordered"
                    label="Pet's Name"
                    labelPlacement="outside"
                    key={"pet" + index + "_name"}
                    placeholder={hidePlaceholders ? " " : "Your Name"}
                    type="text"
                  />
                  <Select
                    classNames={{
                      label: "font-bold",
                      innerWrapper: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                      trigger: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                    }}
                    variant="bordered"
                    label="Sex"
                    labelPlacement="outside"
                    key={"pet" + index + "_sex"}
                    placeholder={hidePlaceholders ? " " : "Select"}
                  >
                    <SelectItem key="M">Male</SelectItem>
                    <SelectItem key="F">Female</SelectItem>
                    <SelectItem key="O">Other</SelectItem>
                  </Select>
                  <Select
                    classNames={{
                      label: "font-bold",
                      innerWrapper: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                      trigger: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                    }}
                    variant="bordered"
                    label="Spayed or Neutered"
                    labelPlacement="outside"
                    key={"pet" + index + "_spayed_neutered"}
                    placeholder={hidePlaceholders ? " " : "Select"}
                  >
                    <SelectItem key="Y">Yes</SelectItem>
                    <SelectItem key="N">No</SelectItem>
                  </Select>
                </div>
                <div className="row2 flex flex-row w-full gap-6">
                  <DateInput
                    classNames={{
                      label: "font-bold",
                      innerWrapper: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                      inputWrapper: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                    }}
                    variant="bordered"
                    label="Birth date"
                    labelPlacement="outside"
                    key={"pet" + index + "date_of_birth"}
                    placeholder={hidePlaceholders ? " " : "Birth date"}
                  />
                  <Select
                    classNames={{
                      label: "font-bold",
                      innerWrapper: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                      trigger: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                    }}
                    variant="bordered"
                    label="Type"
                    labelPlacement="outside"
                    key={"pet" + index + "_type"}
                    placeholder={hidePlaceholders ? " " : "Select"}
                  >
                    <SelectItem key="1">1</SelectItem>
                    <SelectItem key="2">2</SelectItem>
                  </Select>
                </div>
              </div>
            </section>
            <hr />
            <section className="petIdentification  w-full flex flex-col gap-4">
              <div className="sectionTitle">
                <h2 className="text-lg font-bold">Pet ID</h2>
                <p>
                  Please indicate if your pet has the following identification:
                </p>
              </div>
              <div className="flex flex-col w-full gap-4">
                <div className="row1 flex flex-row w-full gap-6">
                  <Input
                    classNames={{
                      label: "font-bold",
                      inputWrapper: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                    }}
                    variant="bordered"
                    label="Microchip ID"
                    labelPlacement="outside"
                    key={"pet" + index + "_microchip_id"}
                    placeholder={hidePlaceholders ? " " : "Brand name"}
                    type="text"
                  />
                  <Input
                    classNames={{
                      label: "font-bold",
                      inputWrapper: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                    }}
                    variant="bordered"
                    label="ID Number"
                    labelPlacement="outside"
                    key={"pet" + index + "_id_number"}
                    placeholder={hidePlaceholders ? " " : "123456789"}
                    type="text"
                  />
                  <Input
                    classNames={{
                      label: "font-bold",
                      inputWrapper: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                    }}
                    variant="bordered"
                    label="License Tag"
                    labelPlacement="outside"
                    key={"pet" + index + "_license_tag"}
                    placeholder={hidePlaceholders ? " " : "City/Country"}
                    type="text"
                  />
                  <Input
                    classNames={{
                      label: "font-bold",
                      inputWrapper: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                    }}
                    variant="bordered"
                    label="Tag Number"
                    labelPlacement="outside"
                    key={"pet" + index + "_license_number"}
                    placeholder={hidePlaceholders ? " " : "123456789"}
                    type="text"
                  />
                </div>
              </div>
            </section>
            <hr />
            <section className="petIdentification  w-full flex flex-col gap-4">
              <div className="sectionTitle">
                <h2 className="text-lg font-bold">Pet Health and Habits</h2>
              </div>
              <div className="flex flex-col w-full gap-4">
                <Textarea
                  classNames={{
                    label: "font-bold",
                    inputWrapper: [
                      "border-[#AF94D3]",
                      "hover:border-[#D7BEF7]",
                      "focus-within:border-[#5E3593]",
                    ],
                  }}
                  variant="bordered"
                  label="Medical History"
                  labelPlacement="outside"
                  key={"pet" + index + "_medical_history"}
                  placeholder={
                    hidePlaceholders
                      ? ""
                      : "Any specific information relative to the pet’s health history"
                  }
                />
                <Textarea
                  classNames={{
                    label: "font-bold",
                    inputWrapper: [
                      "border-[#AF94D3]",
                      "hover:border-[#D7BEF7]",
                      "focus-within:border-[#5E3593]",
                    ],
                  }}
                  variant="bordered"
                  key={"pet" + index + "_special_needs"}
                  label="Special Needs"
                  labelPlacement="outside"
                  placeholder={
                    hidePlaceholders
                      ? ""
                      : "Permanent medical condition or special exercise routine"
                  }
                />
                <Textarea
                  classNames={{
                    label: "font-bold",
                    inputWrapper: [
                      "border-[#AF94D3]",
                      "hover:border-[#D7BEF7]",
                      "focus-within:border-[#5E3593]",
                    ],
                  }}
                  variant="bordered"
                  key={"pet" + index + "_special_diet"}
                  label="Special Diet Requirements"
                  labelPlacement="outside"
                  placeholder={
                    hidePlaceholders
                      ? ""
                      : "Any specific dietary requirements or restrictions"
                  }
                />
                <Input
                  classNames={{
                    label: "font-bold",
                    inputWrapper: [
                      "border-[#AF94D3]",
                      "hover:border-[#D7BEF7]",
                      "focus-within:border-[#5E3593]",
                    ],
                  }}
                  variant="bordered"
                  label="Please note verbal/nonverbal commands your pet responds to and body language used to communicate:"
                  labelPlacement="outside"
                  key={"pet" + index + "_commands"}
                  placeholder={hidePlaceholders ? " " : "sit, stay, paw, etc."}
                  type="text"
                />
                <div className="row1 flex flex-row w-full gap-6">
                  <Input
                    classNames={{
                      label: "font-bold",
                      inputWrapper: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                    }}
                    variant="bordered"
                    label="Is your pet allowed outside?"
                    labelPlacement="outside"
                    key={"pet" + index + "_allowed_outside"}
                    placeholder={hidePlaceholders ? " " : "Brand name"}
                    type="text"
                  />
                  <Input
                    classNames={{
                      label: "font-bold",
                      inputWrapper: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                    }}
                    variant="bordered"
                    label="Where does your pet sleep?"
                    labelPlacement="outside"
                    key={"pet" + index + "_sleep_location"}
                    placeholder={
                      hidePlaceholders ? " " : "Inside, outside, etc."
                    }
                    type="text"
                  />
                  <Input
                    classNames={{
                      label: "font-bold",
                      inputWrapper: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                    }}
                    variant="bordered"
                    label="Does your pet like children?"
                    labelPlacement="outside"
                    key={"pet" + index + "_likes_children"}
                    placeholder={hidePlaceholders ? " " : "City/Country"}
                    type="text"
                  />
                </div>
                <Input
                  classNames={{
                    label: "font-bold",
                    inputWrapper: [
                      "border-[#AF94D3]",
                      "hover:border-[#D7BEF7]",
                      "focus-within:border-[#5E3593]",
                    ],
                  }}
                  variant="bordered"
                  label="What access does your pet have to your home and furniture?"
                  labelPlacement="outside"
                  key={"pet" + index + "_home_access"}
                  placeholder={
                    hidePlaceholders
                      ? " "
                      : "Has access to the couch, bed, etc."
                  }
                  type="text"
                />
                <Input
                  classNames={{
                    label: "font-bold",
                    inputWrapper: [
                      "border-[#AF94D3]",
                      "hover:border-[#D7BEF7]",
                      "focus-within:border-[#5E3593]",
                    ],
                  }}
                  variant="bordered"
                  label="If your pet has any favorite games, toys or possessions, please note where they are located"
                  labelPlacement="outside"
                  key={"pet" + index + "_favorite_items"}
                  placeholder={
                    hidePlaceholders
                      ? ""
                      : "Stuffies in the living room, ball in the backyard, etc."
                  }
                  type="text"
                />
                <Input
                  classNames={{
                    label: "font-bold",
                    inputWrapper: [
                      "border-[#AF94D3]",
                      "hover:border-[#D7BEF7]",
                      "focus-within:border-[#5E3593]",
                    ],
                  }}
                  variant="bordered"
                  label="Type of flea/heartworm preventative and when administered"
                  labelPlacement="outside"
                  key={"pet" + index + "_flea_prevention"}
                  placeholder={
                    hidePlaceholders ? " " : "Brand name, once a month, etc."
                  }
                  type="text"
                />
                <Input
                  classNames={{
                    label: "font-bold",
                    inputWrapper: [
                      "border-[#AF94D3]",
                      "hover:border-[#D7BEF7]",
                      "focus-within:border-[#5E3593]",
                    ],
                  }}
                  variant="bordered"
                  label="Allergies"
                  labelPlacement="outside"
                  key={"pet" + index + "_allergies"}
                  placeholder={
                    hidePlaceholders
                      ? ""
                      : "Foods, medications, fleas, flea control products, etc."
                  }
                  type="text"
                />
                <Textarea
                  classNames={{
                    label: "font-bold",
                    inputWrapper: [
                      "border-[#AF94D3]",
                      "hover:border-[#D7BEF7]",
                      "focus-within:border-[#5E3593]",
                    ],
                  }}
                  variant="bordered"
                  key={"pet" + index + "_special_care_instructions"}
                  label="Special care instruction"
                  labelPlacement="outside"
                  placeholder={
                    hidePlaceholders
                      ? ""
                      : "Instructions for grooming, bathing, etc."
                  }
                />
                <Input
                  classNames={{
                    label: "font-bold",
                    inputWrapper: [
                      "border-[#AF94D3]",
                      "hover:border-[#D7BEF7]",
                      "focus-within:border-[#5E3593]",
                    ],
                  }}
                  variant="bordered"
                  label="Where is your pet’s medical history located?"
                  labelPlacement="outside"
                  key={"pet" + index + "_medical_history_location"}
                  placeholder={hidePlaceholders ? " " : "Location of records"}
                  type="text"
                />
                <Input
                  classNames={{
                    label: "font-bold",
                    inputWrapper: [
                      "border-[#AF94D3]",
                      "hover:border-[#D7BEF7]",
                      "focus-within:border-[#5E3593]",
                    ],
                  }}
                  variant="bordered"
                  label="What brand of food do you feed this pet?"
                  labelPlacement="outside"
                  key={"pet" + index + "_food_brand"}
                  placeholder={hidePlaceholders ? " " : "Brand Name"}
                  type="text"
                />
                <Input
                  classNames={{
                    label: "font-bold",
                    inputWrapper: [
                      "border-[#AF94D3]",
                      "hover:border-[#D7BEF7]",
                      "focus-within:border-[#5E3593]",
                    ],
                  }}
                  variant="bordered"
                  label="Approximately how much food per day?"
                  labelPlacement="outside"
                  key={"pet" + index + "_food_amount"}
                  placeholder={
                    hidePlaceholders ? " " : "for example: 3 cups/day"
                  }
                  type="text"
                />
                <Input
                  classNames={{
                    label: "font-bold",
                    inputWrapper: [
                      "border-[#AF94D3]",
                      "hover:border-[#D7BEF7]",
                      "focus-within:border-[#5E3593]",
                    ],
                  }}
                  variant="bordered"
                  key={"pet" + index + "_feeding_schedule"}
                  label="When are the typical feeding times and amounts?"
                  labelPlacement="outside"
                  placeholder={
                    hidePlaceholders ? " " : "8am and 6pm, 1 cup each time"
                  }
                  type="text"
                />
                <Textarea
                  classNames={{
                    label: "font-bold",
                    inputWrapper: [
                      "border-[#AF94D3]",
                      "hover:border-[#D7BEF7]",
                      "focus-within:border-[#5E3593]",
                    ],
                  }}
                  variant="bordered"
                  key={"pet" + index + "_medications"}
                  label="List any medications and/or supplements"
                  labelPlacement="outside"
                  placeholder={
                    hidePlaceholders
                      ? " "
                      : "Medication name, dosage, frequency"
                  }
                />
                <Textarea
                  classNames={{
                    label: "font-bold",
                    inputWrapper: [
                      "border-[#AF94D3]",
                      "hover:border-[#D7BEF7]",
                      "focus-within:border-[#5E3593]",
                    ],
                  }}
                  variant="bordered"
                  key={"pet" + index + "_emergency_supplies"}
                  label="Emergency supplies for my pet"
                  labelPlacement="outside"
                  placeholder={
                    hidePlaceholders
                      ? ""
                      : "Location of leashes and harnesses, food, food bowls, medicine, and veterinarian records"
                  }
                />
              </div>
            </section>
            <hr />
            <section className="petHealthInsurance w-full flex flex-col gap-4">
              <div className="sectionTitle">
                <h2 className="text-lg font-bold">Pet Health Insurance</h2>
              </div>
              <div className="flex flex-col w-full gap-4">
                <div className="row3 flex flex-row w-full gap-6">
                  <Input
                    classNames={{
                      label: "font-bold",
                      inputWrapper: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                    }}
                    variant="bordered"
                    label="Name of Provider"
                    labelPlacement="outside"
                    key={"pet" + index + "_health_insurance_provider"}
                    placeholder={hidePlaceholders ? " " : "Name"}
                    type="text"
                  />
                  <Input
                    classNames={{
                      label: "font-bold",
                      inputWrapper: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                    }}
                    variant="bordered"
                    label="Phone"
                    labelPlacement="outside"
                    key={"pet" + index + "_health_insurance_phone"}
                    placeholder={hidePlaceholders ? " " : "(123) 456 7890"}
                    type="text"
                  />
                  <Input
                    classNames={{
                      label: "font-bold",
                      inputWrapper: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                    }}
                    variant="bordered"
                    label="Policy Number"
                    labelPlacement="outside"
                    key={"pet" + index + "_health_insurance_policy_number"}
                    placeholder={hidePlaceholders ? " " : "123456789"}
                    type="text"
                  />
                  <Input
                    classNames={{
                      label: "font-bold",
                      inputWrapper: [
                        "border-[#AF94D3]",
                        "hover:border-[#D7BEF7]",
                        "focus-within:border-[#5E3593]",
                      ],
                    }}
                    variant="bordered"
                    label="Cost per year"
                    labelPlacement="outside"
                    key={"pet" + index + "_health_insurance_cost"}
                    placeholder={hidePlaceholders ? " " : "USD 1,234.56"}
                    type="text"
                  />
                </div>
              </div>
            </section>

            <hr />

            <section className="trustFundInfo w-full flex flex-col gap-4">
              <div className="sectionTitle">
                <h2 className="text-lg font-bold">
                  In Case of Serious Illness
                </h2>
              </div>
              <div className="flex flex-col w-full gap-4">
                <Input
                  classNames={{
                    label: "font-bold",
                    inputWrapper: [
                      "border-[#AF94D3]",
                      "hover:border-[#D7BEF7]",
                      "focus-within:border-[#5E3593]",
                    ],
                  }}
                  variant="bordered"
                  label="Should my pet become seriously ill, who will make the decision if my pet should be euthanized?"
                  labelPlacement="outside"
                  key={"pet" + index + "_euthanasia_decision"}
                  placeholder={hidePlaceholders ? " " : "Name and Surname"}
                  type="text"
                />
                <Input
                  classNames={{
                    label: "font-bold",
                    inputWrapper: [
                      "border-[#AF94D3]",
                      "hover:border-[#D7BEF7]",
                      "focus-within:border-[#5E3593]",
                    ],
                  }}
                  variant="bordered"
                  key={"pet" + index + "_remains_care"}
                  label="When your pet dies, how do you want the pet’s remains to be cared for?"
                  labelPlacement="outside"
                  placeholder={
                    hidePlaceholders ? " " : "Cremation, burial, etc."
                  }
                  type="text"
                />
                <Input
                  classNames={{
                    label: "font-bold",
                    inputWrapper: [
                      "border-[#AF94D3]",
                      "hover:border-[#D7BEF7]",
                      "focus-within:border-[#5E3593]",
                    ],
                  }}
                  variant="bordered"
                  label="Money allocated for the cost of caring for my pet’s remains"
                  labelPlacement="outside"
                  key={"pet" + index + "_allocated_remains_fund"}
                  placeholder={hidePlaceholders ? " " : "e.g: USD 1000.00"}
                  type="text"
                />
              </div>
            </section>
            <hr className="border-[#e5e7eb] h-px w-full" />
          </section>
        ))}
        <div className="addMorePets flex flex-row justify-start align-center">
          <Button
            onClick={addPetSection}
            className="bg-[#5E3593] text-white font-medium justify-start"
          >
            Add Pet
          </Button>
        </div>
      </div>

      <hr className="border-[#e5e7eb] h-px w-full" />

      <div className="submitForms w-full flex flex-row gap-4">
        <Button className="bg-[#A377DC] text-white font-medium">Print</Button>
        <Button className="bg-[#5E3593] text-white font-medium">
          <Link to="/register">Create an account</Link>
        </Button>
      </div>
    </form>
  );
};
export default InitialForm;
