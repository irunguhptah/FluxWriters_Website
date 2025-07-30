// components/NewOrder/Step2InstructionsMaterials.jsx
import React from "react";
import { FileText } from "lucide-react";
import InfoBanner from "../../../../components/common/InfoBanner";
import NextButton from "../../../../components/common/NextButton";
import InstructionsTextarea from "../../../../components/form/InstructionsTextarea";
import FileUpload from "../../../../components/form/FileUpload";
import WriterPreferenceSelector from "../../../../components/form/WriterPreferenceSelector";
import BackButton from "../../../../components/common/BackButton";
import PriceEstimator from "../../../../components/common/PriceEstimatorCard"; // <-- import

export default function Step2InstructionsMaterials({
  formData,
  handleChange,
  handleFieldFocus,
  calculatePrice,
  removeFile,
  handleFileChange,
  handleStepChange,
  handleWriterPreference,
}) {
  const isFormComplete =
    formData.instructions &&
    (formData.writerPreference !== "preferred" ||
      formData.invitedWriters.length > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-2">
        <FileText className="h-5 w-5 text-blue-500" />
        <h2 className="text-xl font-medium text-gray-900">
          Instructions & Materials
        </h2>
        <span className="ml-4 px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-mono">
          Order ID: #{formData.orderId}
        </span>
      </div>

      <InfoBanner>
        Please provide detailed instructions and upload any relevant materials for
        your order.
      </InfoBanner>

      <InstructionsTextarea
        value={formData.instructions}
        onChange={handleChange}
        onFocus={() => handleFieldFocus("instructions")}
      />

      <FileUpload
        files={formData.files}
        onFileChange={handleFileChange}
        removeFile={removeFile}
      />

      <WriterPreferenceSelector
        writerPreference={formData.writerPreference}
        invitedWriters={formData.invitedWriters}
        handleWriterPreference={handleWriterPreference}
      />

      <PriceEstimator price={calculatePrice(formData)} />

      <div className="flex justify-between mt-8">
        <BackButton
          onClick={() => handleStepChange(1)}
          title="Back to Paper Details"
          ariaLabel="Back"
        />
        <NextButton
          onClick={() => handleStepChange(3)}
          disabled={!isFormComplete}
          title={
            !isFormComplete
              ? "Please fill all required fields"
              : "Go to Review & Submit"
          }
          aria-label="Next step"
        >
          Next
        </NextButton>
      </div>
    </div>
  );
}
