import React, { useState } from "react";
import { ContactDisplay } from "../components/EmergencyContactDisplay";
import { ContactForm } from "../components/EmergencyContactForm";
import { Button } from "@nextui-org/react";

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
    </div>
  );
};

export default EmergencyContacts;
