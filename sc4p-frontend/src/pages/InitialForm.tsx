import React, { useState, useEffect } from "react";
import {
  useForm,
  Controller,
  FormProvider,
  UseFormReturn,
} from "react-hook-form";
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
import Logo from "/logo.png";

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
  email: yup
    .string()
    .test("email-or-na", "Invalid email", function (value) {
      if (!value) return true; // Allow empty values
      if (value.toLowerCase() === "n/a") return true;
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    })
    .required("Email is required"),

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
  veterinarianEmail: yup
    .string()
    .test("email-or-na", "Invalid email", function (value) {
      if (!value) return true; // Allow empty values
      if (value.toLowerCase() === "n/a") return true;
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    }),

  // Caregiver Information
  caregiverName: yup.string().required("Caregiver name is required"),
  caregiverPhone: yup.string().required("Caregiver phone is required"),
  caregiverAddress: yup.string().required("Caregiver address is required"),
  caregiverEmail: yup
    .string()
    .test("email-or-na", "Invalid email", function (value) {
      if (!value) return true; // Allow empty values
      if (value.toLowerCase() === "n/a") return true;
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    }),
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
  backupCaregiverEmail: yup
    .string()
    .test("email-or-na", "Invalid email", function (value) {
      if (!value) return true; // Allow empty values
      if (value.toLowerCase() === "n/a") return true;
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    }),
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
  petSitterEmail: yup
    .string()
    .test("email-or-na", "Invalid email", function (value) {
      if (!value) return true; // Allow empty values
      if (value.toLowerCase() === "n/a") return true;
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    }),
  petSitterDailyCharge: yup.string(),

  // Emergency Contact Info
  emergencyContact1: yup.string(),
  emergencyContact1Address: yup.string(),
  emergencyContact1City: yup.string(),
  emergencyContact1State: yup.string(),
  emergencyContact1Zip: yup.string(),
  emergencyContact1HomePhone: yup.string(),
  emergencyContact1CellPhone: yup.string(),
  emergencyContact1Email: yup
    .string()
    .test("email-or-na", "Invalid email", function (value) {
      if (!value) return true; // Allow empty values
      if (value.toLowerCase() === "n/a") return true;
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    }),

  // Trustee Information
  trusteeName: yup.string(),
  trusteeAddress: yup.string(),
  trusteeCity: yup.string(),
  trusteeState: yup.string(),
  trusteeZip: yup.string(),
  trusteeHomePhone: yup.string(),
  trusteeCellPhone: yup.string(),
  trusteeEmail: yup
    .string()
    .test("email-or-na", "Invalid email", function (value) {
      if (!value) return true; // Allow empty values
      if (value.toLowerCase() === "n/a") return true;
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    }),
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

const InitialForm: React.FC<{ methods?: UseFormReturn<FormData> }> = ({
  methods: externalMethods,
}): JSX.Element => {
  const [step, setStep] = useState(1);
  const [pdfGenerationStatus, setPdfGenerationStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const internalMethods = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const methods = externalMethods ?? internalMethods;

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = methods;

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
      // Create a new PDF with better margins and formatting
      const doc = new jsPDF();

      // Set margins and page dimensions
      const leftMargin = 20;
      const rightMargin = 20;
      const topMargin = 20;
      const bottomMargin = 20;
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      const contentWidth = pageWidth - leftMargin - rightMargin;
      const columnWidth = (contentWidth - 20) / 2;
      const lineHeight = 7;

      // Add logo with better positioning and sizing
      doc.addImage(Logo, "PNG", leftMargin, topMargin, 15, 30);

      // Add header with improved styling and better organization
      doc.setFontSize(24);
      doc.setTextColor(94, 53, 147); // #5E3593
      doc.setFont("helvetica", "bold");
      doc.text("2nd Chance For Pets", leftMargin + 40, topMargin + 20);
      doc.setFontSize(20);
      doc.text("Pet Care Form", leftMargin + 40, topMargin + 28);
      doc.setFont("helvetica", "normal");

      // Add date and form ID
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(
        `Generated on: ${new Date().toLocaleDateString()}`,
        pageWidth - rightMargin,
        topMargin + 8,
        { align: "right" },
      );
      doc.text(
        `Form ID: ${Math.random().toString(36).substr(2, 9)}`,
        pageWidth - rightMargin,
        topMargin + 12,
        { align: "right" },
      );

      // Reset text color and size for content
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);

      // Helper function to add text with word wrap and better spacing
      const addText = (text: string, x: number, y: number, width: number) => {
        const splitText = doc.splitTextToSize(text, width) as string[];
        doc.text(splitText, x, y);
        return y + splitText.length * lineHeight;
      };

      // Helper function to add section header with improved styling
      const addSectionHeader = (text: string, x: number, y: number) => {
        doc.setFontSize(16);
        doc.setTextColor(94, 53, 147); // #5E3593
        doc.setFont("helvetica", "bold");
        doc.text(text, x, y);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        return y + 15;
      };

      // Helper function to add subsection header with improved styling
      const addSubsectionHeader = (text: string, x: number, y: number) => {
        doc.setFontSize(14);
        doc.setTextColor(94, 53, 147); // #5E3593
        doc.setFont("helvetica", "bold");
        doc.text(text, x, y);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        return y + 8;
      };

      // Helper function to add field with label and improved formatting
      const addField = (
        label: string,
        value: string | number | boolean | undefined,
        x: number,
        y: number,
        width: number,
      ) => {
        if (value === undefined || value === null || value === "") return y;

        // Add label without background
        const labelText = `${label}:`;
        doc.setFont("helvetica", "bold");
        doc.text(labelText, x, y);
        doc.setFont("helvetica", "normal");

        // Calculate the width of the label to determine where to start the value box
        const labelWidth = doc.getTextWidth(labelText);
        const valueX = x; // Start value at same x position as label

        // Add subtle background for value only
        const valueText = value.toString();
        const splitValue = doc.splitTextToSize(valueText, width) as string[];
        const valueHeight = splitValue.length * lineHeight;

        // Draw background rectangle only for the value area
        doc.setFillColor(245, 245, 245);
        doc.rect(valueX - 2, y + 2, width, valueHeight + 4, "F");

        // Add value text with small offset from label
        doc.text(splitValue, valueX, y + 8);
        return y + 8 + valueHeight + 4; // Add extra spacing after the field
      };

      let y = topMargin + 40;

      // Owner Information Section with improved layout
      y = addSectionHeader("Pet Owner Information", leftMargin, y);
      let leftY = y;
      let rightY = y;

      // Left column with improved spacing
      leftY = addField(
        "Full Name",
        data.ownerName,
        leftMargin,
        leftY,
        columnWidth,
      );
      leftY = addField("Address", data.address, leftMargin, leftY, columnWidth);
      leftY = addField(
        "City/State/Zip",
        `${data.city}, ${data.state} ${data.zipCode}`,
        leftMargin,
        leftY,
        columnWidth,
      );

      // Right column with improved spacing
      rightY = addField(
        "Phone",
        data.phone,
        leftMargin + columnWidth + 20,
        rightY,
        columnWidth,
      );
      rightY = addField(
        "Email",
        data.email,
        leftMargin + columnWidth + 20,
        rightY,
        columnWidth,
      );

      y = Math.max(leftY, rightY) + 10;

      // Emergency Contact Section with improved layout
      y = addSectionHeader("Emergency Contact Information", leftMargin, y);
      leftY = y;
      rightY = y;

      // Left column
      leftY = addField(
        "Name",
        data.emergencyContactName,
        leftMargin,
        leftY,
        columnWidth,
      );
      leftY = addField(
        "Phone",
        data.emergencyContactPhone,
        leftMargin,
        leftY,
        columnWidth,
      );

      // Right column
      rightY = addField(
        "Relationship",
        data.emergencyContactRelationship,
        leftMargin + columnWidth + 20,
        rightY,
        columnWidth,
      );

      y = Math.max(leftY, rightY) + 10;

      // Check if we need a new page
      if (y > pageHeight - bottomMargin) {
        doc.addPage();
        y = topMargin;
      }

      // Pet Information Section with improved layout
      y = addSectionHeader("Pet Information", leftMargin, y);
      leftY = y;
      rightY = y;

      // Left column
      leftY = addField(
        "Pet Name",
        data.petName,
        leftMargin,
        leftY,
        columnWidth,
      );
      leftY = addField("Type", data.petType, leftMargin, leftY, columnWidth);
      leftY = addField("Breed", data.breed, leftMargin, leftY, columnWidth);
      leftY = addField("Age", data.age, leftMargin, leftY, columnWidth);

      // Right column
      rightY = addField(
        "Gender",
        data.gender,
        leftMargin + columnWidth + 20,
        rightY,
        columnWidth,
      );
      rightY = addField(
        "Spayed/Neutered",
        data.spayedNeutered ? "Yes" : "No",
        leftMargin + columnWidth + 20,
        rightY,
        columnWidth,
      );
      rightY = addField(
        "Color",
        data.color,
        leftMargin + columnWidth + 20,
        rightY,
        columnWidth,
      );
      if (data.microchipId) {
        rightY = addField(
          "Microchip ID",
          data.microchipId,
          leftMargin + columnWidth + 20,
          rightY,
          columnWidth,
        );
      }

      y = Math.max(leftY, rightY) + 10;

      // Check if we need a new page
      if (y > pageHeight - bottomMargin) {
        doc.addPage();
        y = topMargin;
      }

      // Pet Health Information Section with improved layout
      y = addSectionHeader("Pet Health Information", leftMargin, y);

      // Insurance Information with improved formatting
      if (data.hasInsurance) {
        y = addSubsectionHeader("Insurance Information", leftMargin, y);
        y = addField(
          "Provider",
          data.petInsurance,
          leftMargin,
          y,
          contentWidth,
        );
        y = addField(
          "Policy Number",
          data.insurancePolicy,
          leftMargin,
          y,
          contentWidth,
        );
        y = addField(
          "Provider Phone",
          data.insurancePhone,
          leftMargin,
          y,
          contentWidth,
        );
        y = addField(
          "Annual Cost",
          data.insuranceCost,
          leftMargin,
          y,
          contentWidth,
        );
        y += 5;
      }

      // Special Care Information with improved formatting
      if (data.specialDiet ?? data.feedingSchedule) {
        y = addSubsectionHeader("Special Care Information", leftMargin, y);
        if (data.specialDiet) {
          y = addField(
            "Special Diet",
            data.specialDiet,
            leftMargin,
            y,
            contentWidth,
          );
        }
        if (data.feedingSchedule) {
          y = addField(
            "Feeding Schedule",
            data.feedingSchedule,
            leftMargin,
            y,
            contentWidth,
          );
        }
        y += 5;
      }

      // Medical Information with improved formatting
      if (data.medicalConditions ?? data.medications ?? data.allergies) {
        y = addSubsectionHeader("Medical Information", leftMargin, y);
        if (data.medicalConditions) {
          y = addField(
            "Medical Conditions",
            data.medicalConditions,
            leftMargin,
            y,
            contentWidth,
          );
        }
        if (data.medications) {
          y = addField(
            "Medications",
            data.medications,
            leftMargin,
            y,
            contentWidth,
          );
        }
        if (data.allergies) {
          y = addField(
            "Allergies",
            data.allergies,
            leftMargin,
            y,
            contentWidth,
          );
        }
        y += 5;
      }

      // Check if we need a new page
      if (y > pageHeight - bottomMargin) {
        doc.addPage();
        y = topMargin;
      }

      // End of Life Care Section with improved layout
      y = addSectionHeader("End of Life Care Decisions", leftMargin, y);
      leftY = y;
      rightY = y;

      // Left column
      let illnessDecision = "Not specified";
      if (data.illnessDecision === "vet") {
        illnessDecision =
          "Veterinarian should make the decision if pet should be euthanized";
      } else if (data.illnessDecision === "caregiver") {
        illnessDecision =
          "Caregiver should make the decision if pet should be euthanized";
      } else if (data.illnessDecision === "consult") {
        illnessDecision =
          "Emergency contacts should consult caregiver and veterinarian for decision";
      }
      leftY = addField(
        "Serious Illness Decision",
        illnessDecision,
        leftMargin,
        leftY,
        columnWidth,
      );

      // Right column
      let deathCare = "Not specified";
      if (data.deathCarePreference === "burial") {
        deathCare = "Burial";
      } else if (data.deathCarePreference === "cremation") {
        deathCare = "Cremation";
      } else if (data.deathCarePreference === "pet-cemetery") {
        deathCare = "Local Pet Cemetery";
      } else if (data.deathCarePreference === "caregiver-determine") {
        deathCare = "Caregiver can determine";
      }
      rightY = addField(
        "Death Care Preference",
        deathCare,
        leftMargin + columnWidth + 20,
        rightY,
        columnWidth,
      );

      if (data.deathCareBudget) {
        rightY = addField(
          "Budget for Remains",
          `$${data.deathCareBudget}`,
          leftMargin + columnWidth + 20,
          rightY,
          columnWidth,
        );
      }

      y = Math.max(leftY, rightY) + 10;

      // Check if we need a new page
      if (y > pageHeight - bottomMargin) {
        doc.addPage();
        y = topMargin;
      }

      // Veterinarian Information Section with improved layout
      y = addSectionHeader("Veterinarian Information", leftMargin, y);
      leftY = y;
      rightY = y;

      // Left column
      leftY = addField(
        "Name",
        data.veterinarianName,
        leftMargin,
        leftY,
        columnWidth,
      );
      leftY = addField(
        "Phone",
        data.veterinarianPhone,
        leftMargin,
        leftY,
        columnWidth,
      );

      // Right column
      if (data.veterinarianAddress) {
        rightY = addField(
          "Address",
          data.veterinarianAddress,
          leftMargin + columnWidth + 15,
          rightY,
          columnWidth,
        );
      }
      if (data.veterinarianEmail) {
        rightY = addField(
          "Email",
          data.veterinarianEmail,
          leftMargin + columnWidth + 15,
          rightY,
          columnWidth,
        );
      }

      y = Math.max(leftY, rightY) + 5;

      // Check if we need a new page
      if (y > pageHeight - bottomMargin) {
        doc.addPage();
        y = topMargin;
      }

      // Caregiver Information Section - Two columns
      y = addSectionHeader("Caregiver Information", leftMargin, y);

      // Primary Caregiver
      y = addSubsectionHeader("Primary Caregiver", leftMargin, y);
      leftY = y;
      rightY = y;

      // Left column
      leftY = addField(
        "Name",
        data.caregiverName,
        leftMargin,
        leftY,
        columnWidth,
      );
      leftY = addField(
        "Phone",
        data.caregiverPhone,
        leftMargin,
        leftY,
        columnWidth,
      );
      leftY = addField(
        "Address",
        data.caregiverAddress,
        leftMargin,
        leftY,
        columnWidth,
      );

      // Right column
      if (data.caregiverEmail) {
        rightY = addField(
          "Email",
          data.caregiverEmail,
          leftMargin + columnWidth + 15,
          rightY,
          columnWidth,
        );
      }
      if (data.caregiverRelationship) {
        rightY = addField(
          "Relationship",
          data.caregiverRelationship,
          leftMargin + columnWidth + 15,
          rightY,
          columnWidth,
        );
      }
      rightY = addField(
        "Has Key to Home",
        data.caregiverHasKey ? "Yes" : "No",
        leftMargin + columnWidth + 15,
        rightY,
        columnWidth,
      );
      rightY = addField(
        "Care Type",
        data.caregiverCareType,
        leftMargin + columnWidth + 15,
        rightY,
        columnWidth,
      );

      y = Math.max(leftY, rightY) + 5;

      // Backup Caregiver
      y = addSubsectionHeader("Backup Caregiver", leftMargin, y);
      leftY = y;
      rightY = y;

      // Left column
      leftY = addField(
        "Name",
        data.backupCaregiverName,
        leftMargin,
        leftY,
        columnWidth,
      );
      leftY = addField(
        "Phone",
        data.backupCaregiverPhone,
        leftMargin,
        leftY,
        columnWidth,
      );
      leftY = addField(
        "Address",
        data.backupCaregiverAddress,
        leftMargin,
        leftY,
        columnWidth,
      );

      // Right column
      if (data.backupCaregiverEmail) {
        rightY = addField(
          "Email",
          data.backupCaregiverEmail,
          leftMargin + columnWidth + 15,
          rightY,
          columnWidth,
        );
      }
      if (data.backupCaregiverRelationship) {
        rightY = addField(
          "Relationship",
          data.backupCaregiverRelationship,
          leftMargin + columnWidth + 15,
          rightY,
          columnWidth,
        );
      }
      rightY = addField(
        "Has Key to Home",
        data.backupCaregiverHasKey ? "Yes" : "No",
        leftMargin + columnWidth + 15,
        rightY,
        columnWidth,
      );
      rightY = addField(
        "Care Type",
        data.backupCaregiverCareType,
        leftMargin + columnWidth + 15,
        rightY,
        columnWidth,
      );

      y = Math.max(leftY, rightY) + 5;

      // Check if we need a new page
      if (y > pageHeight - bottomMargin) {
        doc.addPage();
        y = topMargin;
      }

      // Check if we need a new page before Trustee Information section
      if (y > pageHeight - bottomMargin) {
        doc.addPage();
        y = topMargin;
      }

      // Trustee Information Section - Two columns
      if (data.trusteeName ?? data.trusteeAllocation) {
        y = addSectionHeader("Trustee Information", leftMargin, y);
        leftY = y;
        rightY = y;

        // Left column
        leftY = addField(
          "Trustee Name",
          data.trusteeName,
          leftMargin,
          leftY,
          columnWidth,
        );
        leftY = addField(
          "Address",
          data.trusteeAddress,
          leftMargin,
          leftY,
          columnWidth,
        );
        if (data.trusteeCity ?? data.trusteeState ?? data.trusteeZip) {
          leftY = addField(
            "City/State/Zip",
            `${data.trusteeCity ?? ""}, ${data.trusteeState ?? ""} ${
              data.trusteeZip ?? ""
            }`,
            leftMargin,
            leftY,
            columnWidth,
          );
        }

        // Right column
        rightY = addField(
          "Home Phone",
          data.trusteeHomePhone,
          leftMargin + columnWidth + 15,
          rightY,
          columnWidth,
        );
        rightY = addField(
          "Cell Phone",
          data.trusteeCellPhone,
          leftMargin + columnWidth + 15,
          rightY,
          columnWidth,
        );
        rightY = addField(
          "Email",
          data.trusteeEmail,
          leftMargin + columnWidth + 15,
          rightY,
          columnWidth,
        );
        rightY = addField(
          "Annual Allocation",
          data.trusteeAllocation ? `$${data.trusteeAllocation}` : undefined,
          leftMargin + columnWidth + 15,
          rightY,
          columnWidth,
        );

        y = Math.max(leftY, rightY) + 5;

        // Check if we need a new page before Trust Fund Information
        if (y > pageHeight - bottomMargin) {
          doc.addPage();
          y = topMargin;
        }

        // Trust Fund Information
        y = addSubsectionHeader("Trust Fund Information", leftMargin, y);
        let fundingMethod = "Not specified";
        if (data.trustFundType === "bank-account") {
          fundingMethod = "Bank Account Tied to Will";
        } else if (data.trustFundType === "life-insurance") {
          fundingMethod =
            "Life Insurance policy designates trust as beneficiary";
        } else if (data.trustFundType === "other-fund") {
          fundingMethod = data.trustFundOtherExplanation ?? "Other";
        }
        y = addField(
          "Funding Method",
          fundingMethod,
          leftMargin,
          y,
          contentWidth,
        );
        y += 5;

        // Check if we need a new page before Remaining Funds Distribution
        if (y > pageHeight - bottomMargin) {
          doc.addPage();
          y = topMargin;
        }

        // Remaining Funds Distribution
        y = addSubsectionHeader("Remaining Funds Distribution", leftMargin, y);
        if (data.remainingFundsOrg2ndChance) {
          y = addField(
            "2nd Chance 4 Pets",
            `${data.remainingFundsOrg2ndChance}%`,
            leftMargin,
            y,
            contentWidth,
          );
        }
        if (data.remainingFundsOrgOther) {
          y = addField(
            "Other Pet Welfare Organization",
            `${data.remainingFundsOrgOther}%`,
            leftMargin,
            y,
            contentWidth,
          );
          if (data.remainingFundsOrgOtherAddress) {
            y = addField(
              "Organization Address",
              data.remainingFundsOrgOtherAddress,
              leftMargin,
              y,
              contentWidth,
            );
          }
        }
        if (data.remainingFundsOtherBeneficiary) {
          y = addField(
            "Other Beneficiary",
            data.remainingFundsOtherBeneficiary,
            leftMargin,
            y,
            contentWidth,
          );
        }
      }

      // Agreement Section - Single column for longer text
      y = addSectionHeader("Agreement", leftMargin, y);
      y = addText(
        "I hereby authorize the designated caregivers to make health and welfare decisions for my pet(s) in the event I am unable to do so.",
        leftMargin,
        y,
        contentWidth,
      );
      y += 20;

      // Signature and Date
      doc.setFont("helvetica", "normal");
      y = addText(
        "Signature: _______________________________",
        leftMargin,
        y,
        contentWidth,
      );
      y += 10;
      y = addText(
        `Date: ${new Date().toLocaleDateString()}`,
        leftMargin,
        y,
        contentWidth,
      );

      // Save the PDF
      doc.save("pet_care_form.pdf");

      console.log("PDF generated successfully");
      return true;
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="flex">
        <Link to="/" className="flex">
          <img
            src={Logo}
            className="h-[109.7px] w-auto mt-[25.98px] ml-[33.9px]"
            alt="Second Chance 4 Pets Logo"
          />
          <h1 className="w-[130.64px] h-[78px] mt-[48.4px] ml-[15px] font-[Inter] text-[24px] font-bold leading-[28.73px] text-left text-[#5E3593] hover:text-[#7E53C3] transition-colors">
            2nd Chance 4 Pets
          </h1>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-4 mb-8">
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
                        placeholder="Enter email or type 'N/A'"
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
                          selectedKeys={field.value ? [field.value] : []}
                          onSelectionChange={(keys) =>
                            field.onChange([...keys][0])
                          }
                          label="Pet Type"
                          placeholder="Select pet type"
                          isInvalid={!!errors.petType}
                          errorMessage={errors.petType?.message}
                          className="w-full"
                        >
                          <SelectItem key="Dog" value="Dog">
                            Dog
                          </SelectItem>
                          <SelectItem key="Cat" value="Cat">
                            Cat
                          </SelectItem>
                          <SelectItem key="Bird" value="Bird">
                            Bird
                          </SelectItem>
                          <SelectItem key="Other" value="Other">
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
                          selectedKeys={field.value ? [field.value] : []}
                          onSelectionChange={(keys) =>
                            field.onChange([...keys][0])
                          }
                          label="Gender"
                          placeholder="Select gender"
                          isInvalid={!!errors.gender}
                          errorMessage={errors.gender?.message}
                          className="w-full"
                        >
                          <SelectItem key="Male" value="Male">
                            Male
                          </SelectItem>
                          <SelectItem key="Female" value="Female">
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
                        placeholder="Enter email or type 'N/A'"
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
                                  const value = field.value ?? "";
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
                                  const value = field.value ?? "";
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
                                  const value = field.value ?? "";
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
                        placeholder="Enter email or type 'N/A'"
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
                                  const value = field.value ?? "";
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
                                  const value = field.value ?? "";
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
                                  const value = field.value ?? "";
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
                        placeholder="Enter email or type 'N/A'"
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
                        placeholder="Enter email or type 'N/A'"
                        isInvalid={!!errors.petSitterEmail}
                        errorMessage={errors.petSitterEmail?.message}
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
                        placeholder="Enter email or type 'N/A'"
                        isInvalid={!!errors.emergencyContact1Email}
                        errorMessage={errors.emergencyContact1Email?.message}
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
                        placeholder="Enter email or type 'N/A'"
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
