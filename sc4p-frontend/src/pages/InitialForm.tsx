import React, { useState } from "react";
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
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Logo from "../../public/logo.png";

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
  medicalConditions: yup.string(),
  medications: yup.string(),
  veterinarianName: yup.string().required("Veterinarian name is required"),
  veterinarianPhone: yup.string().required("Veterinarian phone is required"),

  // Caregiver Information
  caregiverName: yup.string().required("Caregiver name is required"),
  caregiverPhone: yup.string().required("Caregiver phone is required"),
  caregiverAddress: yup.string().required("Caregiver address is required"),

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

  // Terms and Agreements
  agreeToTerms: yup.boolean().oneOf([true], "You must agree to the terms"),
});

type FormData = yup.InferType<typeof schema>;

const InitialForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = methods;

  const onSubmit = (data: FormData) => {
    generatePDF(data);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const generatePDF = (data: FormData) => {
    const doc = new jsPDF();

    // Add logo and title
    const imgData = Logo;
    doc.addImage(imgData, "PNG", 15, 10, 20, 40);
    doc.setFontSize(20);
    doc.setTextColor(94, 53, 147); // #5E3593
    doc.text("2nd Chance For Pets - Pet Care Form", 50, 30);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    // Pet Owner Information
    doc.text("Pet Owner Information", 15, 60);
    doc.line(15, 62, 195, 62);

    const ownerInfo = [
      ["Owner Name", data.ownerName],
      ["Address", data.address],
      ["City, State, Zip", `${data.city}, ${data.state} ${data.zipCode}`],
      ["Phone", data.phone],
      ["Email", data.email],
    ];

    (doc as any).autoTable({
      startY: 65,
      head: [],
      body: ownerInfo,
      theme: "plain",
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 130 },
      },
    });

    // Pet Information
    let y = (doc as any).lastAutoTable.finalY + 10;
    doc.text("Pet Information", 15, y);
    doc.line(15, y + 2, 195, y + 2);

    const petInfo = [
      ["Pet Name", data.petName],
      ["Type", data.petType],
      ["Breed", data.breed],
      ["Age", data.age.toString()],
      ["Gender", data.gender],
      ["Spayed/Neutered", data.spayedNeutered ? "Yes" : "No"],
      ["Color", data.color],
      ["Medical Conditions", data.medicalConditions || "None"],
      ["Medications", data.medications || "None"],
    ];

    (doc as any).autoTable({
      startY: y + 5,
      head: [],
      body: petInfo,
      theme: "plain",
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 130 },
      },
    });

    // Veterinarian Information
    y = (doc as any).lastAutoTable.finalY + 10;
    doc.text("Veterinarian Information", 15, y);
    doc.line(15, y + 2, 195, y + 2);

    const vetInfo = [
      ["Name", data.veterinarianName],
      ["Phone", data.veterinarianPhone],
    ];

    (doc as any).autoTable({
      startY: y + 5,
      head: [],
      body: vetInfo,
      theme: "plain",
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 130 },
      },
    });

    // Add a new page for caregiver information
    doc.addPage();

    // Caregiver Information
    doc.text("Primary Caregiver Information", 15, 20);
    doc.line(15, 22, 195, 22);

    const caregiverInfo = [
      ["Name", data.caregiverName],
      ["Phone", data.caregiverPhone],
      ["Address", data.caregiverAddress],
    ];

    (doc as any).autoTable({
      startY: 25,
      head: [],
      body: caregiverInfo,
      theme: "plain",
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 130 },
      },
    });

    // Backup Caregiver Information
    y = (doc as any).lastAutoTable.finalY + 10;
    doc.text("Backup Caregiver Information", 15, y);
    doc.line(15, y + 2, 195, y + 2);

    const backupCaregiverInfo = [
      ["Name", data.backupCaregiverName],
      ["Phone", data.backupCaregiverPhone],
      ["Address", data.backupCaregiverAddress],
    ];

    (doc as any).autoTable({
      startY: y + 5,
      head: [],
      body: backupCaregiverInfo,
      theme: "plain",
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 130 },
      },
    });

    // Agreement section
    y = (doc as any).lastAutoTable.finalY + 20;
    doc.text("Agreement", 15, y);
    doc.line(15, y + 2, 195, y + 2);

    doc.text(
      "I hereby authorize the designated caregivers to make health and welfare decisions",
      15,
      y + 10,
    );
    doc.text("for my pet(s) in the event I am unable to do so.", 15, y + 18);

    doc.text("Signature: _______________________________", 15, y + 35);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, y + 45);

    // Save the PDF
    doc.save("pet_care_form.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="flex mb-8 px-8">
        <img
          src={Logo}
          className="w-[55.6px] h-[109.7px]"
          alt="Second Chance 4 Pets Logo"
        />
        <h1 className="w-[160.64px] h-[78px] mt-[22px] ml-[15px] font-[Inter] text-[24px] font-bold leading-[28.73px] text-left text-[#5E3593]">
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
                ? "Pet Owner Information"
                : step === 2
                ? "Pet Information"
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
                        placeholder="List any medications"
                        isInvalid={!!errors.medications}
                        errorMessage={errors.medications?.message}
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
                    className="w-full h-[56px] bg-[#A377DC] text-white rounded-[15px] font-[Inter] font-semibold text-[20px]"
                  >
                    Save & Download PDF
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
    </div>
  );
};

export default InitialForm;
