import React, { useState, useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Input,
  Textarea,
  Checkbox,
  Select,
  SelectItem,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Logo from "../assets/logo.png";

// Define jsPDF with autoTable type
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDFWithAutoTable;
  lastAutoTable: {
    finalY: number;
  };
}

// Form validation schema
const schema = yup.object().shape({
  // Pet Owner Information
  ownerName: yup.string().required("Owner name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipCode: yup.string().required("Zip code is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),

  // Emergency Contact Information (New section)
  emergencyContactName: yup
    .string()
    .required("Emergency contact name is required"),
  emergencyContactPhone: yup
    .string()
    .required("Emergency contact phone is required"),
  emergencyContactRelationship: yup
    .string()
    .required("Relationship is required"),

  // Emergency Care Information
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

  // Serious Illness and Death Care
  illnessDecision: yup.string(),
  deathCarePreference: yup.string(),
  deathCareBudget: yup.string(),

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
  caregiverCareType: yup.string(), // short-term, long-term, or both
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
  backupCaregiverCareType: yup.string(), // short-term, long-term, or both
  backupCaregiverCity: yup.string(),
  backupCaregiverState: yup.string(),
  backupCaregiverZip: yup.string(),
  backupCaregiverHomePhone: yup.string(),

  // Pet Sitters and Boarding Facilities
  petSitterContact: yup.string(),
  petSitterAddress: yup.string(),
  petSitterCity: yup.string(),
  petSitterState: yup.string(),
  petSitterZip: yup.string(),
  petSitterHomePhone: yup.string(),
  petSitterCellPhone: yup.string(),
  petSitterEmail: yup.string().email("Invalid email"),
  petSitterDailyCharge: yup.string(),

  // Emergency Contact Info
  emergencyContact1: yup.string(),
  emergencyContact1Address: yup.string(),
  emergencyContact1City: yup.string(),
  emergencyContact1State: yup.string(),
  emergencyContact1Zip: yup.string(),
  emergencyContact1HomePhone: yup.string(),
  emergencyContact1CellPhone: yup.string(),
  emergencyContact1Email: yup.string().email("Invalid email"),

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

const InitialForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [pdfGenerationStatus, setPdfGenerationStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = methods;

  // // Add useEffect to ensure jsPDF is properly initialized
  // useEffect(() => {
  //   // Polyfill for URL.createObjectURL in older browsers if needed
  //   if (typeof window !== "undefined" && !window.URL) {
  //     window.URL = window.URL || window.webkitURL || window.mozURL || window;
  //   }
  // }, []);

  const onSubmit = (data: FormData) => {
    console.log("Form submitted with data:", data);
    try {
      setPdfGenerationStatus("loading");
      setTimeout(() => {
        try {
          console.log("Generating PDF...");
          generatePDF(data);
          console.log("PDF generated successfully");
          setPdfGenerationStatus("success");
          onOpen(); // Open success modal
        } catch (error) {
          console.error("Error generating PDF:", error);
          setPdfGenerationStatus("error");
          onOpen(); // Open error modal
        }
      }, 500); // Small delay to ensure UI updates
    } catch (error) {
      console.error("Error in onSubmit:", error);
      setPdfGenerationStatus("error");
      onOpen(); // Open error modal
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const generatePDF = (data: FormData) => {
    try {
      // Create a basic PDF using vanilla jsPDF (avoiding autoTable)
      const doc = new jsPDF();

      // Set title
      doc.setFontSize(20);
      doc.setTextColor(94, 53, 147); // #5E3593
      doc.text("2nd Chance For Pets - Pet Care Form", 105, 15, {
        align: "center",
      });

      // Reset text color and size
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);

      // Add sections with simple text
      let y = 30;

      // Owner Information
      doc.setFontSize(16);
      doc.text("Pet Owner Information", 14, y);
      doc.setFontSize(12);
      y += 10;

      doc.text(`Owner Name: ${data.ownerName}`, 20, y);
      y += 8;
      doc.text(`Address: ${data.address}`, 20, y);
      y += 8;
      doc.text(
        `City/State/Zip: ${data.city}, ${data.state} ${data.zipCode}`,
        20,
        y,
      );
      y += 8;
      doc.text(`Phone: ${data.phone}`, 20, y);
      y += 8;
      doc.text(`Email: ${data.email}`, 20, y);
      y += 15;

      // Emergency Contact Information
      doc.setFontSize(16);
      doc.text("Emergency Contact Information", 14, y);
      doc.setFontSize(12);
      y += 10;

      doc.text(`Name: ${data.emergencyContactName || ""}`, 20, y);
      y += 8;
      doc.text(`Phone: ${data.emergencyContactPhone || ""}`, 20, y);
      y += 8;
      doc.text(
        `Relationship: ${data.emergencyContactRelationship || ""}`,
        20,
        y,
      );
      y += 15;

      // Check if we need a new page
      if (y > 230) {
        doc.addPage();
        y = 20;
      }

      // Pet Information
      doc.setFontSize(16);
      doc.text("Pet Information", 14, y);
      doc.setFontSize(12);
      y += 10;

      doc.text(`Pet Name: ${data.petName}`, 20, y);
      y += 8;
      doc.text(`Type: ${data.petType}`, 20, y);
      y += 8;
      doc.text(`Breed: ${data.breed}`, 20, y);
      y += 8;
      doc.text(`Age: ${data.age}`, 20, y);
      y += 8;
      doc.text(`Gender: ${data.gender}`, 20, y);
      y += 8;
      doc.text(`Spayed/Neutered: ${data.spayedNeutered ? "Yes" : "No"}`, 20, y);
      y += 8;
      doc.text(`Color: ${data.color}`, 20, y);
      y += 8;

      if (data.microchipId) {
        doc.text(`Microchip ID: ${data.microchipId}`, 20, y);
        y += 8;
      }

      // Pet Insurance Information
      if (data.hasInsurance) {
        doc.setFontSize(16);
        doc.text("Pet Health Insurance", 14, y);
        doc.setFontSize(12);
        y += 10;

        if (data.petInsurance) {
          doc.text(`Insurance Provider: ${data.petInsurance}`, 20, y);
          y += 8;
        }

        if (data.insurancePhone) {
          doc.text(`Provider Phone: ${data.insurancePhone}`, 20, y);
          y += 8;
        }

        if (data.insurancePolicy) {
          doc.text(`Policy Number: ${data.insurancePolicy}`, 20, y);
          y += 8;
        }

        if (data.insuranceCost) {
          doc.text(`Cost per year: $${data.insuranceCost}`, 20, y);
          y += 12;
        }
      }

      // Check if we need a new page
      if (y > 230) {
        doc.addPage();
        y = 20;
      }

      // Feeding Information
      if (data.specialDiet || data.feedingSchedule) {
        doc.setFontSize(16);
        doc.text("Feeding Information", 14, y);
        doc.setFontSize(12);
        y += 10;

        if (data.specialDiet) {
          doc.text(`Special Diet: ${data.specialDiet}`, 20, y);
          y += 8;
        }

        if (data.feedingSchedule) {
          doc.text(`Feeding Schedule: ${data.feedingSchedule}`, 20, y);
          y += 15;
        } else {
          y += 7;
        }
      }

      // Check if we need a new page
      if (y > 230) {
        doc.addPage();
        y = 20;
      }

      // Medical Information
      doc.setFontSize(16);
      doc.text("Medical Information", 14, y);
      doc.setFontSize(12);
      y += 10;

      if (data.medicalConditions) {
        doc.text(`Medical Conditions: ${data.medicalConditions}`, 20, y);
        y += 8;
      }

      if (data.medications) {
        doc.text(`Medications: ${data.medications}`, 20, y);
        y += 8;
      }

      if (data.allergies) {
        doc.text(`Allergies: ${data.allergies}`, 20, y);
        y += 8;
      }

      if (data.behavioralNotes) {
        doc.text(`Behavioral Notes: ${data.behavioralNotes}`, 20, y);
        y += 15;
      } else {
        y += 7;
      }

      // Check if we need a new page
      if (y > 230) {
        doc.addPage();
        y = 20;
      }

      // End of Life Care Information
      doc.setFontSize(16);
      doc.text("End of Life Care Decisions", 14, y);
      doc.setFontSize(12);
      y += 10;

      // Serious Illness
      doc.text("In Case of Serious Illness:", 20, y);
      y += 8;

      let illnessDecisionText = "Not specified";
      if (data.illnessDecision === "vet") {
        illnessDecisionText =
          "My veterinarian should make the decision if my pet should be euthanized.";
      } else if (data.illnessDecision === "caregiver") {
        illnessDecisionText =
          "My caregiver should make the decision if my pet should be euthanized.";
      } else if (data.illnessDecision === "consult") {
        illnessDecisionText =
          "My emergency contacts should consult the caregiver and veterinarian to make any decision about the euthanization of my pet.";
      }

      doc.text(illnessDecisionText, 25, y);
      y += 15;

      // Death Care
      doc.text("In Case of Death:", 20, y);
      y += 8;

      let deathCareText = "Not specified";
      if (data.deathCarePreference === "burial") {
        deathCareText = "Burial";
      } else if (data.deathCarePreference === "cremation") {
        deathCareText = "Cremation";
      } else if (data.deathCarePreference === "pet-cemetery") {
        deathCareText = "Local Pet Cemetery";
      } else if (data.deathCarePreference === "caregiver-determine") {
        deathCareText = "Caregiver can determine";
      }

      doc.text(`Remains care preference: ${deathCareText}`, 25, y);
      y += 8;

      if (data.deathCareBudget) {
        doc.text(
          `Allocated budget for remains care: $${data.deathCareBudget}`,
          25,
          y,
        );
        y += 15;
      }

      // Check if we need a new page
      if (y > 230) {
        doc.addPage();
        y = 20;
      }

      // Veterinarian Information
      doc.setFontSize(16);
      doc.text("Veterinarian Information", 14, y);
      doc.setFontSize(12);
      y += 10;

      doc.text(`Name: ${data.veterinarianName}`, 20, y);
      y += 8;
      doc.text(`Phone: ${data.veterinarianPhone}`, 20, y);
      y += 8;

      if (data.veterinarianAddress) {
        doc.text(`Address: ${data.veterinarianAddress}`, 20, y);
        y += 8;
      }

      if (data.veterinarianEmail) {
        doc.text(`Email: ${data.veterinarianEmail}`, 20, y);
        y += 15;
      } else {
        y += 7;
      }

      // Check if we need a new page
      if (y > 230) {
        doc.addPage();
        y = 20;
      }

      // Caregiver Information
      doc.setFontSize(16);
      doc.text("Primary Caregiver Information", 14, y);
      doc.setFontSize(12);
      y += 10;

      doc.text(`Name: ${data.caregiverName}`, 20, y);
      y += 8;
      doc.text(`Phone: ${data.caregiverPhone}`, 20, y);
      y += 8;
      doc.text(`Address: ${data.caregiverAddress}`, 20, y);
      y += 8;

      if (data.caregiverEmail) {
        doc.text(`Email: ${data.caregiverEmail}`, 20, y);
        y += 8;
      }

      if (data.caregiverRelationship) {
        doc.text(`Relationship: ${data.caregiverRelationship}`, 20, y);
        y += 8;
      }

      doc.text(
        `Has Key to Home: ${data.caregiverHasKey ? "Yes" : "No"}`,
        20,
        y,
      );
      y += 15;

      // Check if we need a new page
      if (y > 230) {
        doc.addPage();
        y = 20;
      }

      // Backup Caregiver Information
      doc.setFontSize(16);
      doc.text("Backup Caregiver Information", 14, y);
      doc.setFontSize(12);
      y += 10;

      doc.text(`Name: ${data.backupCaregiverName}`, 20, y);
      y += 8;
      doc.text(`Phone: ${data.backupCaregiverPhone}`, 20, y);
      y += 8;
      doc.text(`Address: ${data.backupCaregiverAddress}`, 20, y);
      y += 8;

      if (data.backupCaregiverEmail) {
        doc.text(`Email: ${data.backupCaregiverEmail}`, 20, y);
        y += 8;
      }

      if (data.backupCaregiverRelationship) {
        doc.text(`Relationship: ${data.backupCaregiverRelationship}`, 20, y);
        y += 8;
      }

      doc.text(
        `Has Key to Home: ${data.backupCaregiverHasKey ? "Yes" : "No"}`,
        20,
        y,
      );
      y += 15;

      // Check if we need a new page
      if (y > 230) {
        doc.addPage();
        y = 20;
      }

      // Trustee Information
      if (data.trusteeName || data.trusteeAddress || data.trusteeAllocation) {
        doc.setFontSize(16);
        doc.text("Trustee Information", 14, y);
        doc.setFontSize(12);
        y += 10;

        if (data.trusteeName) {
          doc.text(`Trustee Name: ${data.trusteeName}`, 20, y);
          y += 8;
        }

        if (data.trusteeAddress) {
          doc.text(`Address: ${data.trusteeAddress}`, 20, y);
          y += 8;
        }

        if (data.trusteeCity || data.trusteeState || data.trusteeZip) {
          doc.text(
            `City/State/Zip: ${data.trusteeCity || ""}, ${data.trusteeState || ""} ${data.trusteeZip || ""}`,
            20,
            y,
          );
          y += 8;
        }

        if (data.trusteeHomePhone) {
          doc.text(`Home Phone: ${data.trusteeHomePhone}`, 20, y);
          y += 8;
        }

        if (data.trusteeCellPhone) {
          doc.text(`Cell Phone: ${data.trusteeCellPhone}`, 20, y);
          y += 8;
        }

        if (data.trusteeEmail) {
          doc.text(`Email: ${data.trusteeEmail}`, 20, y);
          y += 8;
        }

        if (data.trusteeAllocation) {
          doc.text(
            `Annual Allocation: $${data.trusteeAllocation}/year for caregiver`,
            20,
            y,
          );
          y += 12;
        }

        // Trust Fund Information
        doc.text("Trust Fund Information:", 20, y);
        y += 8;

        let fundingMethod = "Not specified";
        if (data.trustFundType === "bank-account") {
          fundingMethod = "Bank Account Tied to Will";
        } else if (data.trustFundType === "life-insurance") {
          fundingMethod =
            "Life Insurance policy designates trust as beneficiary";
        } else if (
          data.trustFundType === "other-fund" &&
          data.trustFundOtherExplanation
        ) {
          fundingMethod = `Other: ${data.trustFundOtherExplanation}`;
        }

        doc.text(`Funding Method: ${fundingMethod}`, 25, y);
        y += 12;

        // Remaining Funds
        doc.text("Remaining Funds Distribution:", 20, y);
        y += 8;

        if (data.remainingFundsOrg2ndChance) {
          doc.text(
            `2nd Chance 4 Pets: ${data.remainingFundsOrg2ndChance}%`,
            25,
            y,
          );
          y += 8;
        }

        if (data.remainingFundsOrgOther) {
          doc.text(
            `Other pet welfare org: ${data.remainingFundsOrgOther}%`,
            25,
            y,
          );
          y += 8;

          if (data.remainingFundsOrgOtherAddress) {
            doc.text(`Address: ${data.remainingFundsOrgOtherAddress}`, 30, y);
            y += 8;
          }
        }

        if (data.remainingFundsOtherBeneficiary) {
          doc.text(
            `Other beneficiary: ${data.remainingFundsOtherBeneficiary}`,
            25,
            y,
          );
          y += 12;
        }
      }

      // Check if we need a new page
      if (y > 230) {
        doc.addPage();
        y = 20;
      }

      // Agreement
      doc.setFontSize(16);
      doc.text("Agreement", 14, y);
      doc.setFontSize(12);
      y += 10;

      doc.text(
        "I hereby authorize the designated caregivers to make health and welfare",
        20,
        y,
      );
      y += 8;
      doc.text(
        "decisions for my pet(s) in the event I am unable to do so.",
        20,
        y,
      );
      y += 20;

      doc.text("Signature: _______________________________", 20, y);
      y += 10;
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, y);

      // Save the PDF - this is the critical line that triggers the download
      doc.save("pet_care_form.pdf");

      console.log("PDF generated successfully");
      return true;
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw error;
    }
  };

  // Direct PDF generation method without form submission
  const generatePDFDirectly = () => {
    try {
      console.log("Direct PDF generation triggered");
      const formData = methods.getValues();
      if (!methods.formState.isValid) {
        alert("Please complete all required fields before generating the PDF");
        return;
      }

      // Create a new PDF
      const doc = new jsPDF();

      // Add a title
      doc.setFontSize(22);
      doc.setTextColor(94, 53, 147); // #5E3593
      doc.text("2nd Chance For Pets Form", 105, 20, { align: "center" });
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 30, {
        align: "center",
      });

      // Add form data in a simplified format
      let y = 40;

      // Pet Owner
      doc.setFontSize(16);
      doc.text("Pet Owner", 20, y);
      y += 10;
      doc.setFontSize(12);

      doc.text(`Name: ${formData.ownerName || ""}`, 20, y);
      y += 8;
      doc.text(
        `Contact: ${formData.phone || ""} / ${formData.email || ""}`,
        20,
        y,
      );
      y += 8;
      doc.text(
        `Address: ${formData.address || ""}, ${formData.city || ""}, ${formData.state || ""} ${formData.zipCode || ""}`,
        20,
        y,
      );
      y += 15;

      // Pet Information
      doc.setFontSize(16);
      doc.text("Pet Information", 20, y);
      y += 10;
      doc.setFontSize(12);

      doc.text(
        `Pet: ${formData.petName || ""} - ${formData.petType || ""} - ${formData.breed || ""}`,
        20,
        y,
      );
      y += 8;
      doc.text(
        `Details: ${formData.age || ""} year(s), ${formData.gender || ""}, ${formData.color || ""}`,
        20,
        y,
      );
      y += 8;

      if (
        formData.medicalConditions ||
        formData.medications ||
        formData.allergies
      ) {
        doc.text("Health Notes:", 20, y);
        y += 8;
        if (formData.medicalConditions) {
          doc.text(
            `• Medical Conditions: ${formData.medicalConditions}`,
            25,
            y,
          );
          y += 8;
        }
        if (formData.medications) {
          doc.text(`• Medications: ${formData.medications}`, 25, y);
          y += 8;
        }
        if (formData.allergies) {
          doc.text(`• Allergies: ${formData.allergies}`, 25, y);
          y += 8;
        }
      }
      y += 7;

      // Pet Insurance
      if (formData.hasInsurance) {
        doc.text(
          `Insurance: ${formData.petInsurance || "Not specified"}`,
          20,
          y,
        );
        y += 8;
        if (formData.insurancePolicy) {
          doc.text(`Policy: ${formData.insurancePolicy}`, 20, y);
          y += 8;
        }
      }
      y += 7;

      // End of Life Care
      doc.text("End of Life Care:", 20, y);
      y += 8;

      // Illness Decision
      let illnessDecision = "Not specified";
      if (formData.illnessDecision === "vet") {
        illnessDecision = "Veterinarian decides";
      } else if (formData.illnessDecision === "caregiver") {
        illnessDecision = "Caregiver decides";
      } else if (formData.illnessDecision === "consult") {
        illnessDecision = "Consultation required";
      }
      doc.text(`• Serious Illness: ${illnessDecision}`, 25, y);
      y += 8;

      // Death Care
      let deathCare = "Not specified";
      if (formData.deathCarePreference === "burial") {
        deathCare = "Burial";
      } else if (formData.deathCarePreference === "cremation") {
        deathCare = "Cremation";
      } else if (formData.deathCarePreference === "pet-cemetery") {
        deathCare = "Pet Cemetery";
      } else if (formData.deathCarePreference === "caregiver-determine") {
        deathCare = "Caregiver determines";
      }
      doc.text(`• Death Care: ${deathCare}`, 25, y);
      y += 8;

      if (formData.deathCareBudget) {
        doc.text(`• Budget for Remains: $${formData.deathCareBudget}`, 25, y);
        y += 8;
      }
      y += 7;

      // Caregiver Information
      doc.setFontSize(16);
      doc.text("Caregiver Information", 20, y);
      y += 10;
      doc.setFontSize(12);

      doc.text(
        `Primary: ${formData.caregiverName || ""} (${formData.caregiverPhone || ""})`,
        20,
        y,
      );
      y += 8;
      doc.text(
        `Backup: ${formData.backupCaregiverName || ""} (${formData.backupCaregiverPhone || ""})`,
        20,
        y,
      );
      y += 15;

      // Trustee Information (if available)
      if (
        formData.trusteeName ||
        formData.trusteeAllocation ||
        formData.trustFundType
      ) {
        doc.setFontSize(16);
        doc.text("Trustee & Trust Information", 20, y);
        y += 10;
        doc.setFontSize(12);

        if (formData.trusteeName) {
          doc.text(`Trustee: ${formData.trusteeName}`, 20, y);
          y += 8;
        }

        if (formData.trusteeAllocation) {
          doc.text(`Annual Allocation: $${formData.trusteeAllocation}`, 20, y);
          y += 8;
        }

        // Trust Fund Type
        let fundingMethod = "Not specified";
        if (formData.trustFundType === "bank-account") {
          fundingMethod = "Bank Account";
        } else if (formData.trustFundType === "life-insurance") {
          fundingMethod = "Life Insurance";
        } else if (formData.trustFundType === "other-fund") {
          fundingMethod = "Other";
        }

        doc.text(`Funding Method: ${fundingMethod}`, 20, y);
        y += 8;

        // Remaining Funds
        if (
          formData.remainingFundsOrg2ndChance ||
          formData.remainingFundsOrgOther
        ) {
          doc.text("Funds Distribution: ", 20, y);
          y += 8;

          if (formData.remainingFundsOrg2ndChance) {
            doc.text(
              `• 2nd Chance 4 Pets: ${formData.remainingFundsOrg2ndChance}%`,
              25,
              y,
            );
            y += 8;
          }

          if (formData.remainingFundsOrgOther) {
            doc.text(`• Other org: ${formData.remainingFundsOrgOther}%`, 25, y);
            y += 8;
          }
        }

        y += 7;
      }

      // Veterinarian
      doc.setFontSize(16);
      doc.text("Veterinarian", 20, y);
      y += 10;
      doc.setFontSize(12);

      doc.text(`Name: ${formData.veterinarianName || ""}`, 20, y);
      y += 8;
      doc.text(`Phone: ${formData.veterinarianPhone || ""}`, 20, y);
      y += 20;

      // Agreement
      doc.text(
        "By downloading this form, I confirm all information is accurate to the best of my knowledge.",
        20,
        y,
      );
      y += 20;

      doc.text("Signature: _______________________________", 20, y);
      y += 10;
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, y);

      // Save the PDF
      try {
        doc.save("pet_form.pdf");
        console.log("PDF saved successfully");
        return true;
      } catch (err) {
        console.error("Error saving PDF:", err);
        throw err;
      }
    } catch (err) {
      console.error("Error in direct PDF generation:", err);
      return false;
    }
  };

  return (
    <div className="h-screen bg-gray-50">
      <div className="flex">
        <img
          src={Logo}
          className="w-[55.6px] h-[109.7px] mt-[25.98px] ml-[33.9px]"
          alt="Second Chance 4 Pets Logo"
        />
        <h1 className="w-[160.64px] h-[78px] mt-[48.4px] ml-[15px] font-[Inter] text-[24px] font-bold leading-[28.73px] text-left text-[#5E3593]">
          2nd Chance For Pets
        </h1>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-[#5E3593] mb-8">
          Pet Care Form
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full flex-grow mx-1 ${
                    index + 1 <= step ? "bg-[#5E3593]" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-gray-600">
              Step {step} of 6:{" "}
              {step === 1
                ? "Owner & Emergency Contact"
                : step === 2
                  ? "Pet Details & Care"
                  : step === 3
                    ? "Veterinarian Information"
                    : step === 4
                      ? "Caregiver Information"
                      : step === 5
                        ? "Trustee Information"
                        : "Review & Submit"}
            </p>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#5E3593] mb-4">
                    Pet Owner Information
                  </h2>

                  <Controller
                    name="ownerName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Full Name"
                        placeholder="Enter your full name"
                        isInvalid={!!errors.ownerName}
                        errorMessage={errors.ownerName?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Address"
                        placeholder="Enter your address"
                        isInvalid={!!errors.address}
                        errorMessage={errors.address?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="City"
                          placeholder="City"
                          isInvalid={!!errors.city}
                          errorMessage={errors.city?.message}
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="state"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="State"
                          placeholder="State"
                          isInvalid={!!errors.state}
                          errorMessage={errors.state?.message}
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="zipCode"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Zip Code"
                          placeholder="Zip Code"
                          isInvalid={!!errors.zipCode}
                          errorMessage={errors.zipCode?.message}
                          className="w-full"
                        />
                      )}
                    />
                  </div>

                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Phone Number"
                        placeholder="(123) 456-7890"
                        isInvalid={!!errors.phone}
                        errorMessage={errors.phone?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Email Address"
                        placeholder="email@example.com"
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <h2 className="text-xl font-semibold text-[#5E3593] mt-8 mb-4">
                    Emergency Contact Information
                  </h2>

                  <Controller
                    name="emergencyContactName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Emergency Contact Name"
                        placeholder="Enter emergency contact name"
                        isInvalid={!!errors.emergencyContactName}
                        errorMessage={errors.emergencyContactName?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="emergencyContactPhone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Emergency Contact Phone"
                        placeholder="(123) 456-7890"
                        isInvalid={!!errors.emergencyContactPhone}
                        errorMessage={errors.emergencyContactPhone?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="emergencyContactRelationship"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Relationship to You"
                        placeholder="Friend, Family, etc."
                        isInvalid={!!errors.emergencyContactRelationship}
                        errorMessage={
                          errors.emergencyContactRelationship?.message
                        }
                        className="w-full"
                      />
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#5E3593] mb-4">
                    Pet Information
                  </h2>

                  <Controller
                    name="petName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Pet Name"
                        placeholder="Enter pet's name"
                        isInvalid={!!errors.petName}
                        errorMessage={errors.petName?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="petType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Pet Type"
                          placeholder="Select pet type"
                          isInvalid={!!errors.petType}
                          errorMessage={errors.petType?.message}
                          className="w-full"
                        >
                          <SelectItem key="dog" value="Dog">
                            Dog
                          </SelectItem>
                          <SelectItem key="cat" value="Cat">
                            Cat
                          </SelectItem>
                          <SelectItem key="bird" value="Bird">
                            Bird
                          </SelectItem>
                          <SelectItem key="other" value="Other">
                            Other
                          </SelectItem>
                        </Select>
                      )}
                    />

                    <Controller
                      name="breed"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Breed"
                          placeholder="Enter breed"
                          isInvalid={!!errors.breed}
                          errorMessage={errors.breed?.message}
                          className="w-full"
                        />
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="age"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          label="Age"
                          placeholder="Enter age"
                          isInvalid={!!errors.age}
                          errorMessage={errors.age?.message}
                          className="w-full"
                          value={field.value?.toString() || ""}
                        />
                      )}
                    />

                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Gender"
                          placeholder="Select gender"
                          isInvalid={!!errors.gender}
                          errorMessage={errors.gender?.message}
                          className="w-full"
                        >
                          <SelectItem key="male" value="Male">
                            Male
                          </SelectItem>
                          <SelectItem key="female" value="Female">
                            Female
                          </SelectItem>
                        </Select>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="color"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Color/Markings"
                          placeholder="Enter color and markings"
                          isInvalid={!!errors.color}
                          errorMessage={errors.color?.message}
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="spayedNeutered"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center h-full pt-8">
                          <Checkbox
                            isSelected={field.value}
                            onValueChange={(checked) => field.onChange(checked)}
                            name={field.name}
                            ref={field.ref}
                          >
                            Spayed/Neutered
                          </Checkbox>
                        </div>
                      )}
                    />
                  </div>

                  <Controller
                    name="microchipId"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Microchip ID (if applicable)"
                        placeholder="Enter microchip ID"
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="specialDiet"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Special Diet Requirements"
                        placeholder="Describe any special diet needs"
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="feedingSchedule"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Feeding Schedule"
                        placeholder="Describe feeding routine and amounts"
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="medicalConditions"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Medical Conditions"
                        placeholder="List any medical conditions"
                        isInvalid={!!errors.medicalConditions}
                        errorMessage={errors.medicalConditions?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="medications"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Medications"
                        placeholder="List any medications and dosage instructions"
                        isInvalid={!!errors.medications}
                        errorMessage={errors.medications?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="allergies"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Allergies"
                        placeholder="List any known allergies"
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="behavioralNotes"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Behavioral Notes"
                        placeholder="Any important behavioral information caregivers should know"
                        className="w-full"
                      />
                    )}
                  />

                  <h2 className="text-xl font-semibold text-[#5E3593] mt-8 mb-4">
                    Pet Health Insurance
                  </h2>

                  <div className="mb-4">
                    <Controller
                      name="hasInsurance"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center">
                          <p className="mr-4">
                            Do you currently own a pet insurance policy?
                          </p>
                          <Checkbox
                            isSelected={field.value}
                            onValueChange={(checked) => field.onChange(checked)}
                            name={field.name}
                            ref={field.ref}
                          >
                            Yes
                          </Checkbox>
                        </div>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="petInsurance"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Name of Provider"
                          placeholder="Enter insurance provider if any"
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="insurancePhone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Phone"
                          placeholder="(123) 456-7890"
                          className="w-full"
                        />
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="insurancePolicy"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Policy Number"
                          placeholder="Enter policy number"
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="insuranceCost"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Cost per year"
                          placeholder="Enter yearly cost"
                          className="w-full"
                        />
                      )}
                    />
                  </div>

                  <h2 className="text-xl font-semibold text-[#5E3593] mt-8 mb-4">
                    In Case of Serious Illness
                  </h2>

                  <div className="mb-4">
                    <p className="mb-2">Should my pet become seriously ill:</p>
                    <Controller
                      name="illnessDecision"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-2 ml-4">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="vet-decision"
                              value="vet"
                              checked={field.value === "vet"}
                              onChange={() => field.onChange("vet")}
                              className="mr-2"
                            />
                            <label htmlFor="vet-decision">
                              My veterinarian should make the decision if my pet
                              should be euthanized.
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="caregiver-decision"
                              value="caregiver"
                              checked={field.value === "caregiver"}
                              onChange={() => field.onChange("caregiver")}
                              className="mr-2"
                            />
                            <label htmlFor="caregiver-decision">
                              My caregiver should make the decision if my pet
                              should be euthanized.
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="consult-decision"
                              value="consult"
                              checked={field.value === "consult"}
                              onChange={() => field.onChange("consult")}
                              className="mr-2"
                            />
                            <label htmlFor="consult-decision">
                              My emergency contacts should consult the caregiver
                              and veterinarian to make any decision about the
                              euthanization of my pet.
                            </label>
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  <h2 className="text-xl font-semibold text-[#5E3593] mt-8 mb-4">
                    In Case of Death
                  </h2>

                  <div className="mb-4">
                    <p className="mb-2">
                      When your pet dies, how do you want the pet's remains to
                      be cared for?
                    </p>
                    <Controller
                      name="deathCarePreference"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-2 ml-4">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="burial"
                              value="burial"
                              checked={field.value === "burial"}
                              onChange={() => field.onChange("burial")}
                              className="mr-2"
                            />
                            <label htmlFor="burial">Burial</label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="cremation"
                              value="cremation"
                              checked={field.value === "cremation"}
                              onChange={() => field.onChange("cremation")}
                              className="mr-2"
                            />
                            <label htmlFor="cremation">Cremation</label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="pet-cemetery"
                              value="pet-cemetery"
                              checked={field.value === "pet-cemetery"}
                              onChange={() => field.onChange("pet-cemetery")}
                              className="mr-2"
                            />
                            <label htmlFor="pet-cemetery">
                              Local Pet Cemetery
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="caregiver-determine"
                              value="caregiver-determine"
                              checked={field.value === "caregiver-determine"}
                              onChange={() =>
                                field.onChange("caregiver-determine")
                              }
                              className="mr-2"
                            />
                            <label htmlFor="caregiver-determine">
                              Caregiver can determine
                            </label>
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  <Controller
                    name="deathCareBudget"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="I would like to allocate $ for the cost of caring for my pet's remains"
                        placeholder="Enter amount"
                        description="You may want to include an allowance for any special markers, urns or caskets in this amount."
                        className="w-full"
                      />
                    )}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#5E3593] mb-4">
                    Veterinarian Information
                  </h2>

                  <Controller
                    name="veterinarianName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Veterinarian Name"
                        placeholder="Enter veterinarian's name"
                        isInvalid={!!errors.veterinarianName}
                        errorMessage={errors.veterinarianName?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="veterinarianPhone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Veterinarian Phone"
                        placeholder="(123) 456-7890"
                        isInvalid={!!errors.veterinarianPhone}
                        errorMessage={errors.veterinarianPhone?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="veterinarianAddress"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Veterinarian Address"
                        placeholder="Enter veterinarian's clinic address"
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="veterinarianEmail"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Veterinarian Email"
                        placeholder="Enter veterinarian's email address"
                        isInvalid={!!errors.veterinarianEmail}
                        errorMessage={errors.veterinarianEmail?.message}
                        className="w-full"
                      />
                    )}
                  />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#5E3593] mb-4">
                    CAREGIVER INFORMATION
                  </h2>

                  <p className="text-sm mb-4">
                    Carefully select a minimum of two caregivers who agree to be
                    responsible for your pets should anything happen to you.
                    Caregivers are typically responsible for the day-to-day care
                    of your pets. They should fully understand the obligation
                    and requirements for this role. Your choice of caregivers
                    should take into consideration the potential lifespan of
                    your pets.
                  </p>

                  <h3 className="text-lg font-semibold text-[#5E3593] mb-2">
                    Primary Caregiver
                  </h3>

                  <div className="mb-4">
                    <Controller
                      name="caregiverHasAgreed"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center">
                          <p className="mr-4">
                            This caregiver has agreed to care for my pets should
                            anything happen to me
                          </p>
                          <div className="flex gap-4">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="caregiver-agreed-yes"
                                checked={field.value === true}
                                onChange={() => field.onChange(true)}
                                className="mr-2"
                              />
                              <label htmlFor="caregiver-agreed-yes">Yes</label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="caregiver-agreed-no"
                                checked={field.value === false}
                                onChange={() => field.onChange(false)}
                                className="mr-2"
                              />
                              <label htmlFor="caregiver-agreed-no">No</label>
                            </div>
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  <div className="mb-4">
                    <Controller
                      name="caregiverCareType"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center">
                          <p className="mr-4">This caregiver will provide</p>
                          <div className="flex gap-4">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="caregiver-care-short"
                                checked={field.value?.includes("short-term")}
                                onChange={(e) => {
                                  let value = field.value || "";
                                  if (e.target.checked) {
                                    field.onChange(value + " short-term care");
                                  } else {
                                    field.onChange(
                                      value.replace("short-term care", ""),
                                    );
                                  }
                                }}
                                className="mr-2"
                              />
                              <label htmlFor="caregiver-care-short">
                                short-term care
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="caregiver-care-long"
                                checked={field.value?.includes("long-term")}
                                onChange={(e) => {
                                  let value = field.value || "";
                                  if (e.target.checked) {
                                    field.onChange(value + " long-term care");
                                  } else {
                                    field.onChange(
                                      value.replace("long-term care", ""),
                                    );
                                  }
                                }}
                                className="mr-2"
                              />
                              <label htmlFor="caregiver-care-long">
                                long-term care
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="caregiver-care-both"
                                checked={field.value?.includes("both")}
                                onChange={(e) => {
                                  let value = field.value || "";
                                  if (e.target.checked) {
                                    field.onChange("both");
                                  } else {
                                    field.onChange(value.replace("both", ""));
                                  }
                                }}
                                className="mr-2"
                              />
                              <label htmlFor="caregiver-care-both">both</label>
                            </div>
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  <Controller
                    name="caregiverName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Caregiver Name"
                        placeholder="Enter caregiver's name"
                        isInvalid={!!errors.caregiverName}
                        errorMessage={errors.caregiverName?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="caregiverAddress"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Address"
                        placeholder="Enter caregiver's address"
                        isInvalid={!!errors.caregiverAddress}
                        errorMessage={errors.caregiverAddress?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <Controller
                      name="caregiverCity"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="City"
                          placeholder="City"
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="caregiverState"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="State"
                          placeholder="State"
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="caregiverZip"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Zip"
                          placeholder="Zip Code"
                          className="w-full"
                        />
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="caregiverHomePhone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Home Phone"
                          placeholder="(123) 456-7890"
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="caregiverPhone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Cell Phone"
                          placeholder="(123) 456-7890"
                          isInvalid={!!errors.caregiverPhone}
                          errorMessage={errors.caregiverPhone?.message}
                          className="w-full"
                        />
                      )}
                    />
                  </div>

                  <Controller
                    name="caregiverEmail"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Email"
                        placeholder="Enter caregiver's email"
                        isInvalid={!!errors.caregiverEmail}
                        errorMessage={errors.caregiverEmail?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <h3 className="text-lg font-semibold text-[#5E3593] mt-8 mb-2">
                    Alternate Caregiver
                  </h3>

                  <div className="mb-4">
                    <Controller
                      name="backupCaregiverHasAgreed"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center">
                          <p className="mr-4">
                            This caregiver has agreed to care for my pets should
                            anything happen to me
                          </p>
                          <div className="flex gap-4">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="backup-caregiver-agreed-yes"
                                checked={field.value === true}
                                onChange={() => field.onChange(true)}
                                className="mr-2"
                              />
                              <label htmlFor="backup-caregiver-agreed-yes">
                                Yes
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="backup-caregiver-agreed-no"
                                checked={field.value === false}
                                onChange={() => field.onChange(false)}
                                className="mr-2"
                              />
                              <label htmlFor="backup-caregiver-agreed-no">
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  <div className="mb-4">
                    <Controller
                      name="backupCaregiverCareType"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center">
                          <p className="mr-4">This caregiver will provide</p>
                          <div className="flex gap-4">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="backup-caregiver-care-short"
                                checked={field.value?.includes("short-term")}
                                onChange={(e) => {
                                  let value = field.value || "";
                                  if (e.target.checked) {
                                    field.onChange(value + " short-term care");
                                  } else {
                                    field.onChange(
                                      value.replace("short-term care", ""),
                                    );
                                  }
                                }}
                                className="mr-2"
                              />
                              <label htmlFor="backup-caregiver-care-short">
                                short-term care
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="backup-caregiver-care-long"
                                checked={field.value?.includes("long-term")}
                                onChange={(e) => {
                                  let value = field.value || "";
                                  if (e.target.checked) {
                                    field.onChange(value + " long-term care");
                                  } else {
                                    field.onChange(
                                      value.replace("long-term care", ""),
                                    );
                                  }
                                }}
                                className="mr-2"
                              />
                              <label htmlFor="backup-caregiver-care-long">
                                long-term care
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="backup-caregiver-care-both"
                                checked={field.value?.includes("both")}
                                onChange={(e) => {
                                  let value = field.value || "";
                                  if (e.target.checked) {
                                    field.onChange("both");
                                  } else {
                                    field.onChange(value.replace("both", ""));
                                  }
                                }}
                                className="mr-2"
                              />
                              <label htmlFor="backup-caregiver-care-both">
                                both
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  <Controller
                    name="backupCaregiverName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Caregiver Name"
                        placeholder="Enter backup caregiver's name"
                        isInvalid={!!errors.backupCaregiverName}
                        errorMessage={errors.backupCaregiverName?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="backupCaregiverAddress"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Address"
                        placeholder="Enter backup caregiver's address"
                        isInvalid={!!errors.backupCaregiverAddress}
                        errorMessage={errors.backupCaregiverAddress?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <Controller
                      name="backupCaregiverCity"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="City"
                          placeholder="City"
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="backupCaregiverState"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="State"
                          placeholder="State"
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="backupCaregiverZip"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Zip"
                          placeholder="Zip Code"
                          className="w-full"
                        />
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="backupCaregiverHomePhone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Home Phone"
                          placeholder="(123) 456-7890"
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="backupCaregiverPhone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Cell Phone"
                          placeholder="(123) 456-7890"
                          isInvalid={!!errors.backupCaregiverPhone}
                          errorMessage={errors.backupCaregiverPhone?.message}
                          className="w-full"
                        />
                      )}
                    />
                  </div>

                  <Controller
                    name="backupCaregiverEmail"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Email"
                        placeholder="Enter backup caregiver's email"
                        isInvalid={!!errors.backupCaregiverEmail}
                        errorMessage={errors.backupCaregiverEmail?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <h3 className="text-lg font-semibold text-[#5E3593] mt-8 mb-2">
                    Pet Sitters and Boarding Facilities
                  </h3>

                  <p className="text-sm mb-4">
                    Should your designated caregiver go on vacation or be
                    temporarily unavailable to care for your pets, who should
                    take care of them?
                  </p>

                  <Controller
                    name="petSitterContact"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Contact"
                        placeholder="Enter pet sitter or facility name"
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="petSitterAddress"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Address"
                        placeholder="Enter pet sitter's address"
                        className="w-full"
                      />
                    )}
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <Controller
                      name="petSitterCity"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="City"
                          placeholder="City"
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="petSitterState"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="State"
                          placeholder="State"
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="petSitterZip"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Zip"
                          placeholder="Zip Code"
                          className="w-full"
                        />
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <Controller
                      name="petSitterHomePhone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Home Phone"
                          placeholder="(123) 456-7890"
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="petSitterCellPhone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Cell Phone"
                          placeholder="(123) 456-7890"
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="petSitterDailyCharge"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Average daily charge (or costs)"
                          placeholder="$"
                          className="w-full"
                        />
                      )}
                    />
                  </div>

                  <Controller
                    name="petSitterEmail"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Email"
                        placeholder="Enter pet sitter's email"
                        className="w-full"
                      />
                    )}
                  />

                  <h3 className="text-lg font-semibold text-[#5E3593] mt-8 mb-2">
                    EMERGENCY CONTACT INFORMATION
                  </h3>

                  <p className="text-sm mb-4">
                    Emergency contacts might include friends and family members
                    who may not necessarily take care of your pets but would be
                    able to assist in case of an emergency.
                  </p>

                  <Controller
                    name="emergencyContact1"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Contact #1"
                        placeholder="Enter emergency contact name"
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="emergencyContact1Address"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Address"
                        placeholder="Enter emergency contact's address"
                        className="w-full"
                      />
                    )}
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <Controller
                      name="emergencyContact1City"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="City"
                          placeholder="City"
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="emergencyContact1State"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="State"
                          placeholder="State"
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="emergencyContact1Zip"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Zip"
                          placeholder="Zip Code"
                          className="w-full"
                        />
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="emergencyContact1HomePhone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Home Phone"
                          placeholder="(123) 456-7890"
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="emergencyContact1CellPhone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Cell Phone"
                          placeholder="(123) 456-7890"
                          className="w-full"
                        />
                      )}
                    />
                  </div>

                  <Controller
                    name="emergencyContact1Email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Email"
                        placeholder="Enter emergency contact's email"
                        className="w-full"
                      />
                    )}
                  />
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#5E3593] mb-4">
                    Trustee Information
                  </h2>

                  <div className="mb-4">
                    <p className="font-medium">
                      Primary Trustee or Trustee Service
                    </p>
                  </div>

                  <Controller
                    name="trusteeName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Trustee Name"
                        placeholder="Enter trustee's name"
                        isInvalid={!!errors.trusteeName}
                        errorMessage={errors.trusteeName?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="trusteeAddress"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Address"
                        placeholder="Enter trustee's address"
                        isInvalid={!!errors.trusteeAddress}
                        errorMessage={errors.trusteeAddress?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <Controller
                      name="trusteeCity"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="City"
                          placeholder="City"
                          isInvalid={!!errors.trusteeCity}
                          errorMessage={errors.trusteeCity?.message}
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="trusteeState"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="State"
                          placeholder="State"
                          isInvalid={!!errors.trusteeState}
                          errorMessage={errors.trusteeState?.message}
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="trusteeZip"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Zip Code"
                          placeholder="Zip Code"
                          isInvalid={!!errors.trusteeZip}
                          errorMessage={errors.trusteeZip?.message}
                          className="w-full"
                        />
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="trusteeHomePhone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Home Phone"
                          placeholder="(123) 456-7890"
                          isInvalid={!!errors.trusteeHomePhone}
                          errorMessage={errors.trusteeHomePhone?.message}
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="trusteeCellPhone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Cell Phone"
                          placeholder="(123) 456-7890"
                          isInvalid={!!errors.trusteeCellPhone}
                          errorMessage={errors.trusteeCellPhone?.message}
                          className="w-full"
                        />
                      )}
                    />
                  </div>

                  <Controller
                    name="trusteeEmail"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Email"
                        placeholder="Enter trustee's email"
                        isInvalid={!!errors.trusteeEmail}
                        errorMessage={errors.trusteeEmail?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="trusteeAllocation"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="I would like to allocate $ per year for my Trustee or Trustee service to provide for the caregiver"
                        placeholder="Enter amount"
                        isInvalid={!!errors.trusteeAllocation}
                        errorMessage={errors.trusteeAllocation?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <h2 className="text-xl font-semibold text-[#5E3593] mt-8 mb-4">
                    Trust Fund Information
                  </h2>

                  <div className="mb-4">
                    <p className="mb-2">
                      For the benefit of the Trustee, please indicate how you
                      plan to provide funds for the care of your pets:
                    </p>
                    <Controller
                      name="trustFundType"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-2 ml-4">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="bank-account"
                              value="bank-account"
                              checked={field.value === "bank-account"}
                              onChange={() => field.onChange("bank-account")}
                              className="mr-2"
                            />
                            <label htmlFor="bank-account">
                              Bank Account Tied to Will
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="life-insurance"
                              value="life-insurance"
                              checked={field.value === "life-insurance"}
                              onChange={() => field.onChange("life-insurance")}
                              className="mr-2"
                            />
                            <label htmlFor="life-insurance">
                              Life Insurance policy designates trust as
                              beneficiary
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="other-fund"
                              value="other-fund"
                              checked={field.value === "other-fund"}
                              onChange={() => field.onChange("other-fund")}
                              className="mr-2"
                            />
                            <label htmlFor="other-fund">Other</label>
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  {methods.watch("trustFundType") === "other-fund" && (
                    <Controller
                      name="trustFundOtherExplanation"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          label="Please explain"
                          placeholder="Explain how you plan to provide funds"
                          isInvalid={!!errors.trustFundOtherExplanation}
                          errorMessage={
                            errors.trustFundOtherExplanation?.message
                          }
                          className="w-full"
                        />
                      )}
                    />
                  )}

                  <p className="text-gray-600 text-sm mt-2">
                    We encourage you to work with an attorney or financial
                    planner to appropriately fund your trust so that the Trustee
                    is able to access the funds.
                  </p>

                  <h2 className="text-xl font-semibold text-[#5E3593] mt-8 mb-4">
                    Remaining Funds
                  </h2>

                  <p className="mb-4">
                    Should my pet(s) die while under the care of a caregiver, I
                    would like my remaining funds distributed to (percentages
                    should total 100%).
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="remainingFundsOrg2ndChance"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="2nd Chance 4 Pets (%)"
                          placeholder="Enter percentage"
                          isInvalid={!!errors.remainingFundsOrg2ndChance}
                          errorMessage={
                            errors.remainingFundsOrg2ndChance?.message
                          }
                          className="w-full"
                          endContent={
                            <div className="pointer-events-none flex items-center">
                              %
                            </div>
                          }
                        />
                      )}
                    />
                    <p className="text-gray-600 text-sm mt-2">
                      Address: 1484 Pollard Road, No. 444, Los Gatos, CA 95032
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="remainingFundsOrgOther"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Other pet welfare organization (%)"
                          placeholder="Enter percentage"
                          isInvalid={!!errors.remainingFundsOrgOther}
                          errorMessage={errors.remainingFundsOrgOther?.message}
                          className="w-full"
                          endContent={
                            <div className="pointer-events-none flex items-center">
                              %
                            </div>
                          }
                        />
                      )}
                    />

                    <Controller
                      name="remainingFundsOrgOtherAddress"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Address"
                          placeholder="Enter organization's address"
                          isInvalid={!!errors.remainingFundsOrgOtherAddress}
                          errorMessage={
                            errors.remainingFundsOrgOtherAddress?.message
                          }
                          className="w-full"
                        />
                      )}
                    />
                  </div>

                  <Controller
                    name="remainingFundsOtherBeneficiary"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Other beneficiary"
                        placeholder="Enter other beneficiary details"
                        isInvalid={!!errors.remainingFundsOtherBeneficiary}
                        errorMessage={
                          errors.remainingFundsOtherBeneficiary?.message
                        }
                        className="w-full"
                      />
                    )}
                  />
                </div>
              )}

              {step === 6 && (
                <div>
                  <h2 className="text-xl font-semibold text-[#5E3593] mb-4">
                    Review & Submit
                  </h2>

                  <p className="text-gray-600 mb-6">
                    Please review your information before submitting. Once you
                    submit, you'll be able to download a PDF of your completed
                    form.
                  </p>

                  <Controller
                    name="agreeToTerms"
                    control={control}
                    render={({ field }) => (
                      <div className="mb-6">
                        <Checkbox
                          isSelected={field.value}
                          onValueChange={(checked) => field.onChange(checked)}
                          name={field.name}
                          ref={field.ref}
                          isInvalid={!!errors.agreeToTerms}
                          color="secondary"
                        >
                          I understand and agree to the terms above
                        </Checkbox>
                        {errors.agreeToTerms && (
                          <p className="text-danger text-small">
                            {errors.agreeToTerms.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-[#5E3593] text-white rounded-lg font-semibold"
                    isDisabled={!methods.formState.isValid}
                  >
                    Save and Download PDF
                  </Button>

                  <div className="mt-4">
                    <Button
                      onClick={generatePDFDirectly}
                      className="w-full bg-gray-200 text-gray-800 rounded-lg font-semibold"
                    >
                      Generate PDF Directly
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <Button
                    onClick={prevStep}
                    className="px-8 bg-gray-200 text-gray-800 rounded-[15px] font-[Inter] font-semibold"
                  >
                    Previous
                  </Button>
                ) : (
                  <Link to="/">
                    <Button className="px-8 bg-gray-200 text-gray-800 rounded-[15px] font-[Inter] font-semibold">
                      Cancel
                    </Button>
                  </Link>
                )}

                {step < 6 && (
                  <Button
                    onClick={nextStep}
                    className="px-8 bg-[#A377DC] text-white rounded-[15px] font-[Inter] font-semibold"
                  >
                    Next
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>

      {/* Status Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="text-[#5E3593]">
            {pdfGenerationStatus === "success" ? "Success!" : "Error"}
          </ModalHeader>
          <ModalBody>
            {pdfGenerationStatus === "success" ? (
              <p>Your form has been successfully saved as a PDF.</p>
            ) : (
              <p>
                There was an error generating your PDF. Please try again or
                contact support for assistance.
              </p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default InitialForm;
