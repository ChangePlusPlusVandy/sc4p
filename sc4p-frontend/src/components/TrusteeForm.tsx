import React, { useState } from "react";
import { Input, Button, Spacer } from "@nextui-org/react";

interface Trustee {
  id: string;
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  homePhone: string;
  cellPhone: string;
  email: string;
  yearlyAllocation: string;
  fundSource: string;
  customSource?: string;
}

interface TrusteeFormProps {
  onSubmit: (trustee: Trustee) => void;
  onCancel: () => void;
}

export function TrusteeForm({ onSubmit, onCancel }: TrusteeFormProps) {
  const [formData, setFormData] = useState<Omit<Trustee, "id">>({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    homePhone: "",
    cellPhone: "",
    email: "",
    yearlyAllocation: "",
    fundSource: "",
    customSource: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, id: Date.now().toString() });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
      <Spacer y={1} />
      <Input label="Address" name="address" value={formData.address} onChange={handleChange} required />
      <Spacer y={1} />
      <Input label="City" name="city" value={formData.city} onChange={handleChange} required />
      <Spacer y={1} />
      <Input label="State" name="state" value={formData.state} onChange={handleChange} required />
      <Spacer y={1} />
      <Input label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
      <Spacer y={1} />
      <Input label="Home Phone" name="homePhone" value={formData.homePhone} onChange={handleChange} required />
      <Spacer y={1} />
      <Input label="Cell Phone" name="cellPhone" value={formData.cellPhone} onChange={handleChange} required />
      <Spacer y={1} />
      <Input label="Email" name="email" value={formData.email} onChange={handleChange} required type="email" />
      <Spacer y={1} />
      <Input label="Yearly Allocation" name="yearlyAllocation" value={formData.yearlyAllocation} onChange={handleChange} required type="number" />
      <Spacer y={1} />

      <label>Fund Source</label>
      <select name="fundSource" value={formData.fundSource} onChange={handleChange} required>
        <option value="">Select a Source</option>
        <option value="bank">Bank Account</option>
        <option value="will">Tied to Will</option>
        <option value="lifeInsurance">Life Insurance Policy Designates Trust as Beneficiary</option>
        <option value="other">Other</option>
      </select>
      {formData.fundSource === "other" && (
        <>
          <Spacer y={1} />
          <Input label="Specify Other Source" name="customSource" value={formData.customSource} onChange={handleChange} />
        </>
      )}
      <Spacer y={2} />
      <Button onClick={onCancel}>Cancel</Button>
      <Button type="submit">Submit</Button>
    </form>
  );
}