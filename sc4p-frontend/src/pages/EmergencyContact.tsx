import React, { useState } from "react";
import { ContactDisplay } from "../components/EmergencyContactDisplay";
import { ContactForm } from "../components/EmergencyContactForm";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";

interface Contact {
  id: string;
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
}

const EmergencyContacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showContactForm, setShowContactForm] = useState(false);

  const addContact = (newContact: Contact) => {
    setContacts((prevContacts) => [
      ...prevContacts,
      { ...newContact, id: Date.now().toString() },
    ]);
    setShowContactForm(false);
  };

  return (
    <div>
      <h1>Emergency Contacts</h1>
      {contacts.length === 0 ? (
        <p>No Emergency Contacts Added</p>
      ) : (
        contacts.map((contact) => (
          <ContactDisplay key={contact.id} contact={contact} />
        ))
      )}
      {!showContactForm && (
        <Button onClick={() => setShowContactForm(true)}>
          Add Emergency Contact
        </Button>
      )}
      {showContactForm && (
        <ContactForm
          onSubmit={addContact}
          onCancel={() => setShowContactForm(false)}
        />
      )}
      <hr />
      <h2 className="text-xl font-semibold">
        Primary Trustee or Trustee Service
      </h2>

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
        <p className="font-semibold">
          {" "}
          Money allocated per year to Trustee to provide for caregiver
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
        </p>
      </div>

      <hr/>

      <h1 className="text-3xl font-bold">Trust Fund</h1>
      <p>
        We encourage you to work with an attorney or financial planner to appropriately fund your trust so that the Trustee is able to access the funds
      </p>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          Please indicate how you plan to provide funds for the care of your pet <br />
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

      <hr/>

      <h1 className="text-3xl font-bold">Remaining Funds</h1>
      <p>
        Should my pet(s) die while under the care of a caregiver, I would like my remaining funds distributed to (percentages should total 100%)
      </p>


      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          2nd Chance 4 Pets
          <Input
            variant="bordered"
            radius="lg"
            color="secondary"
            className="max-w-sm"
          />
          1484 Pollard Road, No. 444, Los Gatos, CA 95032
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-semibold">
          {" "}
          Other pet welfare organization
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
          Pet welfare Organization Address
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
      </div><div className="space-y-4">
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
      </div><div className="space-y-4">
        <p className="font-semibold">
          {" "}
          Other beneficiary
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

export default EmergencyContacts;
