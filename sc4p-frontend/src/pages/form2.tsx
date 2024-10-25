import React, { useState } from "react";
import { ContactDisplay } from "../components/EmergencyContactDisplay";
import { ContactForm } from "../components/EmergencyContactForm";

const form2: React.FC = () => {
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

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showForm, setShowForm] = useState(false);

  const addContact = (newContact: Contact) => {
    setContacts((prevContacts) => [
      ...prevContacts,
      { ...newContact, id: Date.now().toString() },
    ]);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Emergency Contact</h1>

      {contacts.length === 0 ? (
        <p className="text-lg mb-4">No Emergency Contact Added</p>
      ) : (
        contacts.map((contact) => (
          <ContactDisplay key={contact.id} contact={contact} />
        ))
      )}

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Emergency Contact
        </button>
      )}

      {showForm && (
        <ContactForm
          onSubmit={addContact}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default form2;
