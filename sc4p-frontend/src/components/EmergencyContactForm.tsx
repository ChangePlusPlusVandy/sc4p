import React, { useState } from "react";
import { Input, Button, Spacer } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";

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

interface ContactFormProps {
  onSubmit: (contact: Contact) => void;
  onCancel: () => void;
}

export function ContactForm({ onSubmit, onCancel }: ContactFormProps) {
  const [formData, setFormData] = useState<Omit<Contact, "id">>({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    notify();
    e.preventDefault();
    onSubmit({ ...formData, id: Date.now().toString() });
  };
  const notify = () => toast("Succesfully saved!");

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input
          isClearable
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <Spacer y={1} />
        <Input
          isClearable
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <Spacer y={1} />
        <Input
          isClearable
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <Spacer y={1} />
        <Input
          isClearable
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />
        <Spacer y={1} />
        <Input
          isClearable
          label="Zip Code"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
        />
        <Spacer y={1} />
        <Input
          isClearable
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          type="tel"
        />
        <Spacer y={1} />
        <Input
          isClearable
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          type="email"
        />
      </div>
      <div>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </div>
      <ToastContainer />
    </form>
  );
}
