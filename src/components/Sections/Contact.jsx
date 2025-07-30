import React from 'react';
import { motion } from 'framer-motion';

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "backOut"
    }
  }
};

const Contact = () => {
  return (
    <section id="contact" className="w-full bg-gradient-to-br from-blue-50 via-green-50 to-purple-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Floating decorative elements */}
        <div className="absolute right-20 top-1/4 w-16 h-16 rounded-full bg-blue-200 opacity-40 blur-xl"></div>
        <div className="absolute left-32 bottom-1/3 w-24 h-24 rounded-full bg-purple-200 opacity-30 blur-xl"></div>
        
        {/* Main content container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          {/* Header Section */}
          <motion.div
            variants={headerVariants}
            className="text-center mb-8"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block transform hover:-rotate-3 transition-transform duration-300 text-blue-400">Let's</span>{' '}
              <span className="inline-block transform hover:rotate-3 transition-transform duration-300 text-blue-400">Connect</span>{' '}
              <span className="inline-block transform hover:rotate-12 transition-transform duration-300 text-purple-500">✨</span>
            </motion.h1>
            
            <motion.div
              className="max-w-2xl mx-auto relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl blur opacity-75"></div>
              <div className="relative bg-white rounded-2xl px-6 py-4 shadow-lg border border-gray-100">
                <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed">
                  <span className="text-xl mr-2">📬</span>
                  Need expert help with your academic work? 
                  <span className="block md:inline mt-1 md:mt-0 md:ml-2">
                    <span className="font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                      Drop us a message
                    </span>{' '}
                    and we'll get back to you within 24 hours!
                  </span>
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left Column - Contact Info */}
            <motion.div
              variants={cardVariants}
              className="bg-white p-8 rounded-3xl shadow-xl border-2 border-gray-100 hover:border-blue-200 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <span className="mr-3">📌</span> Contact Details
              </h3>
              
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <span className="text-blue-600 text-xl">📍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Our Location</h4>
                    <p className="text-gray-600">123 Academic Lane, Education City</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <span className="text-green-600 text-xl">✉️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Email Us</h4>
                    <p className="text-gray-600">contact@academicexperts.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <span className="text-purple-600 text-xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Call Us</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-4 text-gray-700">Working Hours</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mon-Fri</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Middle Column - Contact Form */}
            <motion.div
              variants={cardVariants}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-2xl border-2 border-gray-100 hover:border-purple-200 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                    <span className="mr-3">📝</span> Send Us a Message
                  </h3>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="How can we help?"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Tell us about your project..."
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
                    >
                      Send Message
                      <span className="ml-2">🚀</span>
                    </button>
                  </form>
                </div>
                
                {/* Right Side - Testimonials */}
                <motion.div
                  variants={imageVariants}
                  className="md:w-1/3 bg-gradient-to-b from-blue-50 to-purple-50 rounded-2xl p-6 shadow-inner border border-gray-200"
                >
                  <h4 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
                    <span className="mr-2">⭐</span> What Our Clients Say
                  </h4>
                  
                  <div className="space-y-5">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <p className="text-gray-600 italic mb-3">"The team helped me perfect my thesis in record time!"</p>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full mr-2"></div>
                        <span className="text-sm font-medium">Sarah J.</span>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <p className="text-gray-600 italic mb-3">"Professional service with outstanding results."</p>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-purple-100 rounded-full mr-2"></div>
                        <span className="text-sm font-medium">Michael T.</span>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <p className="text-gray-600 italic mb-3">"Saved me hours of research work. Highly recommend!"</p>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full mr-2"></div>
                        <span className="text-sm font-medium">Emma L.</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;