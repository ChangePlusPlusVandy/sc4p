import React from "react";

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

interface ContactDisplayProps {
  contact: Contact;
}

export function ContactDisplay({ contact }: ContactDisplayProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <h2 className="text-xl font-semibold mb-2">{contact.fullName}</h2>
      <p>{contact.address}</p>
      <p>{`${contact.city}, ${contact.state} ${contact.zipCode}`}</p>
      <p>Phone: {contact.phone}</p>
      <p>Email: {contact.email}</p>
    </div>
  );
}
