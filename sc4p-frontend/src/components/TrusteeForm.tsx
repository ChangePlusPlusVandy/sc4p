import React, { useState } from "react";
import { Input, Button, Spacer } from "@nextui-org/react";
import { Trustee } from "../types/trustee";

interface TrusteeFormProps {
  onSubmit: (trustee: Omit<Trustee, "id" | "created_at">) => void;
  onCancel: () => void;
}

export function TrusteeForm({ onSubmit, onCancel }: TrusteeFormProps) {
  const [formData, setFormData] = useState<Omit<Trustee, "id" | "created_at">>({
    trust_fund_id: 0, // This will be set by the parent component
    trustee_name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    home_phone: null,
    cell_phone: "",
    emergency_phone: null,
    email: "",
    allocated_amount: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "" ? (name.includes("phone") ? null : value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Trustee Name"
          name="trustee_name"
          value={formData.trustee_name}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          type="email"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Cell Phone"
          name="cell_phone"
          value={formData.cell_phone}
          onChange={handleChange}
          required
        />
        <Input
          label="Home Phone"
          name="home_phone"
          value={formData.home_phone || ""}
          onChange={handleChange}
        />
      </div>

      <Input
        label="Emergency Phone"
        name="emergency_phone"
        value={formData.emergency_phone || ""}
        onChange={handleChange}
      />

      <Input
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      />

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <Input
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />
        <Input
          label="ZIP"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
          required
        />
      </div>

      <Input
        label="Allocated Amount"
        name="allocated_amount"
        type="number"
        value={formData.allocated_amount?.toString() || ""}
        onChange={handleChange}
      />

      <div className="flex justify-end gap-4">
        <Button color="danger" variant="light" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="primary" type="submit">
          Add Trustee
        </Button>
      </div>
    </form>
  );
}
