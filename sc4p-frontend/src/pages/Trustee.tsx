import React, { useState } from "react";
import { TrusteeForm } from "../components/TrusteeForm";
import { TrusteeDisplay } from "../components/TrusteeDisplay";
import { Button } from "@nextui-org/react";

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

const Trustee: React.FC = () => {
  const [trustees, setTrustees] = useState<Trustee[]>([]);
  const [showTrusteeForm, setShowTrusteeForm] = useState(false);

  const addTrustee = (newTrustee: Trustee) => {
    setTrustees((prevTrustees) => [
      ...prevTrustees,
      { ...newTrustee, id: Date.now().toString() },
    ]);
    setShowTrusteeForm(false);
  };

  return (
    <div>
      <h1>Trustees</h1>
      {trustees.length === 0 ? (
        <p>No Trustees Added</p>
      ) : (
        trustees.map((trustee) => (
          <TrusteeDisplay key={trustee.id} trustee={trustee} />
        ))
      )}
      {!showTrusteeForm && (
        <Button onClick={() => setShowTrusteeForm(true)}>Add Trustee</Button>
      )}
      {showTrusteeForm && (
        <TrusteeForm
          onSubmit={addTrustee}
          onCancel={() => setShowTrusteeForm(false)}
        />
      )}
    </div>
  );
};

export default Trustee;
