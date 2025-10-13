import React from "react";
import {
  Users,
  BookOpen,
  FileText,
  CheckCircle,
  Award,
  Clock,
  Shield,
  Star,
} from "lucide-react";
import AddImage1 from "../../assets/img/add/1.png";

const ServiceBox = ({ icon, title, subtitle }) => {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-green-300 to-blue-300 p-6 rounded-xl shadow-lg border-2 border-gray-200 text-teal-900 transform transition-all hover:scale-[1.02] hover:shadow-xl group">
      <div className="flex items-center mb-4">
        {icon === "roller" && (
          <BookOpen className="h-8 w-8 mr-2 text-teal-800 group-hover:rotate-12 transition-transform" />
        )}
        {icon === "monitor" && (
          <Users className="h-8 w-8 mr-2 text-teal-800 group-hover:rotate-12 transition-transform" />
        )}
        {icon === "browser" && (
          <FileText className="h-8 w-8 mr-2 text-teal-800 group-hover:rotate-12 transition-transform" />
        )}
        {icon === "printer" && (
          <CheckCircle className="h-8 w-8 mr-2 text-teal-800 group-hover:rotate-12 transition-transform" />
        )}
        <h3 className="text-xl font-bold group-hover:text-teal-800 transition-colors">
          {title}
        </h3>
      </div>

      {Array.isArray(subtitle) ? (
        <ul className="mt-2 space-y-2 flex-grow">
          {subtitle.slice(0, 6).map((item, index) => (
            <li key={index} className="flex items-center text-sm">
              <span className="inline-block w-5 h-5 mr-2 bg-white/50 rounded-full flex items-center justify-center text-xs">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
          {subtitle.length > 6 && (
            <li className="text-sm italic mt-2 flex items-center">
              <span className="inline-block w-5 h-5 mr-2 bg-white/50 rounded-full flex items-center justify-center text-xs">
                +
              </span>
              <span>And {subtitle.length - 6} more services...</span>
            </li>
          )}
        </ul>
      ) : (
        <p className="mt-2 text-sm flex-grow">{subtitle}</p>
      )}
    </div>
  );
};

export default function Services() {
  return (
    <section id="services" className="w-full relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-blue-200 opacity-20 blur-xl"></div>
        <div className="absolute bottom-1/4 left-20 w-32 h-32 rounded-full bg-green-200 opacity-20 blur-xl"></div>
      </div>

      <div className="bg-white py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Comprehensive
              </span>{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Writing Solutions
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-blue-100 opacity-60 rounded-full"></span>
              </span>
            </h1>

            <div className="max-w-2xl mx-auto">
              <p className="text-lg md:text-xl font-semibold text-blue-700 bg-gradient-to-r from-blue-100 via-green-100 to-purple-100 rounded-xl px-6 py-4 shadow-sm border border-blue-200">
                <span className="inline-block mr-2">📝</span>
                Tailored academic support from subject-matter experts
                <span className="inline-block ml-2">📚</span>
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <ServiceBox
              icon="roller"
              title="Academic Writing"
              subtitle={[
                "Academic essay",
                "APA paper",
                "Assignment",
                "Expository essay",
                "Literature review",
                "Narrative essay",
                "Descriptive essay",
                "Analytical essay",
              ]}
            />

            <ServiceBox
              icon="monitor"
              title="Specialized Help"
              subtitle={[
                "Biology homework",
                "Finance essay",
                "Law assignment",
                "History homework",
                "Engineering homework",
                "Nursing assignment",
                "Science assignment",
                "Medical assignment",
              ]}
            />

            <ServiceBox
              icon="browser"
              title="Professional Writing"
              subtitle={[
                "Admission essay",
                "Scholarship essay",
                "MBA essay",
                "Capstone project",
                "Lab report",
                "Report",
                "Annotated bibliography",
                "Article review",
              ]}
            />

            <ServiceBox
              icon="printer"
              title="Excellence in Every Paper"
              subtitle="We deliver expertly crafted, high-quality papers with originality, clarity, and precision. Our degree-holding writers ensure top academic standards and timely delivery."
            />
          </div>

          {/* Features Section */}
          <div className="bg-gray-100 rounded-3xl p-8 mb-20 border-2 border-blue-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <Award className="text-blue-500 mr-2" size={24} />
                  <h2 className="text-2xl font-bold text-blue-700">
                    Why Choose FluxWriters?
                  </h2>
                </div>
                <h3 className="text-3xl lg:text-4xl font-extrabold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Quality Assurance Guaranteed
                </h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Shield className="text-green-500" />,
                      text: "100% plagiarism-free content",
                    },
                    {
                      icon: <Users className="text-blue-500" />,
                      text: "Subject-matter experts",
                    },
                    {
                      icon: <Clock className="text-purple-500" />,
                      text: "On-time delivery",
                    },
                    {
                      icon: <CheckCircle className="text-teal-500" />,
                      text: "Unlimited revisions",
                    },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-white p-2 rounded-lg mr-4 shadow-sm">
                        {feature.icon}
                      </div>
                      <p className="text-lg text-gray-700">{feature.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10">
                  <div className="absolute -z-10 -top-6 -right-6 w-full h-full bg-gradient-to-br from-green-200 to-blue-200 rounded-2xl"></div>
                  <img
                    src={AddImage1}
                    alt="Quality academic writing"
                    className="rounded-2xl shadow-xl border-4 border-white w-full"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border-2 border-green-200 z-20">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <Star fill="#10b981" color="#10b981" size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">4.9/5</p>
                      <p className="text-xs text-gray-500">Customer Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
