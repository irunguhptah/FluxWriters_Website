import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, BookOpen, Clock, DollarSign, AlertCircle, Upload, X, Check, ChevronRight, Info, Users } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Dummy data for writers (replace with API data in production)
const favoriteWriters = [
  { id: 1, name: 'Jane Doe', rating: 4.9 },
  { id: 2, name: 'John Smith', rating: 4.8 },
];
const allWriters = [
  { id: 3, name: 'Alice Johnson', rating: 4.7 },
  { id: 4, name: 'Bob Lee', rating: 4.6 },
  // ...more writers
];

export default function NewOrder() {
  const [step, setStep] = useState(1);
  const [editing, setEditing] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    type: '',
    academicLevel: '',
    pages: 1,
    deadline: '7',
    instructions: '',
    files: [],
    writerPreference: 'any',
    writingStyle: '',
    invitedWriters: [], // <-- Add this
  });
  const [inviteModalOpen, setInviteModalOpen] = useState(false); // <-- Add this
  const [selectedWriters, setSelectedWriters] = useState([]); // <-- Add this
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...Array.from(e.target.files)]
    }));
    toast('File(s) uploaded!', { icon: '📎', duration: 1200 });
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
    toast('File removed.', { icon: '❌', duration: 1000 });
  };

  // More accurate pricing calculation
  const calculatePrice = () => {
    // Base price per page depends on academic level
    const levelPrices = {
      'high-school': 8,
      'college': 10,
      'university': 12,
      'masters': 15,
      'phd': 20
    };
    
    const basePagePrice = levelPrices[formData.academicLevel] || 10;
    const pagePrice = formData.pages * basePagePrice;
    
    // Deadline multipliers
    const deadlineMultipliers = {
      '14': 1.0,
      '7': 1.1,
      '3': 1.25,
      '1': 1.5
    };
    
    // Writer preference multipliers
    const writerMultipliers = {
      'any': 1.0,
      'top-rated': 1.15,
      'subject-expert': 1.2,
      'preferred': 1.1
    };
    
    // Paper type complexity adjustments
    const typeMultipliers = {
      'essay': 1.0,
      'research-paper': 1.1,
      'case-study': 1.15,
      'dissertation': 1.3,
      'thesis': 1.25
    };
    
    let basePrice = pagePrice;
    basePrice *= deadlineMultipliers[formData.deadline] || 1.0;
    basePrice *= writerMultipliers[formData.writerPreference] || 1.0;
    basePrice *= typeMultipliers[formData.type] || 1.0;
    
    return Math.round(basePrice);
  };

  const formatDeadlineDate = () => {
    const days = parseInt(formData.deadline, 10);
    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + days);
    return deadlineDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getFieldStatus = (fieldName) => {
    if (!formData[fieldName]) return 'empty';
    return 'valid';
  };

  const getStepStatus = (stepNumber) => {
    if (stepNumber < step) return 'completed';
    if (stepNumber === step) return 'current';
    return 'upcoming';
  };

  // Toast helpers for step navigation and actions
  const handleStepChange = (nextStep) => {
    setStep(nextStep);
    const stepLabels = ['Paper Details', 'Instructions & Materials', 'Review & Submit'];
    toast(`Step: ${stepLabels[nextStep - 1]}`, { icon: '📝', duration: 1200 });
  };

  const handleFieldFocus = (label) => {
    toast(`Enter your ${label}.`, { icon: 'ℹ️', duration: 1000 });
  };

  const handleWriterPreference = (option) => {
    setFormData(prev => ({ ...prev, writerPreference: option }));
    toast(`Writer preference set: ${
      option === 'any' ? 'Any Qualified Writer' :
      option === 'top-rated' ? 'Top Rated Writer' :
      option === 'subject-expert' ? 'Subject Expert' :
      'My Preferred Writer'
    }`, { icon: '👤', duration: 1200 });
    if (option === 'preferred') {
      setInviteModalOpen(true);
    }
  };

  const handleWriterSelect = (writerId) => {
    setSelectedWriters(prev =>
      prev.includes(writerId)
        ? prev.filter(id => id !== writerId)
        : [...prev, writerId]
    );
  };

  const handleInviteConfirm = () => {
    setFormData(prev => ({ ...prev, invitedWriters: selectedWriters }));
    setInviteModalOpen(false);
    toast.success(`Invited ${selectedWriters.length} writer(s)`, { icon: '✉️', duration: 1500 });
  };

  const handleEditToggle = (field) => {
    setEditing(prev => ({ ...prev, [field]: !prev[field] }));
    toast(editing[field] ? `Saved ${field}.` : `Editing ${field}.`, { icon: editing[field] ? '✅' : '✏️', duration: 1000 });
  };

  const handleSubmit = () => {
    toast.success('Order submitted! Our team will assign a writer soon.', { icon: '🎉', duration: 2000 });
    setTimeout(() => {
      navigate('/dashboard/order-confirmation', { state: { order: formData } }); // Pass order data here
    }, 1200);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden max-w-4xl mx-auto">
      <Toaster position="top-right" />
      {/* Header with Progress Steps */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-800">
        <div className="px-6 py-5">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">New Academic Order</h1>
          <div className="relative">
            {/* Progress Bar */}
            <div className="absolute top-1/3 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 -translate-y-1/2"></div>
            <div 
              className="absolute top-1/3 left-0 h-1 bg-blue-500 -translate-y-1/2 transition-all duration-300"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
            
            {/* Step Indicators */}
            <div className="relative flex items-center justify-between">
              {[1, 2, 3].map((stepNumber) => {
                const status = getStepStatus(stepNumber);
                return (
                  <div key={stepNumber} className="flex flex-col items-center z-10">
                    <div 
                      className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                        status === 'completed' ? 'bg-blue-600 text-white' : 
                        status === 'current' ? 'bg-white dark:bg-gray-900 border-2 border-blue-600 text-blue-600 dark:text-blue-400' : 
                        'bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600'
                      }`}
                      title={
                        stepNumber === 1 ? "Paper Details" :
                        stepNumber === 2 ? "Instructions & Materials" :
                        "Review & Submit"
                      }
                      aria-label={
                        stepNumber === 1 ? "Paper Details" :
                        stepNumber === 2 ? "Instructions & Materials" :
                        "Review & Submit"
                      }
                    >
                      {status === 'completed' ? <Check className="h-5 w-5" /> : stepNumber}
                    </div>
                    <span className={`text-sm mt-2 font-medium ${
                      status === 'completed' ? 'text-blue-600 dark:text-blue-400' : 
                      status === 'current' ? 'text-blue-600 dark:text-blue-400' : 
                      'text-gray-500 dark:text-gray-300'
                    }`}>
                      {stepNumber === 1 && 'Paper Details'}
                      {stepNumber === 2 && 'Instructions'}
                      {stepNumber === 3 && 'Review & Submit'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Form Content */}
      <div className="p-6">
        {/* Step 1: Paper Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-medium text-gray-900">Paper Details</h2>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start">
              <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700">
                Provide accurate details about your paper to help us match you with the best writer for your needs.
              </p>
            </div>
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Paper Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onFocus={() => handleFieldFocus('paper title')}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="e.g. The Impact of AI on Modern Business"
                title="Enter your paper title"
                aria-label="Paper Title"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Area <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => handleFieldFocus('subject area')}
                    className="block w-full appearance-none px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white pr-10 transition"
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
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronRight className="h-4 w-4 rotate-90" />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Paper Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    onFocus={() => handleFieldFocus('paper type')}
                    className="block w-full appearance-none px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white pr-10 transition"
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
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronRight className="h-4 w-4 rotate-90" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="academicLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Academic Level <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="academicLevel"
                    name="academicLevel"
                    value={formData.academicLevel}
                    onChange={handleChange}
                    onFocus={() => handleFieldFocus('academic level')}
                    className="block w-full appearance-none px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white pr-10 transition"
                    title="Select academic level"
                    aria-label="Academic Level"
                  >
                    <option value="">Select level</option>
                    <option value="high-school">High School</option>
                    <option value="college">College</option>
                    <option value="university">University (Undergraduate)</option>
                    <option value="masters">Master's</option>
                    <option value="phd">PhD / Doctoral</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronRight className="h-4 w-4 rotate-90" />
                  </div>
                </div>
              </div>
              
              {/* INSERT HERE */}
              <div>
                <label htmlFor="writingStyle" className="block text-sm font-medium text-gray-700 mb-1">
                  Writing Style <span className="text-red-500">*</span>
                </label>
                <select
                  id="writingStyle"
                  name="writingStyle"
                  value={formData.writingStyle}
                  onChange={handleChange}
                  onFocus={() => handleFieldFocus('writing style')}
                  className="block w-full appearance-none px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white pr-10 transition"
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
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronRight className="h-4 w-4 rotate-90" />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="pages" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Pages <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <button 
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, pages: Math.max(1, prev.pages - 1) }))} 
                  className="px-4 py-3 border border-gray-300 rounded-l-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  −
                </button>
                <input
                  type="number"
                  id="pages"
                  name="pages"
                  min="1"
                  value={formData.pages}
                  onChange={handleChange}
                  className="block w-20 px-4 py-3 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button 
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, pages: prev.pages + 1 }))}
                  className="px-4 py-3 border border-gray-300 rounded-r-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  +
                </button>
                <span className="ml-3 text-sm text-gray-500">(~275 words per page)</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                Deadline <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  onFocus={() => handleFieldFocus('deadline')}
                  className="block w-full appearance-none px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white pr-10 transition"
                  title="Select deadline"
                  aria-label="Deadline"
                >
                  <option value="14">14 days (Standard)</option>
                  <option value="7">7 days (+10%)</option>
                  <option value="3">3 days (+25%)</option>
                  <option value="1">24 hours (+50%)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronRight className="h-4 w-4 rotate-90" />
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Your paper will be delivered by: <span className="font-medium text-blue-600">{formatDeadlineDate()}</span>
              </p>
            </div>
            
            {/* Price estimator card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-5 text-white mt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Estimated Price</h3>
                  <p className="text-sm opacity-90">Based on your current selections</p>
                </div>
                <div className="text-2xl font-bold">${calculatePrice()}</div>
              </div>
              <p className="text-xs mt-3 opacity-80">
                Final price may vary based on additional requirements.
              </p>
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={() => handleStepChange(2)}
                className="px-6 py-3 bg-blue-600 rounded-lg shadow-md text-white hover:bg-blue-500 transition"
                title="Go to Instructions & Materials"
                aria-label="Next step"
              >
                Next
              </button>
            </div>
          </div>
        )}
        
        {/* Step 2: Instructions & Materials */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-medium text-gray-900">Instructions & Materials</h2>
            </div>
            
            <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                Detailed Instructions <span className="text-red-500">*</span>
              </label>
              <textarea
                id="instructions"
                name="instructions"
                rows={6}
                value={formData.instructions}
                onChange={handleChange}
                onFocus={() => handleFieldFocus('instructions')}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Provide detailed instructions for your paper. Be specific about requirements, formatting style (APA, MLA, etc.), key points to address, and any specific sources to use."
                title="Enter detailed instructions"
                aria-label="Detailed Instructions"
              ></textarea>
              <p className="mt-1 text-sm text-gray-500">
                Thorough instructions help us deliver exactly what you need.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Files (Optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors bg-gray-50">
                <div className="space-y-2 text-center">
                  <Upload className="mx-auto h-10 w-10 text-gray-400" />
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none px-3 py-2 border border-gray-300 shadow-sm transition"
                      title="Upload files"
                      aria-label="Upload files"
                    >
                      <span>Upload files</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1 flex items-center">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX up to 20MB each
                  </p>
                </div>
              </div>
              
              {formData.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center">
                    <FileText className="h-4 w-4 mr-1 text-blue-500" />
                    Uploaded Files ({formData.files.length})
                  </h3>
                  <ul className="border border-gray-200 rounded-lg divide-y divide-gray-200 overflow-hidden bg-gray-50">
                    {formData.files.map((file, index) => (
                      <li key={index} className="pl-4 pr-4 py-3 flex items-center justify-between text-sm hover:bg-gray-100 transition-colors">
                        <div className="w-0 flex-1 flex items-center">
                          <FileText className="flex-shrink-0 h-5 w-5 text-gray-400" />
                          <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
                          <span className="ml-2 text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="font-medium text-red-600 hover:text-red-500 flex items-center"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="writerPreference" className="block text-sm font-medium text-gray-700 mb-1">
                Writer Preference
              </label>
              <p className="text-xs text-gray-500 mb-2">
                You can let all writers bid for your order, or invite specific writers from your favorites or the writers list.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition ${
                    formData.writerPreference === 'any' 
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleWriterPreference('any')}
                  title="Let all qualified writers bid"
                  aria-label="Let all writers bid"
                >
                  <div className="flex items-start">
                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                      formData.writerPreference === 'any' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                    }`}>
                      {formData.writerPreference === 'any' && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <div>
                      <h3 className="font-medium">Let All Writers Bid</h3>
                      <p className="text-sm text-gray-500 mt-1">Your order will be visible to all qualified writers.</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition ${
                    formData.writerPreference === 'preferred' 
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleWriterPreference('preferred')}
                  title="Invite writers from your list"
                  aria-label="Invite writers"
                >
                  <div className="flex items-start">
                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                      formData.writerPreference === 'preferred' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                    }`}>
                      {formData.writerPreference === 'preferred' && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <div>
                      <h3 className="font-medium">Invite Writers</h3>
                      <p className="text-sm text-gray-500 mt-1">Select writers from your favorites or the writers list to invite.</p>
                      {formData.invitedWriters.length > 0 && (
                        <span className="inline-block mt-2 text-xs text-blue-600">
                          {formData.invitedWriters.length} writer(s) invited
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Estimated Price Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-5 text-white mt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Estimated Price</h3>
                  <p className="text-sm opacity-90">Based on your current selections</p>
                </div>
                <div className="text-2xl font-bold">${calculatePrice()}</div>
              </div>
              <p className="text-xs mt-3 opacity-80">
                Final price may vary based on additional requirements.
              </p>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => handleStepChange(1)}
                className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition"
                title="Back to Paper Details"
                aria-label="Back"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => handleStepChange(3)}
                className="px-6 py-3 bg-blue-600 rounded-lg shadow-md text-white hover:bg-blue-500 transition"
                title="Go to Review & Submit"
                aria-label="Next step"
              >
                Next
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <Check className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-medium text-gray-900">Review Your Order</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Paper Details Card - Enhanced with better borders */}
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:border-blue-300 transition-colors">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center pb-3 border-b border-gray-100">
                  <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
                  Paper Details
                </h3>
                
                <div className="space-y-4">
                  {/* Paper Title with inline editing */}
                  <div className="pb-3 border-b border-gray-100">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-gray-500">Paper Title</h4>
                      <button 
                        onClick={() => setEditing({...editing, title: !editing.title})}
                        className="text-xs text-blue-600 hover:text-blue-500"
                      >
                        {editing.title ? 'Done' : 'Edit'}
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
                      <p className="text-gray-900 mt-1">{formData.title || 'Not specified'}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Subject with inline editing */}
                    <div className="pb-3 border-b border-gray-100">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium text-gray-500">Subject</h4>
                        <button 
                          onClick={() => setEditing({...editing, subject: !editing.subject})}
                          className="text-xs text-blue-600 hover:text-blue-500"
                        >
                          {editing.subject ? 'Done' : 'Edit'}
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
                        <p className="text-gray-900 mt-1">{formData.subject || 'Not specified'}</p>
                      )}
                    </div>
                    
                    {/* Paper Type with inline editing */}
                    <div className="pb-3 border-b border-gray-100">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium text-gray-500">Paper Type</h4>
                        <button 
                          onClick={() => setEditing({...editing, type: !editing.type})}
                          className="text-xs text-blue-600 hover:text-blue-500"
                        >
                          {editing.type ? 'Done' : 'Edit'}
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
                        <p className="text-gray-900 mt-1">{formData.type || 'Not specified'}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Academic Level with inline editing */}
                    <div className="pb-3 border-b border-gray-100">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium text-gray-500">Academic Level</h4>
                        <button 
                          onClick={() => setEditing({...editing, academicLevel: !editing.academicLevel})}
                          className="text-xs text-blue-600 hover:text-blue-500"
                        >
                          {editing.academicLevel ? 'Done' : 'Edit'}
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
                        <p className="text-gray-900 mt-1">{formData.academicLevel || 'Not specified'}</p>
                      )}
                    </div>
                    
                    {/* Writing Style with inline editing */}
                    <div className="pb-3 border-b border-gray-100">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium text-gray-500">Writing Style</h4>
                        <button 
                          onClick={() => setEditing({...editing, writingStyle: !editing.writingStyle})}
                          className="text-xs text-blue-600 hover:text-blue-500"
                        >
                          {editing.writingStyle ? 'Done' : 'Edit'}
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
                        <p className="text-gray-900 mt-1">{formData.writingStyle || 'Not specified'}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Number of Pages with inline editing */}
                    <div className="pb-3 border-b border-gray-100">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium text-gray-500">Number of Pages</h4>
                        <button 
                          onClick={() => setEditing({...editing, pages: !editing.pages})}
                          className="text-xs text-blue-600 hover:text-blue-500"
                        >
                          {editing.pages ? 'Done' : 'Edit'}
                        </button>
                      </div>
                      {editing.pages ? (
                        <div className="flex items-center mt-1">
                          <button 
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, pages: Math.max(1, prev.pages - 1) }))} 
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
                            onClick={() => setFormData(prev => ({ ...prev, pages: prev.pages + 1 }))}
                            className="px-2 py-1 border border-gray-300 rounded-r-md bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <p className="text-gray-900 mt-1">{formData.pages} ({formData.pages * 275} words)</p>
                      )}
                    </div>
                  </div>

                  {/* Deadline with inline editing */}
                  <div className="pt-1">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-gray-500">Deadline</h4>
                      <button 
                        onClick={() => setEditing({...editing, deadline: !editing.deadline})}
                        className="text-xs text-blue-600 hover:text-blue-500"
                      >
                        {editing.deadline ? 'Done' : 'Edit'}
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
                        {formatDeadlineDate()}
                        <span className="text-sm text-gray-500 ml-1">
                          ({formData.deadline === '14' && '14 days'}
                          {formData.deadline === '7' && '7 days'}
                          {formData.deadline === '3' && '3 days'}
                          {formData.deadline === '1' && '24 hours'})
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Instructions & Materials Card - Enhanced with better borders */}
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:border-blue-300 transition-colors">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center pb-3 border-b border-gray-100">
                  <FileText className="h-5 w-5 text-blue-500 mr-2" />
                  Instructions & Materials
                </h3>
                
                <div className="space-y-4">
                  {/* Writer Preference with inline editing */}
                  <div className="pb-3 border-b border-gray-100">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-gray-500">Writer Preference</h4>
                      <button 
                        onClick={() => setEditing({...editing, writerPreference: !editing.writerPreference})}
                        className="text-xs text-blue-600 hover:text-blue-500"
                      >
                        {editing.writerPreference ? 'Done' : 'Edit'}
                      </button>
                    </div>
                    {editing.writerPreference ? (
                      <div className="mt-2 space-y-2">
                        {['any', 'top-rated', 'subject-expert', 'preferred'].map((option) => (
                          <div key={option} className="flex items-center">
                            <input
                              type="radio"
                              id={`writer-${option}`}
                              name="writerPreference"
                              value={option}
                              checked={formData.writerPreference === option}
                              onChange={handleChange}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor={`writer-${option}`} className="ml-2 block text-sm text-gray-900">
                              {option === 'any' && 'Any Qualified Writer'}
                              {option === 'top-rated' && 'Top Rated Writer (+15%)'}
                              {option === 'subject-expert' && 'Subject Expert (+20%)'}
                              {option === 'preferred' && 'My Preferred Writer'}
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-900 mt-1">
                        {formData.writerPreference === 'any' && 'Any Qualified Writer'}
                        {formData.writerPreference === 'top-rated' && 'Top Rated Writer (+15%)'}
                        {formData.writerPreference === 'subject-expert' && 'Subject Expert (+20%)'}
                        {formData.writerPreference === 'preferred' && 'My Preferred Writer'}
                      </p>
                    )}
                  </div>
                  
                  {/* Detailed Instructions with inline editing */}
                  <div className="pb-3 border-b border-gray-100">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-gray-500">Detailed Instructions</h4>
                      <button 
                        onClick={() => setEditing({...editing, instructions: !editing.instructions})}
                        className="text-xs text-blue-600 hover:text-blue-500"
                      >
                        {editing.instructions ? 'Done' : 'Edit'}
                      </button>
                    </div>
                    {editing.instructions ? (
                      <textarea
                        name="instructions"
                        rows={4}
                        value={formData.instructions}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Provide detailed instructions for your paper"
                      ></textarea>
                    ) : (
                      <p className="text-gray-900 mt-1 whitespace-pre-line">{formData.instructions || 'Not specified'}</p>
                    )}
                  </div>
                  
                  {/* Files section - can be edited via adding or removing files */}
                  {formData.files.length > 0 && (
                    <div className="pt-1">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium text-gray-500">Uploaded Files ({formData.files.length})</h4>
                        <button 
                          onClick={() => setEditing({...editing, files: !editing.files})}
                          className="text-xs text-blue-600 hover:text-blue-500"
                        >
                          {editing.files ? 'Done' : 'Edit'}
                        </button>
                      </div>
                      <ul className="mt-2 space-y-2 bg-gray-50 rounded-md p-2">
                        {formData.files.map((file, index) => (
                          <li key={index} className="flex items-center justify-between text-sm p-2 hover:bg-gray-100 rounded">
                            <div className="flex-1 flex items-center">
                              <FileText className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-gray-900 truncate">{file.name}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-xs text-gray-500 mr-3">
                                {(file.size / 1024).toFixed(1)} KB
                              </span>
                              {editing.files && (
                                <button
                                  onClick={() => removeFile(index)}
                                  className="text-xs text-red-600 hover:text-red-500"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                      {editing.files && (
                        <div className="mt-3">
                          <label
                            htmlFor="review-file-upload"
                            className="inline-block px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                          >
                            <span>Upload additional files</span>
                            <input
                              id="review-file-upload"
                              name="review-file-upload"
                              type="file"
                              multiple
                              onChange={handleFileChange}
                              className="sr-only"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Estimated Price Card - automatically updates with any changes */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-5 text-white mt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Estimated Price</h3>
                  <p className="text-sm opacity-90">Based on your current selections</p>
                </div>
                <div className="text-2xl font-bold">${calculatePrice()}</div>
              </div>
              <p className="text-xs mt-3 opacity-80">
                Final price may vary based on additional requirements.
              </p>
            </div>

            <div className="flex justify-between gap-4 mt-8">
              <button
                type="button"
                onClick={() => handleStepChange(2)}
                className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition"
                title="Back to Instructions & Materials"
                aria-label="Back"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-3 bg-blue-600 rounded-lg shadow-md text-white hover:bg-blue-500 transition"
                title="Submit your order"
                aria-label="Submit Order"
              >
                Submit Order
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Invite Writers Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              onClick={() => setInviteModalOpen(false)}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-500" />
              Invite Writers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Favorite Writers */}
              <div>
                <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Your Favorite Writers</h3>
                <ul className="space-y-2">
                  {favoriteWriters.length === 0 && (
                    <li className="text-gray-500 text-sm">No favorite writers.</li>
                  )}
                  {favoriteWriters.map(writer => (
                    <li key={writer.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`fav-writer-${writer.id}`}
                        checked={selectedWriters.includes(writer.id)}
                        onChange={() => handleWriterSelect(writer.id)}
                        className="mr-2"
                      />
                      <label htmlFor={`fav-writer-${writer.id}`} className="flex-1 cursor-pointer">
                        <span className="font-medium">{writer.name}</span>
                        <span className="ml-2 text-xs text-yellow-600">★ {writer.rating}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              {/* All Writers */}
              <div>
                <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">All Writers</h3>
                <ul className="space-y-2 max-h-48 overflow-y-auto">
                  {allWriters.map(writer => (
                    <li key={writer.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`all-writer-${writer.id}`}
                        checked={selectedWriters.includes(writer.id)}
                        onChange={() => handleWriterSelect(writer.id)}
                        className="mr-2"
                      />
                      <label htmlFor={`all-writer-${writer.id}`} className="flex-1 cursor-pointer">
                        <span className="font-medium">{writer.name}</span>
                        <span className="ml-2 text-xs text-yellow-600">★ {writer.rating}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-end mt-6 gap-3">
              <button
                className="px-5 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setInviteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
                onClick={handleInviteConfirm}
                disabled={selectedWriters.length === 0}
              >
                Invite Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}