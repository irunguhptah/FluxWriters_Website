import React, { useState } from 'react';
// Sections
import TopNavbar from '../../components/Nav/TopNavbar';
import SideNav from '../../components/Nav/Sidebar';
import Header from '../../components/Sections/Header';
import Services from '../../components/Sections/Services';
import Projects from '../../components/Sections/Projects';
import Writers from '../../components/Sections/Blog';
import Pricing from '../../components/Sections/Pricing';
import Contact from '../../components/Sections/Contact';
import Footer from '../../components/Sections/Footer';

export default function Landing() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
       <TopNavbar setSidebarOpen={setSidebarOpen} />
      <SideNav 
        sidebarOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      <Header />
      <Services />
      <Projects />
      <Writers />
      <Pricing />
      <Contact />
      <Footer />
    </>
  );
}
