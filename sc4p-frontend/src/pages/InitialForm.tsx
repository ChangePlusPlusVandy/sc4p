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
  specialDiet: yup.string(),
  feedingSchedule: yup.string(),
  medicalConditions: yup.string(),
  medications: yup.string(),
  allergies: yup.string(),
  behavioralNotes: yup.string(),
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

      if (data.petInsurance) {
        doc.text(`Pet Insurance: ${data.petInsurance}`, 20, y);
        y += 8;
        if (data.insurancePolicy) {
          doc.text(`Policy Number: ${data.insurancePolicy}`, 20, y);
          y += 8;
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
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="flex mb-8 px-8">
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
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full flex-grow mx-1 ${
                    index + 1 <= step ? "bg-[#5E3593]" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-gray-600">
              Step {step} of 5:{" "}
              {step === 1
                ? "Owner & Emergency Contact"
                : step === 2
                  ? "Pet Details & Care"
                  : step === 3
                    ? "Veterinarian Information"
                    : step === 4
                      ? "Caregiver Information"
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

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="petInsurance"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Pet Insurance Provider"
                          placeholder="Enter insurance provider if any"
                          className="w-full"
                        />
                      )}
                    />

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
                  </div>

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
                    Primary Caregiver Information
                  </h2>

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
                    name="caregiverPhone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Caregiver Phone"
                        placeholder="(123) 456-7890"
                        isInvalid={!!errors.caregiverPhone}
                        errorMessage={errors.caregiverPhone?.message}
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
                        label="Caregiver Address"
                        placeholder="Enter caregiver's address"
                        isInvalid={!!errors.caregiverAddress}
                        errorMessage={errors.caregiverAddress?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="caregiverEmail"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Caregiver Email"
                        placeholder="Enter caregiver's email"
                        isInvalid={!!errors.caregiverEmail}
                        errorMessage={errors.caregiverEmail?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="caregiverRelationship"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Relationship to You"
                          placeholder="Friend, Family, etc."
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="caregiverHasKey"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center h-full pt-8">
                          <Checkbox
                            isSelected={field.value}
                            onValueChange={(checked) => field.onChange(checked)}
                            name={field.name}
                            ref={field.ref}
                          >
                            Has Key to Home
                          </Checkbox>
                        </div>
                      )}
                    />
                  </div>

                  <h2 className="text-xl font-semibold text-[#5E3593] mt-8 mb-4">
                    Backup Caregiver Information
                  </h2>

                  <Controller
                    name="backupCaregiverName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Backup Caregiver Name"
                        placeholder="Enter backup caregiver's name"
                        isInvalid={!!errors.backupCaregiverName}
                        errorMessage={errors.backupCaregiverName?.message}
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
                        label="Backup Caregiver Phone"
                        placeholder="(123) 456-7890"
                        isInvalid={!!errors.backupCaregiverPhone}
                        errorMessage={errors.backupCaregiverPhone?.message}
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
                        label="Backup Caregiver Address"
                        placeholder="Enter backup caregiver's address"
                        isInvalid={!!errors.backupCaregiverAddress}
                        errorMessage={errors.backupCaregiverAddress?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <Controller
                    name="backupCaregiverEmail"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Backup Caregiver Email"
                        placeholder="Enter backup caregiver's email"
                        isInvalid={!!errors.backupCaregiverEmail}
                        errorMessage={errors.backupCaregiverEmail?.message}
                        className="w-full"
                      />
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="backupCaregiverRelationship"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Relationship to You"
                          placeholder="Friend, Family, etc."
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="backupCaregiverHasKey"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center h-full pt-8">
                          <Checkbox
                            isSelected={field.value}
                            onValueChange={(checked) => field.onChange(checked)}
                            name={field.name}
                            ref={field.ref}
                          >
                            Has Key to Home
                          </Checkbox>
                        </div>
                      )}
                    />
                  </div>
                </div>
              )}

              {step === 5 && (
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
                        >
                          I confirm that all information provided is accurate
                          and I authorize the designated caregivers to make
                          health and welfare decisions for my pet(s) in the
                          event I am unable to do so.
                        </Checkbox>
                        {errors.agreeToTerms && (
                          <p className="text-danger text-sm mt-1">
                            {errors.agreeToTerms.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-[56px] bg-[#A377DC] text-white rounded-[15px] font-[Inter] font-semibold text-[20px] mb-3"
                    isLoading={pdfGenerationStatus === "loading"}
                    onClick={() => console.log("Submit button clicked")}
                  >
                    Save & Download PDF
                  </Button>

                  {/* Direct PDF Generation Button */}
                  <Button
                    className="w-full h-[56px] bg-[#5E3593] text-white rounded-[15px] font-[Inter] font-semibold text-[20px]"
                    isLoading={pdfGenerationStatus === "loading"}
                    onClick={() => {
                      console.log("Direct PDF button clicked");
                      generatePDFDirectly();
                    }}
                  >
                    Generate PDF Directly
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

                {step < 5 && (
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
