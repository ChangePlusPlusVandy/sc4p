import React from "react";
import InitialForm from "./InitialForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Reuse the same schema from InitialForm
const schema = yup.object().shape({
  // Pet Owner Information
  ownerName: yup.string().required("Owner name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipCode: yup.string().required("Zip code is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),

  // Emergency Contact Information
  emergencyContactName: yup
    .string()
    .required("Emergency contact name is required"),
  emergencyContactPhone: yup
    .string()
    .required("Emergency contact phone is required"),
  emergencyContactRelationship: yup
    .string()
    .required("Relationship is required"),

  // Pet Information
  petName: yup.string().required("Pet name is required"),
  petType: yup.string().required("Pet type is required"),
  breed: yup.string().required("Breed is required"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be positive"),
  gender: yup.string().required("Gender is required"),
  spayedNeutered: yup.boolean(),
  color: yup.string().required("Color is required"),
  microchipId: yup.string(),
  petInsurance: yup.string(),
  insurancePolicy: yup.string(),
  insurancePhone: yup.string(),
  insuranceCost: yup.string(),
  hasInsurance: yup.boolean(),
  specialDiet: yup.string(),
  feedingSchedule: yup.string(),
  medicalConditions: yup.string(),
  medications: yup.string(),
  allergies: yup.string(),
  behavioralNotes: yup.string(),

  // End of Life Care
  illnessDecision: yup.string(),
  deathCarePreference: yup.string(),
  deathCareBudget: yup.string(),

  // Veterinarian Information
  veterinarianName: yup.string().required("Veterinarian name is required"),
  veterinarianPhone: yup.string().required("Veterinarian phone is required"),
  veterinarianAddress: yup.string(),
  veterinarianEmail: yup.string().email("Invalid email"),

  // Caregiver Information
  caregiverName: yup.string().required("Caregiver name is required"),
  caregiverPhone: yup.string().required("Caregiver phone is required"),
  caregiverAddress: yup.string().required("Caregiver address is required"),
  caregiverEmail: yup.string().email("Invalid email"),
  caregiverRelationship: yup.string(),
  caregiverHasKey: yup.boolean(),
  caregiverHasAgreed: yup.boolean(),
  caregiverCareType: yup.string(),
  caregiverCity: yup.string(),
  caregiverState: yup.string(),
  caregiverZip: yup.string(),
  caregiverHomePhone: yup.string(),

  // Backup Caregiver Information
  backupCaregiverName: yup
    .string()
    .required("Backup caregiver name is required"),
  backupCaregiverPhone: yup
    .string()
    .required("Backup caregiver phone is required"),
  backupCaregiverAddress: yup
    .string()
    .required("Backup caregiver address is required"),
  backupCaregiverEmail: yup.string().email("Invalid email"),
  backupCaregiverRelationship: yup.string(),
  backupCaregiverHasKey: yup.boolean(),
  backupCaregiverHasAgreed: yup.boolean(),
  backupCaregiverCareType: yup.string(),
  backupCaregiverCity: yup.string(),
  backupCaregiverState: yup.string(),
  backupCaregiverZip: yup.string(),
  backupCaregiverHomePhone: yup.string(),

  // Trustee Information
  trusteeName: yup.string(),
  trusteeAddress: yup.string(),
  trusteeCity: yup.string(),
  trusteeState: yup.string(),
  trusteeZip: yup.string(),
  trusteeHomePhone: yup.string(),
  trusteeCellPhone: yup.string(),
  trusteeEmail: yup.string().email("Invalid email"),
  trusteeAllocation: yup.string(),
  trustFundType: yup.string(),
  trustFundOtherExplanation: yup.string(),
  remainingFundsOrg2ndChance: yup.string(),
  remainingFundsOrgOther: yup.string(),
  remainingFundsOrgOtherAddress: yup.string(),
  remainingFundsOtherBeneficiary: yup.string(),

  // Terms and Agreements
  agreeToTerms: yup.boolean().oneOf([true], "You must agree to the terms"),
});

type FormData = yup.InferType<typeof schema>;

const TestForm: React.FC = () => {
  // Sample data for testing
  const sampleData: FormData = {
    // Pet Owner Information
    ownerName: "John Doe",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    phone: "(555) 123-4567",
    email: "john.doe@example.com",

    // Emergency Contact Information
    emergencyContactName: "Jane Smith",
    emergencyContactPhone: "(555) 987-6543",
    emergencyContactRelationship: "Sister",

    // Pet Information
    petName: "Max",
    petType: "Dog",
    breed: "Golden Retriever",
    age: 3,
    gender: "Male",
    spayedNeutered: true,
    color: "Golden",
    microchipId: "123456789",
    hasInsurance: true,
    petInsurance: "PetCare Plus",
    insurancePolicy: "POL123456",
    insurancePhone: "(555) 111-2222",
    insuranceCost: "500",
    specialDiet: "Grain-free diet",
    feedingSchedule: "Twice daily, 1 cup each",
    medicalConditions: "None",
    medications: "None",
    allergies: "None",
    behavioralNotes: "Friendly with other dogs",

    // End of Life Care
    illnessDecision: "vet",
    deathCarePreference: "cremation",
    deathCareBudget: "1000",

    // Veterinarian Information
    veterinarianName: "Dr. Sarah Johnson",
    veterinarianPhone: "(555) 333-4444",
    veterinarianAddress: "456 Vet Street",
    veterinarianEmail: "dr.johnson@vetclinic.com",

    // Caregiver Information
    caregiverName: "Mike Wilson",
    caregiverPhone: "(555) 555-5555",
    caregiverAddress: "789 Caregiver Ave",
    caregiverEmail: "mike.wilson@example.com",
    caregiverRelationship: "Friend",
    caregiverHasKey: true,
    caregiverHasAgreed: true,
    caregiverCareType: "both",
    caregiverCity: "San Francisco",
    caregiverState: "CA",
    caregiverZip: "94105",
    caregiverHomePhone: "(555) 666-7777",

    // Backup Caregiver Information
    backupCaregiverName: "Lisa Brown",
    backupCaregiverPhone: "(555) 888-9999",
    backupCaregiverAddress: "321 Backup Street",
    backupCaregiverEmail: "lisa.brown@example.com",
    backupCaregiverRelationship: "Neighbor",
    backupCaregiverHasKey: true,
    backupCaregiverHasAgreed: true,
    backupCaregiverCareType: "both",
    backupCaregiverCity: "San Francisco",
    backupCaregiverState: "CA",
    backupCaregiverZip: "94105",
    backupCaregiverHomePhone: "(555) 000-1111",

    // Trustee Information
    trusteeName: "Robert Taylor",
    trusteeAddress: "654 Trustee Lane",
    trusteeCity: "San Francisco",
    trusteeState: "CA",
    trusteeZip: "94105",
    trusteeHomePhone: "(555) 222-3333",
    trusteeCellPhone: "(555) 444-5555",
    trusteeEmail: "robert.taylor@example.com",
    trusteeAllocation: "5000",
    trustFundType: "bank-account",
    remainingFundsOrg2ndChance: "50",
    remainingFundsOrgOther: "50",
    remainingFundsOrgOtherAddress: "789 Charity Street",
    remainingFundsOtherBeneficiary: "Local Animal Shelter",

    // Terms and Agreements
    agreeToTerms: true,
  };

  // Create a form instance with the sample data
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: sampleData,
    mode: "onChange",
  });

  return <InitialForm methods={methods} />;
};

export default TestForm;
