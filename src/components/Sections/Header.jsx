import React from 'react';
import { Heart, Star, ChevronRight, Sparkles, BookOpen, Award, ShieldCheck } from 'lucide-react';
import HeaderImage from '../../assets/img/header-img.png';

export default function CuteHeader() {
  return (
    <section id="home" className="w-full bg-gradient-to-br from-blue-50 via-green-50 to-purple-100 py-36 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-200 opacity-20 blur-xl"></div>
        <div className="absolute bottom-1/4 right-20 w-40 h-40 rounded-full bg-purple-200 opacity-20 blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-pink-200 opacity-20 blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
        {/* Left Side - Content */}
        <div className="w-full lg:w-1/2 order-1 lg:order-1">
          <div className="max-w-2xl mx-auto lg:mx-0">
            {/* Badge */}
            <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm mb-6 border border-blue-100">
              <Sparkles className="text-yellow-400 mr-2" size={18} />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Premium Academic Writing Service
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-green-400 bg-clip-text text-transparent">
                At
              </span>
              <span className="mx-2 bg-gradient-to-r from-green-500 via-purple-10 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
                FluxWriters
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                We
              </span>
              <span className="relative inline-block ml-2">
                <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-purple-400 bg-clip-text text-transparent">
                  Elevate Your Academic Journey
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-blue-100 opacity-60 rounded-full"></span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl font-medium text-gray-700 mb-8 max-w-lg leading-relaxed">
              Expert writing assistance tailored to your unique needs, helping you achieve academic excellence with confidence.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { icon: <BookOpen className="text-blue-500" size={20} />, text: "100% Original Content" },
                { icon: <Award className="text-green-500" size={20} />, text: "PhD Writers" },
                { icon: <ShieldCheck className="text-purple-500" size={20} />, text: "Secure & Confidential" },
                { icon: <Star className="text-yellow-500" size={20} />, text: "4.9/5 Rating" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-gray-100 shadow-sm">
                  <span className="mr-2">{feature.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
                <span>Get Started Now</span>
                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-gray-800 font-semibold py-4 px-8 rounded-xl border-2 border-blue-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center">
                <span>How It Works</span>
              </button>
            </div>

            {/* Testimonial */}
            <div className="relative">
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-100 relative overflow-hidden">
                <div className="absolute -top-3 -left-3 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Heart fill="#3b82f6" color="#3b82f6" size={20} />
                </div>
                <p className="text-gray-600 italic pl-8">
                  "FluxWriters transformed my academic experience. Their attention to detail and commitment to quality is unmatched. I went from struggling to excelling thanks to their help!"
                </p>
                <div className="flex items-center mt-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-gray-800">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">MBA Student, Harvard</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Image */}
        <div className="w-full lg:w-1/2 order-2 lg:order-2">
          <div className="relative max-w-xl mx-auto">
            {/* Image Container */}
            <div className="relative z-10">
              <div className="absolute -z-10 -top-6 -right-6 w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl"></div>
              <div className="rounded-2xl overflow-hidden border-4 border-white shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <img 
                  src={HeaderImage}
                  alt="Students achieving academic success" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            {/* Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border-2 border-green-100 z-20">
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

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-yellow-300 z-0"></div>
            <div className="absolute top-12 -right-4 w-8 h-8 rounded-full bg-pink-400 z-0"></div>
            <div className="absolute bottom-8 left-12 w-6 h-6 rounded-full bg-purple-400 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
}