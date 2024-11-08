import React from "react";
import {
  Input,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  Button,
  Spacer,
} from "@nextui-org/react";

// Carefully select a minimum of two caregivers who agree to be responsible for your pets should anything happen to you.
// Caregivers are typically responsible for the day-to-day care of your pets. They should fully understand the obligation and requirements for this role.
// Your choice of caregivers should take into consideration the potential lifespan of your pets.

const Caregivers: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Caregiver Information</h1>
      <p>
        Carefully select a minimum of two caregivers who agree to be responsible
        for your pets should anything happen to you. Caregivers are typically
        responsible for the day-to-day care of your pets. They should fully
        understand the obligation and requirements for this role. Your choice of
        caregivers should take into consideration the potential lifespan of your
        pets.
      </p>

      <hr />

      <h2 className="text-xl font-semibold">Primary Caregiver</h2>
      <p className="text-sm mb-4">
        This caregiver has agreed to care for my pets should anything happen to
        me
      </p>
      <br />

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          First and Last Name
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          Care-giving Length <br />
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Select</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">Temp1</DropdownItem>
              <DropdownItem key="copy">Temp2</DropdownItem>
              <DropdownItem key="edit">Temp3</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          Cell Phone
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          Email
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          Address
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          City
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          State
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          Zip
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <hr />

      <h2 className="text-xl font-semibold">Alternate Caregiver</h2>
      <p className="text-sm mb-4">
        This caregiver has agreed to care for my pets should anything happen to
        me
      </p>
      <br />

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          First and Last Name
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          Care-giving Length <br />
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Select</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">Temp1</DropdownItem>
              <DropdownItem key="copy">Temp2</DropdownItem>
              <DropdownItem key="edit">Temp3</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          Cell Phone
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          Email
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          Address
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          City
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          State
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          Zip
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <hr />

      <h2 className="text-xl font-semibold">
        Pet Sitters and Boarding Facilities
      </h2>
      <p className="text-sm mb-4">
        Should your designated caregiver go on vacation or be temporarily
        unavailable to care for your pets, who should take care of them?
      </p>
      <br />

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          Contact
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          Average Daily Charge
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          Cell Phone
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          Email
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          Address
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          City
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          State
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          Zip
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <div className="space-y-4">
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default Caregivers;
