import React from "react";
import { BookOpen } from "lucide-react";

export default function PaperDetailsReviewCard({
  formData,
  editing,
  toggleEditing,
  handleChange,
  formatDeadlineDate,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:border-blue-300 transition-colors">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center pb-3 border-b border-gray-100">
        <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
        Paper Details
      </h3>
      <div className="space-y-4">
        {/* Paper Title */}
        <div className="pb-3 border-b border-gray-100">
          <div className="flex justify-between">
            <h4 className="text-sm font-medium text-gray-500">Paper Title</h4>
            <button
              onClick={() => toggleEditing("title")}
              className="text-xs text-blue-600 hover:text-blue-500"
            >
              {editing.title ? "Done" : "Edit"}
            </button>
          </div>
          {editing.title ? (
            <input
              type="text"
              value={formData.title}
              name="title"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <p className="text-gray-900 mt-1">
              {formData.title || "Not specified"}
            </p>
          )}
        </div>
        {/* Subject */}
        <div className="pb-3 border-b border-gray-100">
          <div className="flex justify-between">
            <h4 className="text-sm font-medium text-gray-500">Subject</h4>
            <button
              onClick={() => toggleEditing("subject")}
              className="text-xs text-blue-600 hover:text-blue-500"
            >
              {editing.subject ? "Done" : "Edit"}
            </button>
          </div>
          {editing.subject ? (
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
            </select>
          ) : (
            <p className="text-gray-900 mt-1">
              {formData.subject || "Not specified"}
            </p>
          )}
        </div>
        {/* Paper Type */}
        <div className="pb-3 border-b border-gray-100">
          <div className="flex justify-between">
            <h4 className="text-sm font-medium text-gray-500">Paper Type</h4>
            <button
              onClick={() => toggleEditing("type")}
              className="text-xs text-blue-600 hover:text-blue-500"
            >
              {editing.type ? "Done" : "Edit"}
            </button>
          </div>
          {editing.type ? (
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">Select type</option>
              <option value="essay">Essay</option>
              <option value="research-paper">Research Paper</option>
              <option value="case-study">Case Study</option>
              <option value="dissertation">Dissertation</option>
              <option value="thesis">Thesis</option>
              <option value="report">Report</option>
              <option value="literature-review">Literature Review</option>
            </select>
          ) : (
            <p className="text-gray-900 mt-1">
              {formData.type || "Not specified"}
            </p>
          )}
        </div>
        {/* Academic Level */}
        <div className="pb-3 border-b border-gray-100">
          <div className="flex justify-between">
            <h4 className="text-sm font-medium text-gray-500">Academic Level</h4>
            <button
              onClick={() => toggleEditing("academicLevel")}
              className="text-xs text-blue-600 hover:text-blue-500"
            >
              {editing.academicLevel ? "Done" : "Edit"}
            </button>
          </div>
          {editing.academicLevel ? (
            <select
              name="academicLevel"
              value={formData.academicLevel}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">Select level</option>
              <option value="high-school">High School</option>
              <option value="college">College</option>
              <option value="university">University (Undergraduate)</option>
              <option value="masters">Master's</option>
              <option value="phd">PhD / Doctoral</option>
            </select>
          ) : (
            <p className="text-gray-900 mt-1">
              {formData.academicLevel || "Not specified"}
            </p>
          )}
        </div>
        {/* Writing Style */}
        <div className="pb-3 border-b border-gray-100">
          <div className="flex justify-between">
            <h4 className="text-sm font-medium text-gray-500">Writing Style</h4>
            <button
              onClick={() => toggleEditing("writingStyle")}
              className="text-xs text-blue-600 hover:text-blue-500"
            >
              {editing.writingStyle ? "Done" : "Edit"}
            </button>
          </div>
          {editing.writingStyle ? (
            <select
              name="writingStyle"
              value={formData.writingStyle}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">Select style</option>
              <option value="APA">APA</option>
              <option value="MLA">MLA</option>
              <option value="Chicago">Chicago</option>
              <option value="Harvard">Harvard</option>
              <option value="Turabian">Turabian</option>
              <option value="Other">Other / Not Sure</option>
            </select>
          ) : (
            <p className="text-gray-900 mt-1">
              {formData.writingStyle || "Not specified"}
            </p>
          )}
        </div>
        {/* Number of Pages */}
        <div className="pb-3 border-b border-gray-100">
          <div className="flex justify-between">
            <h4 className="text-sm font-medium text-gray-500">Number of Pages</h4>
            <button
              onClick={() => toggleEditing("pages")}
              className="text-xs text-blue-600 hover:text-blue-500"
            >
              {editing.pages ? "Done" : "Edit"}
            </button>
          </div>
          {editing.pages ? (
            <div className="flex items-center mt-1">
              <button
                type="button"
                onClick={() =>
                  handleChange({
                    target: {
                      name: "pages",
                      value: Math.max(1, formData.pages - 1),
                    },
                  })
                }
                className="px-2 py-1 border border-gray-300 rounded-l-md bg-gray-50"
              >
                −
              </button>
              <input
                type="number"
                name="pages"
                min="1"
                value={formData.pages}
                onChange={handleChange}
                className="block w-16 text-center px-2 py-1 border-t border-b border-gray-300"
              />
              <button
                type="button"
                onClick={() =>
                  handleChange({
                    target: { name: "pages", value: formData.pages + 1 },
                  })
                }
                className="px-2 py-1 border border-gray-300 rounded-r-md bg-gray-50"
              >
                +
              </button>
            </div>
          ) : (
            <p className="text-gray-900 mt-1">
              {formData.pages} ({formData.pages * 275} words)
            </p>
          )}
        </div>
        {/* Deadline */}
        <div className="pt-1">
          <div className="flex justify-between">
            <h4 className="text-sm font-medium text-gray-500">Deadline</h4>
            <button
              onClick={() => toggleEditing("deadline")}
              className="text-xs text-blue-600 hover:text-blue-500"
            >
              {editing.deadline ? "Done" : "Edit"}
            </button>
          </div>
          {editing.deadline ? (
            <select
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="14">14 days (Standard)</option>
              <option value="7">7 days (+10%)</option>
              <option value="3">3 days (+25%)</option>
              <option value="1">24 hours (+50%)</option>
            </select>
          ) : (
            <p className="text-gray-900 mt-1">
              {formatDeadlineDate(formData.deadline)}
              <span className="text-sm text-gray-500 ml-1">
                ({formData.deadline === "14" && "14 days"}
                {formData.deadline === "7" && "7 days"}
                {formData.deadline === "3" && "3 days"}
                {formData.deadline === "1" && "24 hours"})
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}