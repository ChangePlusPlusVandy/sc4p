import React, { useState, useEffect } from "react";
import { TrusteeForm } from "../components/TrusteeForm";
import { Button, Card, Spinner, Input } from "@nextui-org/react";
import { useAuth } from "../AuthContext";
import { ToastContainer, toast } from "react-toastify";

import {
  getTrustFundInfo,
  getTrustees,
  createTrustee,
  deleteTrustee,
  createTrustFundInfo,
  updateTrustFundInfo,
} from "../lib/Services";
import { Trustee as TrusteeType } from "../types/trustee";
import InformationCard from "../components/InformationCard";

const Trustee: React.FC = () => {
  const { currentUser: user, userData } = useAuth();
  const [trustees, setTrustees] = useState<TrusteeType[]>([]);
  const [trustFundId, setTrustFundId] = useState<number | null>(null);
  const [showTrusteeForm, setShowTrusteeForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showEditTrustFund, setShowEditTrustFund] = useState(false);
  const [trustFundForm, setTrustFundForm] = useState({
    funding_plan: "",
    bank_account_details: "",
    life_insurance_policy_number: "",
    other_funding_details: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !userData?.id) return;

      try {
        const token = await user.getIdToken();
        const trustFundRes = await getTrustFundInfo(token, userData.id);

        if (trustFundRes.ok) {
          const trustFund = await trustFundRes.json();
          setTrustFundId(trustFund.id);
          setTrustFundForm({
            funding_plan: trustFund.funding_plan || "",
            bank_account_details: trustFund.bank_account_details || "",
            life_insurance_policy_number:
              trustFund.life_insurance_policy_number || "",
            other_funding_details: trustFund.other_funding_details || "",
          });

          const trusteesRes = await getTrustees(token, trustFund.id);
          if (!trusteesRes.ok) {
            throw new Error("Failed to fetch trustees");
          }
          const trusteesData = await trusteesRes.json();
          setTrustees(trusteesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, userData]);

  const handleCreateTrustFund = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userData?.id) return;

    try {
      const token = await user.getIdToken();
      const res = await createTrustFundInfo(token, {
        owner_id: userData.id,
        ...trustFundForm,
      });

      if (!res.ok) {
        throw new Error("Failed to create trust fund");
      }

      const trustFund = await res.json();
      setTrustFundId(trustFund.id);
    } catch (error) {
      console.error("Error creating trust fund:", error);
    }
  };

  const handleUpdateTrustFund = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userData?.id) return;

    try {
      const token = await user.getIdToken();
      const res = await updateTrustFundInfo(token, userData.id, trustFundForm);

      if (!res.ok) {
        throw new Error("Failed to update trust fund");
      }

      setShowEditTrustFund(false);
      notifyUpdate();
    } catch (error) {
      console.error("Error updating trust fund:", error);
    }
  };

  const handleTrustFundInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setTrustFundForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTrustee = async (
    newTrustee: Omit<TrusteeType, "id" | "created_at">,
  ) => {
    if (!trustFundId || !user) return;

    try {
      const token = await user.getIdToken();
      const res = await createTrustee(token, {
        ...newTrustee,
        trust_fund_id: trustFundId,
      });
      if (!res.ok) {
        throw new Error("Failed to create trustee");
      }
      const createdTrustee = await res.json();
      setTrustees((prev) => [...prev, createdTrustee]);
      setShowTrusteeForm(false);
      notify();
    } catch (error) {
      console.error("Error creating trustee:", error);
    }
  };

  const handleDeleteTrustee = async (id: number) => {
    if (!user) return;

    try {
      const token = await user.getIdToken();
      const res = await deleteTrustee(token, id);
      if (!res.ok) {
        throw new Error("Failed to delete trustee");
      }
      setTrustees((prev) => prev.filter((trustee) => trustee.id !== id));
      notifyDel();
    } catch (error) {
      console.error("Error deleting trustee:", error);
    }
  };

  const renderTrustFundForm = () => (
    <form
      onSubmit={trustFundId ? handleUpdateTrustFund : handleCreateTrustFund}
      className="space-y-4"
    >
      <ToastContainer />
      <Input
        label="Funding Plan"
        name="funding_plan"
        value={trustFundForm.funding_plan}
        onChange={handleTrustFundInputChange}
        placeholder="Describe how the trust will be funded"
      />
      <Input
        label="Bank Account Details"
        name="bank_account_details"
        value={trustFundForm.bank_account_details}
        onChange={handleTrustFundInputChange}
        placeholder="Enter bank account information"
      />
      <Input
        label="Life Insurance Policy Number"
        name="life_insurance_policy_number"
        value={trustFundForm.life_insurance_policy_number}
        onChange={handleTrustFundInputChange}
        placeholder="Enter life insurance policy number if applicable"
      />
      <Input
        label="Other Funding Details"
        name="other_funding_details"
        value={trustFundForm.other_funding_details}
        onChange={handleTrustFundInputChange}
        placeholder="Any additional funding information"
      />
      <div className="flex justify-end gap-2">
        {trustFundId && (
          <Button
            color="danger"
            variant="light"
            onClick={() => setShowEditTrustFund(false)}
          >
            Cancel
          </Button>
        )}
        <Button color="primary" type="submit">
          {trustFundId ? "Update Trust Fund" : "Create Trust Fund"}
        </Button>
      </div>
    </form>
  );

  const notify = () => toast("Succesfully added trustee!");
  const notifyDel = () => toast("Succesfully removed trustee!");
  const notifyUpdate = () => toast("Succesfully updated trust fund!");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!trustFundId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Create Trust Fund</h1>
        <Card className="p-6">{renderTrustFundForm()}</Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">Trust Fund Details</h1>
          {!showEditTrustFund && (
            <Button color="primary" onClick={() => setShowEditTrustFund(true)}>
              Edit Trust Fund
            </Button>
          )}
        </div>
        <Card className="p-6">
          {showEditTrustFund ? (
            renderTrustFundForm()
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Funding Plan</h3>
                <p>{trustFundForm.funding_plan || "Not specified"}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Bank Account Details</h3>
                <p>{trustFundForm.bank_account_details || "Not specified"}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Life Insurance Policy Number
                </h3>
                <p>
                  {trustFundForm.life_insurance_policy_number ||
                    "Not specified"}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Other Funding Details</h3>
                <p>{trustFundForm.other_funding_details || "Not specified"}</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Trustees</h2>
          {!showTrusteeForm && (
            <Button
              color="primary"
              onClick={() => setShowTrusteeForm(true)}
              className="px-8"
            >
              Add Trustee
            </Button>
          )}
        </div>

        {showTrusteeForm && (
          <Card className="p-6 mb-4">
            <TrusteeForm
              onSubmit={handleAddTrustee}
              onCancel={() => setShowTrusteeForm(false)}
            />
          </Card>
        )}

        <div className="space-y-4">
          {trustees.length === 0 ? (
            <p className="text-center text-gray-500">No trustees added yet</p>
          ) : (
            trustees.map((trustee) => (
              <InformationCard
                key={trustee.id}
                type="trustee"
                data={trustee}
                onDelete={() => handleDeleteTrustee(trustee.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Trustee;
