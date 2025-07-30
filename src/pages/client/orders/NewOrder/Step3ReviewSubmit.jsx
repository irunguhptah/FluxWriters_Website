// components/NewOrder/Step3ReviewSubmit.jsx
import React, { useState } from "react";
import { Check } from "lucide-react";
import InviteWritersModal from "../../../../components/modals/InviteWritersModal";
import PriceEstimator from "../../../../components/common/PriceEstimatorCard";
import BackButton from "../../../../components/common/BackButton";
import PaperDetailsReviewCard from "../../../../components/Card/orderReviewCard/PaperDetailsReviewCard";
import InstructionsMaterialsReviewCard from "../../../../components/Card/orderReviewCard/InstructionsMaterialsReviewCard";

function SubmitButton({ onClick, title, ariaLabel, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-6 py-3 bg-blue-600 rounded-lg shadow-md text-white hover:bg-blue-500 transition"
      title={title}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default function Step3ReviewSubmit({
  formData,
  editing,
  setEditing,
  handleChange,
  removeFile,
  handleSubmit,
  calculatePrice,
  formatDeadlineDate,
  handleStepChange,
}) {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [selectedWriterIds, setSelectedWriterIds] = React.useState(() => {
    const stored = localStorage.getItem("selectedWriterIds");
    if (stored) return JSON.parse(stored);
    return formData.invitedWriters?.map((w) => w.id) || [];
  });

  React.useEffect(() => {
    localStorage.setItem(
      "selectedWriterIds",
      JSON.stringify(selectedWriterIds)
    );
  }, [selectedWriterIds]);

  const handleInviteConfirm = () => {
    const { favoriteWriters, allWriters } = require("./dummyData");
    const allWritersList = [...favoriteWriters, ...allWriters];

    const selectedWriters = allWritersList
      .filter((writer) => selectedWriterIds.includes(writer.id))
      .map((writer) => ({
        id: writer.id,
        name: writer.name,
        rating: writer.rating,
        specialties: writer.specialties || [],
      }));

    handleChange({
      target: {
        name: "invitedWriters",
        value: selectedWriters,
      },
    });

    handleChange({
      target: {
        name: "writerPreference",
        value: "preferred",
      },
    });
    setInviteModalOpen(false);
  };

  const toggleEditing = (field) => {
    setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-2">
        <Check className="h-5 w-5 text-blue-500" />
        <h2 className="text-xl font-medium text-gray-900">Review Your Order</h2>
        <span className="ml-4 px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-mono">
          Order ID: #{formData.orderId}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PaperDetailsReviewCard
          formData={formData}
          editing={editing}
          toggleEditing={toggleEditing}
          handleChange={handleChange}
          formatDeadlineDate={formatDeadlineDate}
        />
        <InstructionsMaterialsReviewCard
          formData={formData}
          editing={editing}
          toggleEditing={toggleEditing}
          handleChange={handleChange}
          removeFile={removeFile}
          setInviteModalOpen={setInviteModalOpen}
          setSelectedWriterIds={setSelectedWriterIds}
        />
      </div>

      <PriceEstimator price={calculatePrice(formData)} />

      <div className="flex justify-between gap-4 mt-8">
        <BackButton
          onClick={() => handleStepChange(2)}
          title="Back to Instructions & Materials"
          ariaLabel="Back"
        />
        <SubmitButton
          onClick={handleSubmit}
          title="Submit your order"
          ariaLabel="Submit Order"
        >
          Submit Order
        </SubmitButton>
      </div>

      {inviteModalOpen && (
        <InviteWritersModal
          selectedWriters={selectedWriterIds}
          setSelectedWriters={setSelectedWriterIds}
          setInviteModalOpen={setInviteModalOpen}
          handleInviteConfirm={handleInviteConfirm}
          setWriterPreference={(value) =>
            handleChange({
              target: { name: "writerPreference", value },
            })
          }
        />
      )}
    </div>
  );
}
