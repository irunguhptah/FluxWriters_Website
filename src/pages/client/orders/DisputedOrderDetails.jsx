import React, { useState } from "react";
import {
  AlertOctagon,
  FileText,
  CheckCircle,
  MessageSquare,
  DollarSign,
  Shield,
  ChevronLeft,
  File,
  User,
  Calendar,
  Info,
  Paperclip,
  Download,
  AlertTriangle,
  Clock,
  HelpCircle,
  FileSearch,
  ClipboardList,
  X,
  Check,
  ArrowRight,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export default function DisputedOrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [evidenceFiles, setEvidenceFiles] = useState([]);

  // Mock data for disputed orders
  const orders = [
    {
      id: "ORD-78951",
      title: "Economics Thesis",
      writer: "Prof. John Keynes",
      disputedDate: "2023-06-28",
      originalDueDate: "2023-06-25",
      resolutionDeadline: "2023-07-05",
      issue:
        "Plagiarism detected in sections 3.2 and 4.1 (25% similarity according to Turnitin)",
      status: "Under Review",
      lastUpdated: "5 days ago",
      price: "$220",
      attachments: [
        { name: "Original_Paper.docx", size: "3.2 MB", date: "2023-06-25" },
        { name: "Plagiarism_Report.pdf", size: "1.8 MB", date: "2023-06-28" },
      ],
      messages: [
        {
          id: 1,
          sender: "Support Team",
          content:
            "We've received your dispute and assigned case #DS-7842. Our academic team will review within 3 business days.",
          timestamp: "2023-06-28 10:15",
          isCustomer: false,
        },
        {
          id: 2,
          sender: "You",
          content:
            "I believe the similarity is due to properly cited sources. Please review my references list.",
          timestamp: "2023-06-28 14:30",
          isCustomer: true,
        },
        {
          id: 3,
          sender: "Prof. John Keynes",
          content:
            "I stand by my original assessment. The highlighted sections contain verbatim text without proper quotation.",
          timestamp: "2023-06-29 09:45",
          isCustomer: false,
        },
      ],
      timeline: [
        {
          step: 1,
          title: "Dispute Filed",
          date: "2023-06-28",
          completed: true,
        },
        { step: 2, title: "Under Review", date: "2023-06-29", completed: true },
        {
          step: 3,
          title: "Evidence Collection",
          date: "2023-07-01",
          completed: false,
        },
        {
          step: 4,
          title: "Resolution Decision",
          date: "2023-07-05",
          completed: false,
        },
        { step: 5, title: "Case Closed", date: "", completed: false },
      ],
    },
  ];

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 text-center">
        <FileText className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
          Order not found
        </h3>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleDownload = (file) => {
    toast.success(`Downloading ${file.name}...`);
  };

  const handleContactSupport = () => {
    toast("Connecting you with support...", { icon: "💬" });
  };

  const handleAddEvidence = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setEvidenceFiles([
        ...evidenceFiles,
        ...files.map((file) => ({
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          date: new Date().toISOString().split("T")[0],
        })),
      ]);
      toast.success(`${files.length} file(s) added as evidence`);
    }
  };

  const handleSubmitResolution = () => {
    if (!resolutionNotes.trim()) {
      toast.error("Please provide your resolution notes");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Resolution submitted successfully!");
      setIsSubmitting(false);
      setActiveStep(4); // Move to next step
    }, 1500);
  };

  const handleCancelDispute = () => {
    toast("Are you sure you want to cancel this dispute?", {
      icon: "⚠️",
      duration: 6000,
      position: "top-center",
      action: {
        label: "Confirm",
        onClick: () => {
          toast.success("Dispute cancelled successfully");
          navigate(-1);
        },
      },
    });
  };

  return (
    <div className="max-w-5xl w-full mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 mt-8">
      <Toaster position="top-right" />

      {/* Header with back button */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {order.title} - Dispute #{order.id.replace("ORD-", "DS-")}
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600 dark:text-gray-300">
              <span className="flex items-center gap-1">
                <File className="h-4 w-4" /> #{order.id}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" /> {order.writer}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Disputed: {order.disputedDate}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" /> {order.price}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status and Progress */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Status:</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300">
              {order.status}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Resolution Deadline:
            </span>
            <span className="font-medium">{order.resolutionDeadline}</span>
          </div>
        </div>

        {/* Dispute Progress Stepper */}
        <div className="mt-4">
          <div className="flex items-center justify-between relative">
            {order.timeline.map((step) => (
              <div key={step.step} className="flex flex-col items-center z-10">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    step.completed
                      ? "bg-purple-600 text-white"
                      : activeStep === step.step
                      ? "border-2 border-purple-600 bg-white dark:bg-gray-800 text-purple-600"
                      : "border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-400"
                  }`}
                >
                  {step.completed ? <Check className="h-4 w-4" /> : step.step}
                </div>
                <div
                  className={`mt-2 text-xs text-center ${
                    step.completed
                      ? "font-medium text-purple-600 dark:text-purple-400"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </div>
                {step.date && (
                  <div className="text-xs text-gray-400 mt-1">{step.date}</div>
                )}
              </div>
            ))}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 z-0">
              <div
                className="h-full bg-purple-600 transition-all duration-500"
                style={{
                  width: `${
                    (order.timeline.find((s) => s.completed)?.step || 0) * 25
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 py-3 text-sm font-medium flex items-center gap-2 ${
              activeTab === "details"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <Info className="h-4 w-4" />
            Dispute Details
          </button>
          <button
            onClick={() => setActiveTab("evidence")}
            className={`px-4 py-3 text-sm font-medium flex items-center gap-2 ${
              activeTab === "evidence"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <FileSearch className="h-4 w-4" />
            Evidence
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-3 text-sm font-medium flex items-center gap-2 ${
              activeTab === "messages"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            Messages
          </button>
          <button
            onClick={() => setActiveTab("resolution")}
            className={`px-4 py-3 text-sm font-medium flex items-center gap-2 ${
              activeTab === "resolution"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <ClipboardList className="h-4 w-4" />
            Resolution
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === "details" && (
          <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-purple-500 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    Dispute Summary
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {order.issue}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Timeline Analysis
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                      <span>Original Submission</span>
                      <span>{order.originalDueDate}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                      <div
                        className="h-full rounded-full bg-green-500"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                      <span>Dispute Filed</span>
                      <span>{order.disputedDate}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                      <div
                        className="h-full rounded-full bg-purple-500"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                      <span>Resolution Deadline</span>
                      <span>{order.resolutionDeadline}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                      <div
                        className="h-full rounded-full bg-yellow-500"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Dispute Resources
                </h3>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span>Dispute Resolution Policy</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Academic Integrity Guidelines</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Shield className="h-4 w-4" />
                    <span>How to Prepare Your Evidence</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "evidence" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Original Submission Files
              </h3>
              {order.attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800">
                      <File className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {file.name}
                      </h4>
                      <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span>{file.size}</span>
                        <span>Uploaded: {file.date}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(file)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    title="Download file"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Your Supporting Evidence
              </h3>
              {evidenceFiles.length > 0 ? (
                <div className="space-y-4 mt-4">
                  {evidenceFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                          <FileSearch className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {file.name}
                          </h4>
                          <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <span>{file.size}</span>
                            <span>Uploaded: {file.date}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownload(file)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        title="Download file"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    No evidence files uploaded yet
                  </p>
                </div>
              )}
              <div className="mt-4">
                <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleAddEvidence}
                    multiple
                  />
                  <FileSearch className="h-4 w-4 mr-2" />
                  Add Evidence Files
                </label>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Upload screenshots, reference materials, or other supporting
                  documents
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="space-y-6">
            <div className="space-y-4">
              {order.messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg ${
                    message.isCustomer
                      ? "bg-blue-50 dark:bg-blue-900/30"
                      : message.sender.includes("Support")
                      ? "bg-purple-50 dark:bg-purple-900/20"
                      : "bg-gray-50 dark:bg-gray-800"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {message.sender}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {message.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {message.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
              <form className="space-y-4">
                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Type your message here..."
                    defaultValue={""}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleContactSupport}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Request Support
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === "resolution" && (
          <div className="space-y-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-800">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    Resolution Options
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Please carefully review the options below and provide any
                    additional notes to help resolve this dispute.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`p-4 rounded-lg border ${
                  resolutionNotes.includes("partial")
                    ? "border-green-500 bg-green-50 dark:bg-green-900/10"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Partial Refund
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Accept a partial refund for the disputed sections while
                  keeping the usable portions.
                </p>
                <button
                  onClick={() =>
                    setResolutionNotes(
                      "I would like to request a partial refund for the affected sections."
                    )
                  }
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Select this option
                </button>
              </div>

              <div
                className={`p-4 rounded-lg border ${
                  resolutionNotes.includes("revise")
                    ? "border-green-500 bg-green-50 dark:bg-green-900/10"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Free Revision
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Request the writer to revise the disputed sections at no
                  additional cost.
                </p>
                <button
                  onClick={() =>
                    setResolutionNotes(
                      "I would like to request a free revision of the disputed sections."
                    )
                  }
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Select this option
                </button>
              </div>

              <div
                className={`p-4 rounded-lg border ${
                  resolutionNotes.includes("full")
                    ? "border-green-500 bg-green-50 dark:bg-green-900/10"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Full Refund
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Request a full refund and cancel the order completely.
                </p>
                <button
                  onClick={() =>
                    setResolutionNotes(
                      "I would like to request a full refund and cancel this order."
                    )
                  }
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Select this option
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="resolutionNotes"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Additional Notes
              </label>
              <textarea
                id="resolutionNotes"
                rows={4}
                className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Provide any additional details about your resolution preference..."
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={handleCancelDispute}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel Dispute
              </button>
              <button
                onClick={handleSubmitResolution}
                disabled={!resolutionNotes.trim() || isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Resolution"}
                {!isSubmitting && <ArrowRight className="h-4 w-4 ml-2" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="border-t border-gray-200 dark:border-gray-800 px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="flex gap-3">
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleContactSupport}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </button>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              onClick={() => handleDownload(order.attachments[0])}
            >
              <Download className="h-4 w-4 mr-2" />
              Download All Files
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>Last updated: {order.lastUpdated}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
