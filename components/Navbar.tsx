import React, { useState } from 'react';
import { SectionId } from '../types';

interface NavbarProps {
  activeSection: SectionId;
}

const navItems = [
  { id: SectionId.ABOUT, label: 'ABOUT', num: 0 },
  { id: SectionId.PROJECTS, label: 'PROJECTS', num: 1 },
  { id: SectionId.SKILLS, label: 'SKILLS', num: 2 },
  { id: SectionId.WORK, label: 'WORK', num: 3 },
  { id: SectionId.EDUCATION, label: 'EDUCATION', num: 4 },
  { id: SectionId.BLOG, label: 'BLOG', num: 5 },
  { id: SectionId.CONTACT, label: 'CONTACT/RESUME', num: 6 },
];

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start z-40 pointer-events-none bg-gradient-to-b from-[#050505] to-transparent">
        <div className="text-xs md:text-sm text-gray-400 pointer-events-auto select-none">
          Good things take time...
        </div>
        
        <div className="hidden md:flex gap-6 pointer-events-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-xs md:text-sm transition-colors hover:text-green-300 ${
                activeSection === item.id ? 'text-neon' : 'text-gray-400'
              }`}
            >
              <span className="text-green-600 mr-1">{item.num}.</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden pointer-events-auto">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#050505]/95 z-30 flex flex-col items-center justify-center transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-8 text-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-2xl transition-colors ${
                activeSection === item.id ? 'text-neon' : 'text-gray-300'
              }`}
            >
              <span className="text-neon mr-2 font-mono text-base">{item.num}.</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;