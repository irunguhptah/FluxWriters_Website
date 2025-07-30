import React from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import MyLogo from '../../assets/img/projects/Logo.png';
import { Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="w-full bg-gradient-to-r from-blue-300 via-green-300 to-purple-300 text-gray-900 pt-12 pb-6 relative"
    >
      <div className="container mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link 
              to="home" 
              smooth={true} 
              offset={-80}
              className="inline-block transition-transform hover:scale-105"
            >
              <img 
                src={MyLogo} 
                alt="FluxWriters" 
                className="w-40 h-auto filter brightness-10"
              />
            </Link>
            <p className="text-gray-700 text-sm leading-relaxed">
              Premium academic writing services to elevate your educational journey.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'linkedin', 'instagram'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-purple-600 transition-colors"
                  aria-label={social}
                >
                  <span className="text-gray-900 text-lg">
                    {social === 'twitter' && <Twitter className="w-5 h-5" />}
                    {social === 'facebook' && <Facebook className="w-5 h-5" />}
                    {social === 'linkedin' && <Linkedin className="w-5 h-5" />}
                    {social === 'instagram' && <Instagram className="w-5 h-5" />}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {['Services', 'Pricing', 'About', 'Testimonials'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item.toLowerCase()} 
                    smooth={true} 
                    offset={-80}
                    className="text-gray-700 hover:text-purple-400 transition-colors flex items-center"
                  >
                    <span className="mr-2">→</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">Our Services</h3>
            <ul className="space-y-2">
              {['Essay Writing', 'Research Papers', 'Thesis Help', 'Editing'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-700 hover:text-purple-400 transition-colors flex items-center">
                    <span className="mr-2">✍️</span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-3 mt-1">📍</span>
                <span className="text-gray-700">123 Academic Lane, Education City</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">📧</span>
                <a href="mailto:contact@fluxwriters.com" className="text-gray-700 hover:text-purple-400">
                  contact@fluxwriters.com
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">📞</span>
                <a href="tel:+15551234567" className="text-gray-700 hover:text-purple-400">
                  +1 (555) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">
              © {getCurrentYear()} <span className="text-purple-400 font-medium">FluxWriters</span>. All Rights Reserved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <Link 
              to="home" 
              smooth={true} 
              offset={-80}
              className="text-gray-700 hover:text-purple-400 transition-colors flex items-center group"
            >
              <span className="mr-2 transform group-hover:-translate-y-1 transition-transform">↑</span>
              Back to Top
            </Link>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
      </div>
    </motion.footer>
  );
}