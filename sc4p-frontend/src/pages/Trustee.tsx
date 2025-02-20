import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
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
  updateTrustee,
} from "../lib/Services";
import { Trustee as TrusteeType } from "../types/trustee";
import InformationCard from "../components/InformationCard";

const trusteeSchema = yup.object().shape({
  trustee_name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  cell_phone: yup
    .string()
    .required("Cell phone is required")
    .matches(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      "Phone number must be a valid US phone number",
    ),
  home_phone: yup
    .string()
    .nullable()
    .matches(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      "Phone number must be a valid US phone number",
    ),
  emergency_phone: yup
    .string()
    .nullable()
    .matches(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      "Phone number must be a valid US phone number",
    ),
  address: yup
    .string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),
  city: yup
    .string()
    .required("City is required")
    .min(2, "City must be at least 2 characters"),
  state: yup
    .string()
    .required("State is required")
    .matches(/^[A-Z]{2}$/, "State must be a 2-letter code (e.g., CA)"),
  zip: yup
    .string()
    .required("ZIP code is required")
    .matches(/^[0-9]{5}(-[0-9]{4})?$/, "Must be a valid ZIP code"),
  allocated_amount: yup.number().nullable(),
});

const initialTrustFundState = {
  funding_plan: "",
  bank_account_details: "",
  life_insurance_policy_number: "",
  other_funding_details: "",
};

const Trustee: React.FC = () => {
  const { currentUser: user, userData } = useAuth();
  const [trustees, setTrustees] = useState<TrusteeType[]>([]);
  const [trustFundId, setTrustFundId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [trustFundForm, setTrustFundForm] = useState(initialTrustFundState);
  const [tempTrustFundForm, setTempTrustFundForm] = useState(
    initialTrustFundState,
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isTrustFundOpen,
    onOpen: onTrustFundOpen,
    onOpenChange: onTrustFundOpenChange,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(trusteeSchema),
    mode: "onBlur",
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
          const trustFundData = {
            funding_plan: trustFund.funding_plan || "",
            bank_account_details: trustFund.bank_account_details || "",
            life_insurance_policy_number:
              trustFund.life_insurance_policy_number || "",
            other_funding_details: trustFund.other_funding_details || "",
          };
          setTrustFundForm(trustFundData);

          const trusteesRes = await getTrustees(token, trustFund.id);
          if (!trusteesRes.ok) throw new Error("Failed to fetch trustees");

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

      if (!res.ok) throw new Error("Failed to create trust fund");

      const trustFund = await res.json();
      setTrustFundId(trustFund.id);
    } catch (error) {
      console.error("Error creating trust fund:", error);
    }
  };

  const handleInputChange =
    (
      setter: React.Dispatch<
        React.SetStateAction<typeof initialTrustFundState>
      >,
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setter((prev) => ({ ...prev, [name]: value }));
    };

  const handleTrustFundSubmit = async (onClose: () => void) => {
    if (!user || !userData?.id) return;

    try {
      const token = await user.getIdToken();
      const res = await updateTrustFundInfo(
        token,
        userData.id,
        tempTrustFundForm,
      );

      if (!res.ok) throw new Error("Failed to update trust fund");

      setTrustFundForm(tempTrustFundForm);
      toast("Successfully updated trust fund!");
      onClose();
    } catch (error) {
      console.error("Error updating trust fund:", error);
    }
  };

  const handleAddTrustee = async (data: any, onClose: () => void) => {
    if (!trustFundId || !user) return;

    try {
      const token = await user.getIdToken();
      const res = await createTrustee(token, {
        ...data,
        trust_fund_id: trustFundId,
      });

      if (!res.ok) throw new Error("Failed to create trustee");

      const createdTrustee = await res.json();
      setTrustees((prev) => [...prev, createdTrustee]);
      onClose();
      toast("Successfully added trustee!");
    } catch (error) {
      console.error("Error creating trustee:", error);
    }
  };

  const handleDeleteTrustee = async (id: number) => {
    if (!user) return;

    try {
      const token = await user.getIdToken();
      const res = await deleteTrustee(token, id);

      if (!res.ok) throw new Error("Failed to delete trustee");

      setTrustees((prev) => prev.filter((trustee) => trustee.id !== id));
      toast("Successfully removed trustee!");
    } catch (error) {
      console.error("Error deleting trustee:", error);
    }
  };

  const handleUpdateTrustee = async (id: number, data: any) => {
    if (!user) return;

    try {
      const token = await user.getIdToken();
      const res = await updateTrustee(token, id, data);

      if (!res.ok) throw new Error("Failed to update trustee");

      const updatedTrustee = await res.json();
      setTrustees((prev) =>
        prev.map((t) => (t.id === id ? updatedTrustee : t)),
      );
      toast("Successfully updated trustee!");
    } catch (error) {
      console.error("Error updating trustee:", error);
    }
  };

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
        <Card className="p-6">
          <form onSubmit={handleCreateTrustFund} className="space-y-4">
            <Card shadow="none">
              <CardBody className="flex flex-col gap-6">
                <Input
                  label="Funding Plan"
                  name="funding_plan"
                  value={trustFundForm.funding_plan}
                  onChange={handleInputChange(setTrustFundForm)}
                  placeholder="Describe how the trust will be funded"
                  labelPlacement="outside"
                />
                <Input
                  label="Bank Account Details"
                  name="bank_account_details"
                  value={trustFundForm.bank_account_details}
                  onChange={handleInputChange(setTrustFundForm)}
                  placeholder="Enter bank account information"
                  labelPlacement="outside"
                />
                <Input
                  label="Life Insurance Policy Number"
                  name="life_insurance_policy_number"
                  value={trustFundForm.life_insurance_policy_number}
                  onChange={handleInputChange(setTrustFundForm)}
                  placeholder="Enter life insurance policy number if applicable"
                  labelPlacement="outside"
                />
                <Input
                  label="Other Funding Details"
                  name="other_funding_details"
                  value={trustFundForm.other_funding_details}
                  onChange={handleInputChange(setTrustFundForm)}
                  placeholder="Any additional funding information"
                  labelPlacement="outside"
                />
                <div className="flex justify-end">
                  <Button color="primary" type="submit">
                    Create Trust Fund
                  </Button>
                </div>
              </CardBody>
            </Card>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">Trust Fund Details</h1>
          <Button
            color="primary"
            onPress={() => {
              setTempTrustFundForm({ ...trustFundForm });
              onTrustFundOpen();
            }}
          >
            Edit Trust Fund
          </Button>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            {Object.entries(trustFundForm).map(([key, value]) => (
              <div key={key}>
                <h3 className="text-lg font-semibold">
                  {key
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </h3>
                <p>{value || "Not specified"}</p>
              </div>
            ))}
          </div>
        </Card>

        <Modal
          isOpen={isTrustFundOpen}
          onOpenChange={(open) => {
            if (open) setTempTrustFundForm({ ...trustFundForm });
            onTrustFundOpenChange();
          }}
          scrollBehavior="inside"
          placement="center"
          size="3xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Edit Trust Fund</ModalHeader>
                <ModalBody>
                  <form className="space-y-4">
                    <Card shadow="none">
                      <CardBody className="flex flex-col gap-6">
                        {Object.entries(tempTrustFundForm).map(
                          ([key, value]) => (
                            <Input
                              key={key}
                              label={key
                                .split("_")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() +
                                    word.slice(1),
                                )
                                .join(" ")}
                              name={key}
                              value={value}
                              onChange={handleInputChange(setTempTrustFundForm)}
                              placeholder={`Enter ${key.split("_").join(" ")}`}
                              labelPlacement="outside"
                            />
                          ),
                        )}
                      </CardBody>
                    </Card>
                    <ModalFooter>
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={() => {
                          setTempTrustFundForm({ ...trustFundForm });
                          onClose();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        onPress={() => handleTrustFundSubmit(onClose)}
                      >
                        Save Changes
                      </Button>
                    </ModalFooter>
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Trustees</h2>
          <Button onPress={onOpen} className="mb-6 bg-base text-white">
            Add Trustee
          </Button>
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
                onUpdate={handleUpdateTrustee}
              />
            ))
          )}
        </div>

        <Modal
          isOpen={isOpen}
          onOpenChange={() => {
            reset();
            onOpenChange();
          }}
          scrollBehavior="inside"
          placement="center"
          size="3xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Add Trustee</ModalHeader>
                <ModalBody>
                  <form
                    onSubmit={handleSubmit((data) =>
                      handleAddTrustee(data, onClose),
                    )}
                  >
                    <Card shadow="none">
                      <CardBody className="flex flex-col gap-6">
                        <Input
                          type="text"
                          label="Trustee Name"
                          placeholder="Enter trustee's full name"
                          isRequired
                          labelPlacement="outside"
                          {...register("trustee_name")}
                          isInvalid={!!errors.trustee_name}
                          errorMessage={errors.trustee_name?.message}
                        />
                        <Input
                          type="email"
                          label="Email"
                          placeholder="Enter email address"
                          isRequired
                          labelPlacement="outside"
                          {...register("email")}
                          isInvalid={!!errors.email}
                          errorMessage={errors.email?.message}
                        />
                        <div className="grid grid-cols-3 gap-4">
                          <Input
                            type="tel"
                            label="Cell Phone"
                            placeholder="123-456-7890"
                            isRequired
                            labelPlacement="outside"
                            {...register("cell_phone")}
                            isInvalid={!!errors.cell_phone}
                            errorMessage={errors.cell_phone?.message}
                          />
                          <Input
                            type="tel"
                            label="Home Phone"
                            placeholder="123-456-7890"
                            labelPlacement="outside"
                            {...register("home_phone")}
                            isInvalid={!!errors.home_phone}
                            errorMessage={errors.home_phone?.message}
                          />
                          <Input
                            type="tel"
                            label="Emergency Phone"
                            placeholder="123-456-7890"
                            labelPlacement="outside"
                            {...register("emergency_phone")}
                            isInvalid={!!errors.emergency_phone}
                            errorMessage={errors.emergency_phone?.message}
                          />
                        </div>
                        <Input
                          type="text"
                          label="Street Address"
                          placeholder="Enter street address"
                          isRequired
                          labelPlacement="outside"
                          {...register("address")}
                          isInvalid={!!errors.address}
                          errorMessage={errors.address?.message}
                        />
                        <div className="grid grid-cols-3 gap-4">
                          <Input
                            type="text"
                            label="City"
                            placeholder="Enter city"
                            isRequired
                            labelPlacement="outside"
                            {...register("city")}
                            isInvalid={!!errors.city}
                            errorMessage={errors.city?.message}
                          />
                          <Input
                            type="text"
                            label="State"
                            placeholder="CA"
                            isRequired
                            labelPlacement="outside"
                            {...register("state")}
                            isInvalid={!!errors.state}
                            errorMessage={errors.state?.message}
                          />
                          <Input
                            type="text"
                            label="ZIP Code"
                            placeholder="12345"
                            isRequired
                            labelPlacement="outside"
                            {...register("zip")}
                            isInvalid={!!errors.zip}
                            errorMessage={errors.zip?.message}
                          />
                        </div>
                        <Input
                          type="number"
                          label="Allocated Amount"
                          placeholder="Enter allocated amount"
                          labelPlacement="outside"
                          {...register("allocated_amount")}
                          isInvalid={!!errors.allocated_amount}
                          errorMessage={errors.allocated_amount?.message}
                        />
                      </CardBody>
                    </Card>
                    <ModalFooter>
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={() => {
                          reset();
                          onClose();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        type="submit"
                        isLoading={isSubmitting}
                      >
                        Add Trustee
                      </Button>
                    </ModalFooter>
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Trustee;
