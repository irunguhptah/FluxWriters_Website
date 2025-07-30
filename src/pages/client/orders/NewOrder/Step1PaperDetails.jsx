// components/NewOrder/Step1PaperDetails.jsx
import React from "react";
import { BookOpen } from "lucide-react";
import InfoBanner from "../../../../components/common/InfoBanner";
import InputField from "../../../../components/form/InputField";
import SelectField from "../../../../components/form/SelectField";
import PageStepper from "../../../../components/form/PageStepper";
import PriceEstimatorCard from "../../../../components/common/PriceEstimatorCard";
import NextButton from "../../../../components/common/NextButton";

export default function Step1PaperDetails({
  formData,
  handleChange,
  handleFieldFocus,
  calculatePrice,
  formatDeadlineDate,
  handleStepChange,
  isFormComplete,
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-2">
        <BookOpen className="h-5 w-5 text-blue-500" />
        <h2 className="text-xl font-medium text-gray-900">Paper Details</h2>
        <span className="ml-4 px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-mono">
          Order ID: #{formData.orderId}
        </span>
      </div>

      <InfoBanner>
        Provide accurate details about your paper to help us match you with
        the best writer for your needs.
      </InfoBanner>

      <InputField
        id="title"
        label="Paper Title"
        value={formData.title}
        onChange={handleChange}
        onFocus={() => handleFieldFocus("paper title")}
        placeholder="e.g. The Impact of AI on Modern Business"
        required
        title="Enter your paper title"
        aria-label="Paper Title"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          id="subject"
          label="Subject Area"
          value={formData.subject}
          onChange={handleChange}
          onFocus={() => handleFieldFocus("subject area")}
          required
          title="Select subject area"
          aria-label="Subject Area"
        >
          <option value="">Select subject</option>
          <option value="computer-science">Computer Science</option>
          <option value="business">Business & Management</option>
          <option value="psychology">Psychology</option>
          <option value="engineering">Engineering</option>
          <option value="law">Law & Legal Studies</option>
          <option value="literature">Literature</option>
          <option value="medicine">Medicine & Health</option>
          <option value="economics">Economics</option>
        </SelectField>

        <SelectField
          id="type"
          label="Paper Type"
          value={formData.type}
          onChange={handleChange}
          onFocus={() => handleFieldFocus("paper type")}
          required
          title="Select paper type"
          aria-label="Paper Type"
        >
          <option value="">Select type</option>
          <option value="essay">Essay</option>
          <option value="research-paper">Research Paper</option>
          <option value="case-study">Case Study</option>
          <option value="dissertation">Dissertation</option>
          <option value="thesis">Thesis</option>
          <option value="report">Report</option>
          <option value="literature-review">Literature Review</option>
        </SelectField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          id="academicLevel"
          label="Academic Level"
          value={formData.academicLevel}
          onChange={handleChange}
          onFocus={() => handleFieldFocus("academic level")}
          required
          title="Select academic level"
          aria-label="Academic Level"
        >
          <option value="">Select level</option>
          <option value="high-school">High School</option>
          <option value="college">College</option>
          <option value="university">University (Undergraduate)</option>
          <option value="masters">Master's</option>
          <option value="phd">PhD / Doctoral</option>
        </SelectField>

        <SelectField
          id="writingStyle"
          label="Writing Style"
          value={formData.writingStyle}
          onChange={handleChange}
          onFocus={() => handleFieldFocus("writing style")}
          required
          title="Select writing style"
          aria-label="Writing Style"
        >
          <option value="">Select style</option>
          <option value="APA">APA</option>
          <option value="MLA">MLA</option>
          <option value="Chicago">Chicago</option>
          <option value="Harvard">Harvard</option>
          <option value="Turabian">Turabian</option>
          <option value="Other">Other / Not Sure</option>
        </SelectField>
      </div>

      <PageStepper
        value={formData.pages}
        onChange={(val) =>
          handleChange({
            target: { name: "pages", value: val },
          })
        }
      />

      <SelectField
        id="deadline"
        label="Deadline"
        value={formData.deadline}
        onChange={handleChange}
        onFocus={() => handleFieldFocus("deadline")}
        required
        title="Select deadline"
        aria-label="Deadline"
      >
        <option value="14">14 days (Standard)</option>
        <option value="7">7 days (+10%)</option>
        <option value="3">3 days (+25%)</option>
        <option value="1">24 hours (+50%)</option>
      </SelectField>
      <p className="mt-1 text-sm text-gray-500">
        Your paper will be delivered by:{" "}
        <span className="font-medium text-blue-600">
          {formatDeadlineDate(formData.deadline)}
        </span>
      </p>

      <PriceEstimatorCard price={calculatePrice(formData)} />

      <div className="flex justify-end mt-8">
        <NextButton
          onClick={() => handleStepChange(2)}
          disabled={!isFormComplete}
          title={
            !isFormComplete
              ? "Please fill all required fields"
              : "Go to Instructions & Materials"
          }
          aria-label="Next step"
        >
          Next
        </NextButton>
      </div>
    </div>
  );
}
