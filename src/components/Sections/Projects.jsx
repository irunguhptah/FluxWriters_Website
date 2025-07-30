import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, ExternalLink, Sparkles, Trophy } from 'lucide-react';

const ProjectBox = ({ pdf, title, text, action }) => {
  return (
    <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-blue-200 transform hover:-translate-y-1 group">
      {/* Header with gradient and icon */}
      <div className="h-48 bg-gradient-to-br from-green-300 to-blue-300 flex items-center justify-center relative overflow-hidden">
        <FileText className="h-16 w-16 text-white z-10 group-hover:scale-110 transition-transform" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm flex-grow">{text}</p>
        <div className="flex justify-between items-center mt-auto">
          <button 
            onClick={action}
            className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors group-hover:underline"
          >
            Learn More
            <ChevronDown className="h-4 w-4 ml-1 group-hover:translate-y-0.5 transition-transform" />
          </button>
          <a 
            href={pdf} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-gradient-to-r from-green-400 to-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-md transition-all hover:scale-105"
          >
            View PDF <ExternalLink className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [showMore, setShowMore] = useState(false);

  const projectData = [
    {
      id: 1,
      pdf: "/assets/samples/Sample Essay.pdf",
      title: "Computer Science Essay 1",
      text: "Well-structured analysis of cloud computing security, supported by credible sources and proper citation style (APA format), ensuring academic rigor and reliability.",
    },
    {
      id: 2,
      pdf: "/assets/samples/Sample Essay.pdf",
      title: "Computer Science Essay 2",
      text: "A deep dive into artificial intelligence advancements and their impact on the software development lifecycle.",
    },
    {
      id: 3,
      pdf: "/assets/samples/Sample Essay.pdf",
      title: "Computer Science Essay 3",
      text: "Exploring data privacy laws and their influence on cloud storage systems across multiple jurisdictions.",
    },
    {
      id: 4,
      pdf: "/assets/samples/Sample Essay.pdf",
      title: "Computer Science Essay 4",
      text: "Blockchain technology and its application in enhancing cybersecurity protocols in financial systems.",
    },
    {
      id: 5,
      pdf: "/assets/samples/Sample Essay.pdf",
      title: "Computer Science Essay 5",
      text: "The role of machine learning in predictive analytics and its business intelligence applications.",
    },
    {
      id: 6,
      pdf: "/assets/samples/Sample Essay.pdf",
      title: "Computer Science Essay 6",
      text: "The ethical implications of AI-powered surveillance systems in modern society.",
    },
  ];

  const projectsToShow = showMore ? projectData : projectData.slice(0, 3);

  return (
    <section id="projects" className="w-full bg-gradient-to-br from-blue-50 via-green-50 to-purple-100 py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-blue-100 opacity-20 blur-xl"></div>
        <div className="absolute bottom-1/4 left-20 w-32 h-32 rounded-full bg-green-100 opacity-20 blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white px-6 py-2 rounded-full shadow-sm mb-6 border border-blue-200">
            <Sparkles className="text-yellow-400 mr-2" size={18} />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Premium Sample Papers
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Exemplary
            </span>{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Academic Samples
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-2 bg-blue-100 opacity-60 rounded-full"></span>
            </span>
          </h1>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-6 inline-block">
              <p className="text-lg md:text-xl font-medium text-blue-700 text-center">
                <span className="inline-block mr-2">🏆</span>
                Achievements with <span className="text-blue-500 font-bold">Top-Tier Sample Papers</span>
                <span className="inline-block ml-2">📚</span>
              </p>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projectsToShow.map((project) => (
            <div key={project.id} className="flex flex-col h-full">
              <ProjectBox
                pdf={project.pdf}
                title={project.title}
                text={project.text}
                action={() => alert(`Clicked ${project.title}`)}
              />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowMore(!showMore)}
            className="group relative px-10 py-3 overflow-hidden rounded-xl bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {!showMore ? (
                <>
                  View More Samples <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
                </>
              ) : (
                <>
                  Show Less <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
                </>
              )}
            </span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
          </button>
        </div>

        {/* Quality Assurance Section */}
        <div className="mt-20 bg-white rounded-3xl shadow-xl border-2 border-blue-200 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <div className="flex items-center mb-4">
                <Trophy className="text-yellow-400 mr-2" size={24} />
                <h2 className="text-2xl font-bold text-blue-700">Quality Assurance</h2>
              </div>
              <h3 className="text-3xl lg:text-4xl font-extrabold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Our Quality Promise
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Every sample paper undergoes rigorous quality checks to ensure academic excellence, proper formatting, and original content.
              </p>
              <ul className="space-y-3">
                {[
                  "100% plagiarism-free content",
                  "Proper citation and referencing",
                  "Subject-matter expert writers",
                  "Academic rigor and reliability"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 text-green-600">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 bg-gradient-to-br from-green-300 to-blue-300 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why Review Our Samples?</h3>
              <ul className="space-y-4">
                {[
                  "Understand our writing standards",
                  "See proper academic formatting",
                  "Gauge depth of research",
                  "Evaluate writing style and tone"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-white/20 rounded-full p-1 mr-3 flex-shrink-0">
                      <span className="block w-5 h-5 bg-white rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">{index + 1}</span>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}