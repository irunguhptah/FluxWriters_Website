import { useState } from "react";
import {
  LifeBuoy,
  MessageSquare,
  BookOpen,
  Zap,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Clock,
  Search,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// FAQ data moved outside component for better organization
const FAQ_CATEGORIES = {
  general: [
    {
      question: "How do I place an order?",
      answer:
        "Go to 'New Order', fill in your paper details, upload files (if needed), and submit. A writer will be assigned shortly!",
    },
    {
      question: "What file formats do you accept?",
      answer: "We accept PDF, DOC, DOCX, PPT, and TXT files (max 10MB each).",
    },
    {
      question: "What is your turnaround time?",
      answer:
        "Turnaround times vary based on complexity and length. Standard essays take 24-48 hours, while research papers may take 3-5 days. Rush orders are available for an additional fee.",
    },
    {
      question: "How do I check the status of my order?",
      answer:
        "Log into your dashboard and navigate to 'My Orders'. You'll see real-time status updates for all your current projects.",
    },
    {
      question: "Can I communicate with my assigned writer?",
      answer:
        "Yes! Our platform features a direct messaging system where you can chat with your writer throughout the entire process.",
    },
  ],
  payments: [
    {
      question: "What payment methods do you accept?",
      answer:
        "Credit/debit cards (Visa, MasterCard), PayPal, and bank transfers.",
    },
    {
      question: "Is there a refund policy?",
      answer:
        "Yes! Request a refund within 14 days if unsatisfied (terms apply).",
    },
    {
      question: "How are your prices calculated?",
      answer:
        "Prices are based on several factors: academic level, deadline, page count, and complexity of the assignment. You'll see the exact price before confirming your order.",
    },
    {
      question: "Do you offer any discounts?",
      answer:
        "Yes! New customers receive a 15% discount on their first order. We also have a loyalty program with cumulative discounts for returning customers.",
    },
    {
      question: "When will I be charged for my order?",
      answer:
        "Payment is processed when you place your order. For larger projects, we offer installment options where you can pay in 2-3 parts throughout the writing process.",
    },
  ],
  writers: [
    {
      question: "How are writers selected?",
      answer:
        "We hire top-tier experts with advanced degrees and proven writing experience.",
    },
    {
      question: "Can I request a specific writer?",
      answer:
        "Yes! On your dashboard, select 'My Preferred Writer' when placing an order.",
    },
    {
      question: "What qualifications do your writers have?",
      answer:
        "All our writers hold at least a Master's degree in their field of expertise, with many holding PhDs. We verify their credentials and test their writing abilities before hiring.",
    },
    {
      question: "How do you match writers to assignments?",
      answer:
        "We match writers based on their academic background, expertise in specific subjects, and previous experience with similar assignments to ensure the best quality.",
    },
    {
      question: "What if I'm not satisfied with my assigned writer?",
      answer:
        "You can request a writer change at any point during the process. Simply contact our support team, and we'll reassign your order promptly.",
    },
  ],
};

// Support card components for better modularity
const SupportCard = ({
  icon: Icon,
  title,
  description,
  actionText,
  actionIcon: ActionIcon,
  onClick,
  colorClass,
  actionColor,
}) => (
  <div
    className={`bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 w-full transition-transform hover:scale-[1.02] cursor-pointer`}
    onClick={onClick}
    title={title}
    aria-label={title}
  >
    <div className="flex items-start gap-4">
      <div className={`p-2 ${colorClass} rounded-full`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-3">{description}</p>
        <div className="flex items-center text-sm font-medium">
          {actionText && (
            <>
              {ActionIcon && <ActionIcon className="h-4 w-4 mr-1" />}
              <span className={actionColor ? actionColor : ""}>
                {actionText}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
);

const FAQItem = ({ faq, index, isExpanded, toggleFAQ, activeCategory }) => (
  <div key={index} className="p-6">
    <button
      onClick={() => toggleFAQ(index)}
      className="w-full flex justify-between items-center text-left group"
      title={isExpanded ? "Collapse answer" : "Expand to see answer"}
      aria-label={isExpanded ? "Collapse answer" : "Expand to see answer"}
    >
      <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {faq.question}
      </h3>
      {isExpanded ? (
        <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
      ) : (
        <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
      )}
    </button>

    {isExpanded && (
      <div className="mt-3 pl-2 text-gray-600 dark:text-gray-300 border-l-2 border-blue-300 dark:border-blue-700">
        <p>{faq.answer}</p>
        {index === 0 && activeCategory === "general" && (
          <button
            className="mt-3 text-blue-600 dark:text-blue-400 hover:underline flex items-center text-sm"
            title="Watch a tutorial video"
            aria-label="Watch a tutorial video"
            onClick={() => console.log("Tutorial video coming soon!")}
          >
            <Zap className="mr-1 h-4 w-4" />
            Watch a tutorial video
          </button>
        )}
      </div>
    )}
  </div>
);

const LiveChatPopup = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md animate-fade-in">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="text-blue-500 dark:text-blue-400 h-5 w-5" />
          Live Chat Support
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors"
          title="Close live chat"
          aria-label="Close live chat"
        >
          ✕
        </button>
      </div>
      <div className="p-4 h-64 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <div className="text-center py-8 text-gray-500 dark:text-gray-300">
          <p>Connecting you to an agent...</p>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
          aria-label="Type your message"
          title="Type your message"
          onFocus={() => {
            /* Input focus - no toast needed */
          }}
        />
      </div>
    </div>
  </div>
);

export default function HelpCenter() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
    // Remove FAQ toggle toast - visual expansion is clear enough
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setExpandedFAQ(null);
    // Remove category switch toast - active tab is visually clear
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Keep this toast as it informs user about missing feature
    toast("Search feature coming soon!", { icon: "🔍" });
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
    // Keep this toast as it's important user feedback for support
    toast("Live chat opened. An agent will assist you shortly.", {
      icon: "💬",
      duration: 2000,
    });
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    // Remove chat close toast - closing is obvious
  };

  const filteredFAQs = FAQ_CATEGORIES[activeCategory].filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent py-4 px-1 md:py-8 md:px-2">
      <Toaster position="top-right" />
      <div className="w-full max-w-6xl bg-white/90 dark:bg-gray-950/90 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-900 p-0 md:p-10 overflow-x-hidden">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12 px-2">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full shadow-lg mb-6 animate-float">
            <LifeBuoy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            How can we help you today?
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8">
            Quick answers, live support, and resources at your fingertips.
          </p>

          {/* Search Bar */}
          <form className="relative max-w-2xl mx-auto" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search FAQs, guides, or policies..."
              className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white transition-all duration-200 text-base"
              aria-label="Search FAQs"
              title="Search FAQs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              title="Search"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 px-1 md:px-0">
          {/* FAQ Section */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden w-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="text-blue-500 dark:text-blue-300" />
                FAQs
              </h2>
            </div>

            {/* FAQ Category Tabs */}
            <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-800">
              {Object.keys(FAQ_CATEGORIES).map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 md:px-6 md:py-3 text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                      : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
                  }`}
                  title={`Show ${
                    category.charAt(0).toUpperCase() + category.slice(1)
                  } FAQs`}
                >
                  {category === "general" && "General"}
                  {category === "payments" && "Payments"}
                  {category === "writers" && "Writers"}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredFAQs.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  index={index}
                  isExpanded={expandedFAQ === index}
                  toggleFAQ={toggleFAQ}
                  activeCategory={activeCategory}
                />
              ))}
              {filteredFAQs.length === 0 && (
                <div className="p-6 text-gray-500 dark:text-gray-300">
                  No FAQs found for your search.
                </div>
              )}
            </div>
          </div>

          {/* Support Options */}
          <div className="space-y-6 w-full max-w-full lg:max-w-lg mx-auto lg:mx-0">
            <SupportCard
              icon={MessageSquare}
              title="Live Chat"
              description="Get instant help from our support team."
              actionText="Available now"
              colorClass="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300"
              actionColor="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900 px-2 py-0.5 rounded-full"
              onClick={handleOpenChat}
            />

            <SupportCard
              icon={Mail}
              title="Email Us"
              description="We reply within 2 hours."
              actionText="support@fluxwriters.com"
              colorClass="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
              actionColor="text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900 px-2 py-0.5 rounded-full"
              onClick={() => {
                // Remove email toast - action is clear from context
              }}
            />

            <SupportCard
              icon={Phone}
              title="Call Support"
              description="Mon-Fri, 9AM-6PM (EST)"
              actionText="+1 (800) 555-1234"
              colorClass="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
              actionColor="text-fuchsia-700 dark:text-fuchsia-300 bg-fuchsia-50 dark:bg-fuchsia-900 px-2 py-0.5 rounded-full"
              onClick={() => {
                // Remove dial toast - action is clear from button context
              }}
            />

            {/* Resources Card */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-900 dark:to-purple-900 p-6 rounded-2xl shadow-lg text-white w-full">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">
                    Helpful Resources
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => {
                          console.log("Navigate to How to Request Revisions");
                          // Remove resource toast - navigation is clear enough
                        }}
                        className="hover:underline flex items-center transition-colors"
                        title="How to Request Revisions"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        How to Request Revisions
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          // Remove resource toast - navigation is clear enough
                        }}
                        className="hover:underline flex items-center transition-colors"
                        title="Writing Tips from Our Experts"
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Writing Tips from Our Experts
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Chat Popup */}
        {isChatOpen && <LiveChatPopup onClose={handleCloseChat} />}
      </div>
    </div>
  );
}
