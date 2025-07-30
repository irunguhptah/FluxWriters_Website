import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import MyLogo from '../../assets/img/projects/Logo.png';

export default function SideNav({ sidebarOpen, onClose, activeSection }) {
  const navigate = useNavigate();

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut' }}
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl z-50"
          >
            <div className="h-full flex flex-col">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <Link to="/" onClick={onClose}>
                  <img src={MyLogo} alt="FluxWriters" className="h-20" />
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Sidebar Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {["home", "services", "projects", "writers", "pricing", "contact"].map((section) => (
                  <motion.button
                    key={section}
                    onClick={() => handleScroll(section)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center ${
                      activeSection === section
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ x: 5 }}
                  >
                    <span className="mr-2">
                      {section === 'home' && '🏠'}
                      {section === 'services' && '🛠️'}
                      {section === 'projects' && '📂'}
                      {section === 'writers' && '✍️'}
                      {section === 'pricing' && '💲'}
                      {section === 'contact' && '📞'}
                    </span>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </motion.button>
                ))}
              </nav>

              {/* Sidebar Footer */}
              <div className="px-6 py-4 border-t space-y-4">
                <motion.button
                  onClick={() => {
                    navigate('/auth/signin-1');
                    onClose();
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-blue-600 border border-blue-400 rounded-lg bg-gradient-to-r from-blue-100 via-green-100 to-purple-100 hover:bg-gradient-to-r hover:from-blue-200 hover:via-green-200 hover:to-purple-200 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Log in
                </motion.button>
                <motion.button
                  onClick={() => {
                    navigate('/auth/signup-1');
                    onClose();
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(59, 130, 246, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign up
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}