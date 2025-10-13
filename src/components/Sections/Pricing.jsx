import React from "react";
import { Check } from "lucide-react";
import { Feather, RefreshCcw, Wand2, Eye } from "lucide-react";

// Pricing Table Component
const PricingTable = ({ icon, price, title, text, offers, action }) => {
  return (
    <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-blue-200 transform hover:-translate-y-1">
      <div className="h-24 bg-gradient-to-br from-green-300 to-blue-300 flex items-center justify-center">
        {icon === "roller" && <Feather className="h-10 w-10 text-white" />}
        {icon === "monitor" && <RefreshCcw className="h-10 w-10 text-white" />}
        {icon === "browser" && <Wand2 className="h-10 w-10 text-white" />}
        {icon === "printer" && <Eye className="h-10 w-10 text-white" />}
      </div>

      <div className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
          <h2 className="text-3xl font-extrabold text-blue-600 mb-2">
            {price}
          </h2>
          <p className="text-gray-600 text-sm">{text}</p>
        </div>

        <div className="space-y-3 mb-6">
          {offers.map((offer, index) => (
            <div key={index} className="flex items-start">
              <div className="mt-1 mr-2 flex-shrink-0">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-sm text-gray-700">{offer.name}</p>
            </div>
          ))}
        </div>

        <button
          onClick={action}
          className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-lg font-bold hover:shadow-md transition-shadow"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

// Main Pricing Component
export default function Pricing() {
  return (
    <section id="pricing" className="w-full py-12">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
              <span className="inline-block transform -rotate-2 text-blue-400">
                Check
              </span>
              <span className="mx-2 text-blue-400">Our</span>
              <span className="inline-block transform rotate-2 text-purple-500">
                Pricing
              </span>
              <span className="ml-2 text-blue-500">💸</span>
            </h1>
            <p className="text-base md:text-lg font-medium text-blue-700 text-center bg-gradient-to-r from-blue-100 via-green-100 to-purple-100 rounded-xl px-3 py-2 shadow-sm border border-blue-200 mb-2 max-w-2xl mx-auto leading-relaxed">
              <span className="inline-block mr-2">🎯</span>
              Affordable plans for every student.
              <br />
              <span className="text-purple-600 font-medium">
                Flexible pricing to suit your budget and needs.
              </span>
              <span className="inline-block ml-2">📊</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col h-full">
              <PricingTable
                icon="roller"
                price="$10.99/page"
                title="Writing Services"
                text="Ace your essays with professional help ready to tackle diverse subjects and different essay types."
                offers={[
                  { name: "100% Original Content", checked: true },
                  { name: "Fast Delivery", checked: true },
                  { name: "Unlimited Revisions", checked: true },
                  { name: "Plagiarism Report", checked: true },
                  { name: "24/7 Support", checked: true },
                ]}
                action={() => alert("clicked")}
              />
            </div>

            <div className="flex flex-col h-full">
              <PricingTable
                icon="monitor"
                price="$7.49/page"
                title="Rewriting Services"
                text="Trust our expert rewriters to refine and elevate your work, ensuring it meets the highest standards."
                offers={[
                  { name: "100% Original Content", checked: true },
                  { name: "Fast Delivery", checked: true },
                  { name: "Unlimited Revisions", checked: true },
                  { name: "Plagiarism Report", checked: true },
                  { name: "24/7 Support", checked: true },
                ]}
                action={() => alert("clicked")}
              />
            </div>

            <div className="flex flex-col h-full">
              <PricingTable
                icon="browser"
                price="$5.25/page"
                title="Editing Services"
                text="Our adept editors eliminate errors to enhance your academic papers for clarity, coherence, and precision."
                offers={[
                  { name: "100% Original Content", checked: true },
                  { name: "Fast Delivery", checked: true },
                  { name: "Unlimited Revisions", checked: true },
                  { name: "Plagiarism Report", checked: true },
                  { name: "24/7 Support", checked: true },
                ]}
                action={() => alert("clicked")}
              />
            </div>

            <div className="flex flex-col h-full">
              <PricingTable
                icon="browser"
                price="$2.75/page"
                title="Proofreading Services"
                text="Our meticulous proofreading ensures flawless language and seamless flow for any type of paper."
                offers={[
                  { name: "100% Original Content", checked: true },
                  { name: "Fast Delivery", checked: true },
                  { name: "Unlimited Revisions", checked: true },
                  { name: "Plagiarism Report", checked: true },
                  { name: "24/7 Support", checked: true },
                ]}
                action={() => alert("clicked")}
              />
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm italic">
              * All prices are in USD. Additional services may be available upon
              request.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
