import React, { useState, useEffect } from "react";
import { TrusteeForm } from "../components/TrusteeForm";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Spinner,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useAuth } from "../AuthContext";
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [showEditTrustFund, setShowEditTrustFund] = useState(false);
  const [trustFundForm, setTrustFundForm] = useState({
    funding_plan: "",
    bank_account_details: "",
    life_insurance_policy_number: "",
    other_funding_details: "",
  });
  const [formData, setFormData] = useState({
    trustee_name: "",
    email: "",
    cell_phone: "",
    home_phone: "",
    emergency_phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    allocated_amount: "",
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
      toast.success("Succesfully created trust fund!");
    } catch (error) {
      console.error("Error creating trust fund:", error);
      toast.error("An error occured while creating trust fund");
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
      toast.success("Succesfully updated trust fund!");
    } catch (error) {
      console.error("Error updating trust fund:", error);
      toast.error("An error occured while updating trust fund");
    }
  };

  const handleTrusteeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    toast.success("Succesfully updated trustee");
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

  const handleAddTrustee = async () => {
    if (!trustFundId || !user) return;

    try {
      const token = await user.getIdToken();
      const res = await createTrustee(token, {
        ...formData,
        trust_fund_id: trustFundId,
      });
      if (!res.ok) {
        throw new Error("Failed to create trustee");
      }
      const createdTrustee = await res.json();
      setTrustees((prev) => [...prev, createdTrustee]);
      onOpenChange(); // Close the modal after saving
      toast.success("Succesfully added a trustee!");
    } catch (error) {
      console.error("Error creating trustee:", error);
      toast.error("An error occured while adding a trustee");
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
      toast.success("Succesfully removed trustee!");
    } catch (error) {
      console.error("Error deleting trustee:", error);
      toast.error("An error occured while removing trustee");
    }
  };

  const renderTrustFundForm = () => (
    <form
      onSubmit={trustFundId ? handleUpdateTrustFund : handleCreateTrustFund}
      className="space-y-4"
    >
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
          <Button onPress={onOpen} className="mb-6 bg-base text-white">
            Add Trustee
          </Button>

          {/* Modal for Adding Trustee */}
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="sm"
            placement="center"
          >
            <ModalContent>
              <ModalHeader>Add Trustee Information</ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col gap-4">
                  <Input
                    label="Trustee Name"
                    name="trustee_name"
                    value={formData.trustee_name}
                    onChange={handleTrusteeInputChange}
                    required
                  />
                  <Input
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleTrusteeInputChange}
                    required
                    type="email"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Cell Phone"
                      name="cell_phone"
                      value={formData.cell_phone}
                      onChange={handleTrusteeInputChange}
                      required
                    />
                    <Input
                      label="Home Phone"
                      name="home_phone"
                      value={formData.home_phone || ""}
                      onChange={handleTrusteeInputChange}
                    />
                  </div>
                  <Input
                    label="Emergency Phone"
                    name="emergency_phone"
                    value={formData.emergency_phone || ""}
                    onChange={handleTrusteeInputChange}
                  />
                  <Input
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleTrusteeInputChange}
                    required
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleTrusteeInputChange}
                      required
                    />
                    <Input
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleTrusteeInputChange}
                      required
                    />
                    <Input
                      label="ZIP"
                      name="zip"
                      value={formData.zip}
                      onChange={handleTrusteeInputChange}
                      required
                    />
                  </div>
                  <Input
                    label="Allocated Amount"
                    name="allocated_amount"
                    type="number"
                    value={formData.allocated_amount?.toString() || ""}
                    onChange={handleTrusteeInputChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  variant="flat"
                  onPress={() => onOpenChange()}
                >
                  Cancel
                </Button>
                <Button color="primary" onPress={handleAddTrustee}>
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>

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
