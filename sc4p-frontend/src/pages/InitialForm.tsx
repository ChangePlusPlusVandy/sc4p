import {
  Button,
  Input,
  DateInput,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";

import { CalendarDate } from "@internationalized/date";

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

const InitialForm = () => {
  return (
    <div className="w-full px-[100px] py-[60px] h-auto flex flex-col items-center justify-center gap-[30px]">
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
              placeholder="Your Name"
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
              placeholder="(123) 456 7890"
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
              placeholder="your.email@email.com"
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
              placeholder="123 Street name"
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
              placeholder="City name"
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
              placeholder="Select your state"
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
              placeholder="12345"
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
              placeholder="Select"
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
                placeholder="Your Name"
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
                placeholder="(123) 456 7890"
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
                placeholder="your.email@email.com"
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
                placeholder="123 Street name"
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
                placeholder="City name"
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
                placeholder="Select your state"
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
                placeholder="12345"
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
                placeholder="Select"
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
                placeholder="Your Name"
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
                placeholder="(123) 456 7890"
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
                placeholder="your.email@email.com"
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
                placeholder="123 Street name"
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
                placeholder="City name"
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
                placeholder="Select your state"
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
                placeholder="12345"
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
                placeholder="Select"
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
                placeholder="Your Name"
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
                placeholder="(123) 456 7890"
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
                placeholder="your.email@email.com"
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
                placeholder="123 Street name"
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
                placeholder="City name"
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
                placeholder="Select your state"
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
                placeholder="12345"
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
                placeholder="USD 123.00"
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
                placeholder="Your Name"
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
                placeholder="(123) 456 7890"
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
                placeholder="your.email@email.com"
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
                placeholder="123 Street name"
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
                placeholder="City name"
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
                placeholder="Select your state"
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
                placeholder="12345"
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
                placeholder="Your Name"
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
                placeholder="(123) 456 7890"
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
                placeholder="(123) 456 7890"
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
                placeholder="123 Street name"
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
                placeholder="City name"
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
                placeholder="Select your state"
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
                placeholder="12345"
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
                placeholder="123 Street name"
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
                placeholder="City name"
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
                placeholder="Select your state"
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
                placeholder="12345"
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
                placeholder="(123) 456 7890"
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
                placeholder="(123) 456 7890"
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
                placeholder="USD 1000.00"
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
                placeholder="Please indicate how you plan to provide funds for the care of your pet"
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
                placeholder="e.g: 50%"
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
                placeholder="e.g: 30%"
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
                placeholder="123 Street name"
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
                placeholder="City name"
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
                placeholder="Select your state"
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
                placeholder="12345"
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
                placeholder="e.g: 20%"
                type="text"
              />
            </div>
          </div>
        </section>
      </section>

      <hr className="border-[#e5e7eb] h-px w-full" />

      <section className="petInfo w-full flex flex-col gap-6">
        <section className="mainPetInfo">
          <h2 className="text-3xl font-bold">Pet Information</h2>
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
                placeholder="Your Name"
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
                placeholder="Select"
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
                placeholder="Select"
              >
                <SelectItem key="Y">Yes</SelectItem>
                <SelectItem key="N">No</SelectItem>
              </Select>
            </div>
            <div className="row2 flex flex-row w-full gap-6">
              <DateInput
                variant="bordered"
                label="Address"
                labelPlacement="outside"
                placeholder="123 Street name"
                placeholderValue={new CalendarDate(1995, 11, 6)}
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
                placeholder="Select"
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
            <p>Please indicate if your pet has the following identification:</p>
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
                placeholder="Brand name"
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
                placeholder="123456789"
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
                placeholder="City/Country"
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
                placeholder="123456789"
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
              placeholder="Any specific information relative to the pet’s health history"
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
              label="Special Needs"
              labelPlacement="outside"
              placeholder="Permanent medical condition or special exercise routine"
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
              label="Special Diet Requirements"
              labelPlacement="outside"
              placeholder="Any specific dietary requirements or restrictions"
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
              placeholder="sit, stay, paw, etc."
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
                placeholder="Brand name"
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
                placeholder="Inside, outside, etc."
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
                placeholder="City/Country"
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
              placeholder="Has access to the couch, bed, etc."
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
              placeholder="Stuffies in the living room, ball in the backyard, etc."
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
              placeholder="Brand name, once a month, etc."
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
              placeholder="Foods, medications, fleas, flea control products, etc."
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
              label="Special care instruction"
              labelPlacement="outside"
              placeholder="Instructions for grooming, bathing, etc."
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
              placeholder="Location of records"
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
              placeholder="Brand Name"
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
              placeholder="for example: 3 cups/day"
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
              label="When are the typical feeding times and amounts?"
              labelPlacement="outside"
              placeholder="8am and 6pm, 1 cup each time"
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
              label="List any medications and/or supplements"
              labelPlacement="outside"
              placeholder="Medication name, dosage, frequency"
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
              label="Emergency supplies for my pet"
              labelPlacement="outside"
              placeholder="Location of leashes and harnesses, food, food bowls, medicine, and veterinarian records"
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
                placeholder="Name"
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
                placeholder="(123) 456 7890"
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
                placeholder="123456789"
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
                placeholder="USD 1,234.56"
                type="text"
              />
            </div>
          </div>
        </section>

        <hr />

        <section className="trustFundInfo w-full flex flex-col gap-4">
          <div className="sectionTitle">
            <h2 className="text-lg font-bold">In Case of Serious Illness</h2>
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
              placeholder="Name and Surname"
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
              label="When your pet dies, how do you want the pet’s remains to be cared for?"
              labelPlacement="outside"
              placeholder="Cremation, burial, etc."
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
              placeholder="e.g: USD 1000.00"
              type="text"
            />
          </div>
        </section>
      </section>

      <div className="submitForms w-full flex flex-row gap-4">
        <Button>Print</Button>
        <Button isDisabled>Create an account</Button>
      </div>
    </div>
  );
};
export default InitialForm;
