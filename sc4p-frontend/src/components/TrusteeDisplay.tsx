import React from "react";

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


interface TrusteeDisplayProps {
    trustee: Trustee;
  }

  export function TrusteeDisplay({ trustee }: TrusteeDisplayProps) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-xl font-semibold mb-2">{trustee.fullName}</h2>
        <p>{trustee.address}</p>
        <p>{`${trustee.city}, ${trustee.state} ${trustee.zipCode}`}</p>
        <p>Home Phone: {trustee.homePhone}</p>
        <p>Cell Phone: {trustee.cellPhone}</p>
        <p>Email: {trustee.email}</p>
        <p>Yearly Allocation: ${trustee.yearlyAllocation}</p>
        <p>Fund Source: {trustee.fundSource}</p>
        {trustee.fundSource === "other" && <p>Other Source: {trustee.customSource}</p>}
      </div>
    );
  }