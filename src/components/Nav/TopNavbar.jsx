import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bars3Icon } from '@heroicons/react/24/outline';
import MyLogo from '../../assets/img/projects/Logo.png';

export default function TopNavbar({ setSidebarOpen }) {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "projects", "writers", "pricing", "contact"];
      let currentSection = "home";
      setScrolled(window.scrollY > 10);

      sections.forEach((section) => {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80; // Adjust this value to match your navbar height
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const handleLogin = () => {
    navigate('/Login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gradient-to-r from-blue-100 via-green-100 to-purple-100 shadow-lg py-2'
          : 'bg-gradient-to-r from-blue-100 via-green-80 to-purple-80 py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 w-full">
          {/* Logo - always left */}
          <Link
            to="/"
            className="flex-shrink-0 ml-2 md:ml-4"
          >
            <motion.img
              src={MyLogo}
              alt="FluxWriters"
              className="h-16 md:h-24 transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
            />
          </Link>
          {/* Spacer for desktop nav */}
          <div className="flex-1 flex items-center justify-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-6">
                {["home", "services", "projects", "writers", "pricing", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => handleScroll(section)}
                    className={`relative px-1 py-2 text-sm font-medium transition-colors duration-300 ${
                      activeSection === section 
                        ? 'text-blue-600' 
                        : 'text-gray-700 hover:text-blue-500'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                    {activeSection === section && (
                      <motion.span 
                        layoutId="navUnderline"
                        className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600"
                        transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                  </button>
                ))}
              </div>
              {/* Auth Buttons */}
              <div className="flex items-center space-x-8 ml-16">
                <motion.button
                  onClick={handleLogin}
                  className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-400 rounded-lg bg-gradient-to-r from-blue-100 via-green-100 to-purple-100 hover:bg-gradient-to-r hover:from-blue-200 hover:via-green-200 hover:to-purple-200 transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Log in
                </motion.button>
                <motion.button
                  onClick={handleSignup}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.03, boxShadow: '0 5px 15px rgba(59, 130, 246, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign up
                </motion.button>
              </div>
            </div>
          </div>
          {/* Mobile Auth Buttons & Menu */}
          <div className="md:hidden flex items-center space-x-4 ml-2">
            <button
              onClick={handleLogin}
              className="px-3 py-2 text-xs font-medium text-blue-600 border border-blue-400 rounded-lg bg-gradient-to-r from-blue-100 via-green-100 to-purple-100 hover:bg-gradient-to-r hover:from-blue-200 hover:via-green-200 hover:to-purple-200 transition-all duration-300"
            >
              Log in
            </button>
            <button
              onClick={handleSignup}
              className="px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 rounded-lg shadow hover:shadow-md transition-all duration-300"
            >
              Sign up
            </button>
            <motion.button
              onClick={() => setSidebarOpen(true)}
              className="p-4 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bars3Icon className="h-9 w-9" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}