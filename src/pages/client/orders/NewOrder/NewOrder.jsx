// components/NewOrder/NewOrder.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Step1PaperDetails from "./Step1PaperDetails";
import Step2InstructionsMaterials from "./Step2InstructionsMaterials";
import Step3ReviewSubmit from "./Step3ReviewSubmit";
import InviteWritersModal from "../../../../components/modals/InviteWritersModal";
import ProgressSteps from "../../../../components/Loader/ProgressSteps";
import FileUploadList from "../../../../components/form/FileUploadList";
import WriterPreferenceSelector from "./WriterPreferenceSelector";
import OrderFormContainer from "../../../../components/layout/OrderFormContainer";

import { calculatePrice, formatDeadlineDate } from "./priceCalculator";
import { favoriteWriters, allWriters } from "./dummyData";

export default function NewOrder() {
  // Generate orderId ONCE per order
  const [orderId] = useState(() => Math.floor(100000 + Math.random() * 900000));

  // Load formData from localStorage if available
  const getInitialFormData = () => {
    const saved = localStorage.getItem("orderFormData");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback to default if corrupted
      }
    }
    return {
      orderId,
      title: "",
      subject: "",
      type: "",
      academicLevel: "",
      pages: 1,
      deadline: "7",
      instructions: "",
      files: [],
      writerPreference: "any",
      writingStyle: "",
      invitedWriters: [],
    };
  };

  const [step, setStep] = useState(1);
  const [editing, setEditing] = useState({});
  const [formData, setFormData] = useState(getInitialFormData);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  // Initialize selectedWriters as array of IDs from formData.invitedWriters
  const [selectedWriters, setSelectedWriters] = useState(
    formData.invitedWriters.map((w) => w.id)
  );

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...Array.from(e.target.files)],
    }));
    toast("File(s) uploaded!", { icon: "📎", duration: 1200 });
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
    toast("File removed.", { icon: "❌", duration: 1000 });
  };

  const getStepStatus = (stepNumber) => {
    if (stepNumber < step) return "completed";
    if (stepNumber === step) return "current";
    return "upcoming";
  };

  const handleStepChange = (nextStep) => {
    setStep(nextStep);
    const stepLabels = [
      "Paper Details",
      "Instructions & Materials",
      "Review & Submit",
    ];
    toast(`Step: ${stepLabels[nextStep - 1]}`, { icon: "📝", duration: 1200 });
  };

  const handleFieldFocus = (label) => {
    toast(`Enter your ${label}.`, { icon: "ℹ️", duration: 1000 });
  };

  const handleWriterPreference = (option) => {
    setFormData((prev) => ({ ...prev, writerPreference: option }));
    toast(
      `Writer preference set: ${
        option === "any"
          ? "Any Qualified Writer"
          : option === "top-rated"
          ? "Top Rated Writer"
          : option === "subject-expert"
          ? "Subject Expert"
          : "My Preferred Writer"
      }`,
      { icon: "👤", duration: 1200 }
    );
    if (option === "preferred") {
      setInviteModalOpen(true);
    }
  };

  // Updated: When closing the modal, if no writers are selected, set writerPreference to 'any'
  const handleCloseInviteModal = () => {
    if (selectedWriters.length === 0) {
      setFormData((prev) => ({
        ...prev,
        writerPreference: "any",
        invitedWriters: [],
      }));
    }
    setInviteModalOpen(false);
  };

  // Updated handleInviteConfirm to use selectedWriters as IDs and store full writer objects in invitedWriters
  const handleInviteConfirm = () => {
    const invited = [...favoriteWriters, ...allWriters].filter((writer) =>
      selectedWriters.includes(writer.id)
    );

    setFormData((prev) => ({
      ...prev,
      invitedWriters: invited,
      writerPreference: "preferred",
    }));

    setInviteModalOpen(false);
  };

  const handleSubmit = () => {
    toast.success("Order submitted! Our team will assign a writer soon.", {
      icon: "🎉",
      duration: 2000,
    });

    // Save a copy of the current formData
    const submittedOrder = { ...formData };

    // Save to localStorage ONLY on submit
    localStorage.setItem("orderFormData", JSON.stringify(submittedOrder));
    saveOrderToLocalStorage(submittedOrder);

    // Navigate first, then reset formData (after navigation)
    navigate("/dashboard/order-confirmation", {
      state: { order: submittedOrder },
    });

    // Clear formData fields **after a short delay** or on next mount of this component
    setTimeout(() => {
      setFormData({
        orderId: Math.floor(100000 + Math.random() * 900000),
        title: "",
        subject: "",
        type: "",
        academicLevel: "",
        pages: 1,
        deadline: "7",
        instructions: "",
        files: [],
        writerPreference: "any",
        writingStyle: "",
        invitedWriters: [],
        calculatePrice: 0,
        urgencyFee: 0,
        writerFee: 0,
        totalPrice: 0,
      });
    }, 2000);
  };

  // Update price fields in formData whenever relevant fields change
  useEffect(() => {
    const basePrice = calculatePrice(formData);
    // Example: You may have your own logic for urgencyFee, writerFee, totalPrice
    const urgencyFee =
      formData.deadline === "1"
        ? basePrice * 0.5
        : formData.deadline === "3"
        ? basePrice * 0.25
        : formData.deadline === "7"
        ? basePrice * 0.1
        : 0;
    const writerFee =
      formData.writerPreference === "top-rated"
        ? basePrice * 0.2
        : formData.writerPreference === "subject-expert"
        ? basePrice * 0.15
        : 0;
    const totalPrice = basePrice + urgencyFee + writerFee;

    setFormData((prev) => ({
      ...prev,
      calculatePrice: basePrice,
      urgencyFee,
      writerFee,
      totalPrice,
    }));
    // eslint-disable-next-line
  }, [
    formData.pages,
    formData.deadline,
    formData.writerPreference,
    formData.type,
    formData.academicLevel,
    formData.title,
    formData.subject,
    formData.writingStyle,
  ]);

  const requiredFields = [
    "title",
    "subject",
    "type",
    "academicLevel",
    "writingStyle",
    "pages",
    "deadline",
  ];

  const isFormComplete = requiredFields.every(
    (field) => formData[field] && String(formData[field]).trim() !== ""
  );

  return (
    <OrderFormContainer>
      <Toaster position="top-right" />
      <ProgressSteps step={step} onStepChange={handleStepChange} />

      <div className="p-6">
        {step === 1 && (
          <Step1PaperDetails
            formData={formData}
            handleChange={handleChange}
            handleFieldFocus={handleFieldFocus}
            calculatePrice={calculatePrice}
            formatDeadlineDate={formatDeadlineDate}
            handleStepChange={handleStepChange}
            isFormComplete={isFormComplete}
          />
        )}

        {step === 2 && (
          <Step2InstructionsMaterials
            formData={formData}
            handleChange={handleChange}
            handleFieldFocus={handleFieldFocus}
            calculatePrice={calculatePrice}
            removeFile={removeFile}
            handleFileChange={handleFileChange}
            handleStepChange={handleStepChange}
            handleWriterPreference={handleWriterPreference}
            FileUploadList={FileUploadList}
            WriterPreferenceSelector={WriterPreferenceSelector}
          />
        )}

        {step === 3 && (
          <Step3ReviewSubmit
            formData={formData}
            editing={editing}
            setEditing={setEditing}
            handleChange={handleChange}
            removeFile={removeFile}
            handleSubmit={handleSubmit}
            calculatePrice={calculatePrice}
            formatDeadlineDate={formatDeadlineDate}
            handleStepChange={handleStepChange}
          />
        )}
      </div>

      {inviteModalOpen && (
        <InviteWritersModal
          selectedWriters={selectedWriters}
          setSelectedWriters={setSelectedWriters}
          setInviteModalOpen={handleCloseInviteModal}
          handleInviteConfirm={handleInviteConfirm}
          formData={formData}
        />
      )}
    </OrderFormContainer>
  );
}

// New function to save order to localStorage
const saveOrderToLocalStorage = (order) => {
  // Get existing orders or start with an empty array
  const existing = JSON.parse(
    localStorage.getItem("orderFormDataList") || "[]"
  );
  // Add the new order
  existing.push(order);
  // Save back to localStorage
  localStorage.setItem("orderFormDataList", JSON.stringify(existing));
};

const orders = JSON.parse(localStorage.getItem("orderFormDataList") || "[]");
